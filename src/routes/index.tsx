import { component$, useStore } from '@builder.io/qwik'
import events from 'events'

//現在の時間からターゲット日までの時間を各単位で算出する
//ターゲット日からマイナスするイベントを追加できる
//ターゲット日からマイナスするイベントは、毎日、毎週、毎月、毎年のいずれかを選択できる
//ターゲット日からマイナスするイベントは、時間、分のいずれかを選択できる
//ターゲット日からマイナスするイベントは、複数追加できる
//ターゲット日からマイナスするイベントは、削除できる
//ターゲット日からマイナスするイベントは、編集できる
//ターゲット日からマイナスするイベントは、ターゲット日までの時間に反映される
//ターゲット日の入力は、datetime-localを使用し単位は分まで

type perUnitType = 'year' | 'month' | 'week' | 'day'
type unitType = 'hour' | 'minute'
type eventType = {
  name: string
  value: number
  unit: unitType
  perValue: number
  perUnit: perUnitType
}

export default component$(() => {
  // 今日からターゲット日までの時間を算出する
  const date = useStore({
    now: new Date(),
    //デフォルトを3ヶ月後に設定
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  })
  // ターゲット日までのmillisecondsからマイナスするイベントデータを保持する
  const events = useStore<{
    events: eventType[]
  }>(
    {
      events: [
        //デフォルトデータ
        {
          name: '睡眠時間',
          value: 8,
          unit: 'hour',
          perValue: 1,
          perUnit: 'day',
        },
      ],
    },
    { deep: true }
  )
  // 現在からターゲット日までのmilliseconds
  const diff = date.targetDate.getTime() - date.now.getTime()
  //unitをmillisecondsに変換する
  const unitToMilliseconds = (unit: unitType | perUnitType) => {
    switch (unit) {
      case 'year':
        return 1000 * 60 * 60 * 24 * 365
      case 'month':
        return 1000 * 60 * 60 * 24 * 30
      case 'week':
        return 1000 * 60 * 60 * 24 * 7
      case 'day':
        return 1000 * 60 * 60 * 24
      case 'hour':
        return 1000 * 60 * 60
      case 'minute':
        return 1000 * 60
    }
  }
  // millisecondsをunit単位に変換する
  const millisecondsToUnit = (
    milliseconds: number,
    unit: unitType | perUnitType
  ) => {
    return milliseconds / unitToMilliseconds(unit)
  }
  // valueをunit単位に変換する
  const valueToUnit = (value: number, unit: unitType | perUnitType) => {
    return value * unitToMilliseconds(unit)
  }
  //イベントがターゲットまでに何回あるかを計算
  const getEventIterationCount = () => {
    if (events.events.length === 0) return 0
    const eventIterationCount =
      events.events.reduce((acc, event) => {
        return (
          acc +
          Math.floor(millisecondsToUnit(diff, event.perUnit) / event.perValue)
        )
      }, 0) / events.events.length
    return eventIterationCount
  }
  //ターゲット日までのmillisecondsからイベントを引いたmillisecondsを算出して各単位で返す
  const calculatedDiff = () => {
    const eventIterationCount = getEventIterationCount()
    const eventIterationMilliseconds = events.events.reduce((acc, event) => {
      return acc + valueToUnit(event.value, event.unit) * eventIterationCount
    }, 0)
    const calculatedDiff = diff - eventIterationMilliseconds
    return {
      calculatedDiff: {
        //少数点以下3桁まで表示
        year: millisecondsToUnit(calculatedDiff, 'year').toFixed(3),
        //少数点以下桁まで表示
        month: millisecondsToUnit(calculatedDiff, 'month').toFixed(2),
        //少数点以下1桁まで表示
        week: millisecondsToUnit(calculatedDiff, 'week').toFixed(1),
        day: Math.floor(millisecondsToUnit(calculatedDiff, 'day')),
        hour: Math.floor(millisecondsToUnit(calculatedDiff, 'hour')),
        minute: Math.floor(millisecondsToUnit(calculatedDiff, 'minute')),
      },
      actualDiff: {
        year: millisecondsToUnit(diff, 'year').toFixed(3),
        month: millisecondsToUnit(diff, 'month').toFixed(2),
        week: millisecondsToUnit(diff, 'week').toFixed(1),
        day: Math.floor(millisecondsToUnit(diff, 'day')),
        hour: Math.floor(millisecondsToUnit(diff, 'hour')),
        minute: Math.floor(millisecondsToUnit(diff, 'minute')),
      },
    }
  }

  // millisecondsをinputのdatetime-localのvalueに変換する（分まで）
  const toDateTimeLocal = (date: Date) => date.toISOString().slice(0, 16)
  const targetDataToValue = toDateTimeLocal(date.targetDate)

  return (
    <div>
      <div>
        <label>
          ターゲット日:
          <input
            type="datetime-local"
            min={toDateTimeLocal(date.now)}
            step="60"
            value={targetDataToValue}
            onInput$={(event) => {
              date.targetDate = new Date(event?.target?.value)
            }}
          />
        </label>
        <div>
          <label>ターゲットからマイナスする時間:</label>
          <button
            onClick$={() => {
              //events.eventsに新しいオブジェクトを追加
              events.events = [
                ...events.events,
                {
                  name: '',
                  value: 1,
                  unit: 'hour',
                  perValue: 1,
                  perUnit: 'day',
                },
              ]
            }}
          >
            追加
          </button>
        </div>
        <div>
          <ul>
            {events.events.map((event, index) => {
              return (
                <li key={index}>
                  <EventInput
                    name={event.name}
                    value={event.value}
                    unit={event.unit}
                    perValue={event.perValue}
                    perUnit={event.perUnit}
                  />
                </li>
              )
            })}
          </ul>
        </div>
        <div>
          <ul>
            <li>今日からターゲット日までの年</li>
            <li>
              {calculatedDiff().calculatedDiff.year.toLocaleString()}年（
              {calculatedDiff().actualDiff.year.toLocaleString()}年 ）
            </li>
            <li>今日からターゲット日までの月</li>
            <li>
              {calculatedDiff().calculatedDiff.month.toLocaleString()}月（
              {calculatedDiff().actualDiff.month.toLocaleString()}月 ）
            </li>
            <li>今日からターゲット日までの週</li>
            <li>
              {calculatedDiff().calculatedDiff.week.toLocaleString()}週（
              {calculatedDiff().actualDiff.week.toLocaleString()}週 ）
            </li>
            <li>今日からターゲット日までの日</li>
            <li>
              {calculatedDiff().calculatedDiff.day.toLocaleString()}日（
              {calculatedDiff().actualDiff.day.toLocaleString()}日 ）
            </li>
            <li>今日からターゲット日までの時間</li>
            <li>
              {calculatedDiff().calculatedDiff.hour.toLocaleString()}時間（
              {calculatedDiff().actualDiff.hour.toLocaleString()}時間 ）
            </li>
            <li>今日からターゲット日までの分</li>
            <li>
              {calculatedDiff().calculatedDiff.minute.toLocaleString()}分（
              {calculatedDiff().actualDiff.minute.toLocaleString()}分 ）
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
})
const EventInput = component$(
  ({
    name = '',
    value = 0,
    unit = 'hour',
    perValue = 0,
    perUnit = 'day',
  }: eventType) => {
    return (
      <>
        <label>
          イベント名
          <input type="text" value={name} placeholder="睡眠時間" />
        </label>
        は
        <label>
          <input
            type="number"
            value={perValue}
            onInput$={(event) => (perValue = Number(event?.target?.value))}
          />
          <select value={perUnit}>
            <option value="year">年</option>
            <option value="month">月</option>
            <option value="week">週</option>
            <option value="day" selected>
              日
            </option>
            <option value="hour">時間</option>
            <option value="minute">分</option>
          </select>
        </label>
        に
        <label>
          <input
            type="number"
            value={value}
            class="rounded w-6"
            onInput$={(event) => (value = Number(event?.target?.value))}
          />
        </label>
        <label>
          <select value={unit}>
            <option value="year">年</option>
            <option value="month">月</option>
            <option value="week">週</option>
            <option value="day">日</option>
            <option value="hour" selected>
              時間
            </option>
            <option value="minute">分</option>
          </select>
        </label>
        <button
          onClick$={() => {
            //events.eventsからindex番目の要素を削除
            events.events = events.events.filter((_, index) => index !== 0)
          }}
        >
          削除
        </button>
      </>
    )
  }
)
