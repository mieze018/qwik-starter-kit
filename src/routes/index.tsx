import {
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from '@builder.io/qwik'
import { DisplayRemainingTime } from '~/components/combined/DisplayRemainingTime'
import { EventInput } from '~/components/combined/EventInput'
import { SetTarget } from '~/components/combined/SetTarget'
import { calculateDiff } from '~/libs/calculateDiffs'
import { type eventType, contextEvents, contextDates } from '~/libs/contexts'

//現在の時間からターゲット日までの時間を各単位で算出する
//ターゲット日からマイナスするイベントを追加できる
//ターゲット日からマイナスするイベントは、毎日、毎週、毎月、毎年のいずれかを選択できる
//ターゲット日からマイナスするイベントは、時間、分のいずれかを選択できる
//ターゲット日からマイナスするイベントは、複数追加できる
//ターゲット日からマイナスするイベントは、削除できる
//ターゲット日からマイナスするイベントは、編集できる
//ターゲット日からマイナスするイベントは、ターゲット日までの時間に反映される
//ターゲット日の入力は、datetime-localを使用し単位は分まで

export default component$(() => {
  // 今日からターゲット日までの時間を算出する
  const dates = useStore({
    now: new Date(),
    //デフォルトを3ヶ月後に設定
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  })
  useContextProvider(contextDates, dates)
  // ターゲット日までのmillisecondsからマイナスするイベントデータを保持する
  const events = useSignal<eventType[]>([
    //デフォルトデータ
    {
      name: '睡眠時間',
      value: 8,
      unit: 'hour',
      perValue: 1,
      perUnit: 'day',
    },
  ])
  useContextProvider(contextEvents, events.value)

  // 現在からターゲット日までのmilliseconds
  const diff = dates.targetDate.getTime() - dates.now.getTime()
  const calculatedDiff = calculateDiff({ diff, events })

  // millisecondsをinputのdatetime-localのvalueに変換する（分まで）
  const toDateTimeLocal = (date: Date) => date.toISOString().slice(0, 16)
  const targetDataToValue = toDateTimeLocal(dates.targetDate)
  const setTargetStepToMinutes = '60'
  const handleSetTarget = (e: Event) => {
    dates.targetDate = new Date(e?.currentTarget?.value)
  }
  return (
    <div>
      <div>
        <SetTarget
          min={toDateTimeLocal(dates.now)}
          step={setTargetStepToMinutes}
          value={targetDataToValue}
          // onInput={(e) => handleSetTarget(e)}
        />
        <div>
          <label>ターゲットからマイナスする時間:</label>
          <button
            onClick$={() => {
              //eventsに新しいオブジェクトを追加
              events.value = [
                ...events.value,
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
            {events.value.map((event, index) => {
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
        <DisplayRemainingTime
          calculatedDiffYear={calculatedDiff.calculatedDiff.year.toLocaleString()}
          calculatedDiffMonth={calculatedDiff.calculatedDiff.month.toLocaleString()}
          calculatedDiffWeek={calculatedDiff.calculatedDiff.week.toLocaleString()}
          calculatedDiffDay={calculatedDiff.calculatedDiff.day.toLocaleString()}
          calculatedDiffHour={calculatedDiff.calculatedDiff.hour.toLocaleString()}
          calculatedDiffMinute={calculatedDiff.calculatedDiff.minute.toLocaleString()}
          actualDiffYear={calculatedDiff.actualDiff.year.toLocaleString()}
          actualDiffMonth={calculatedDiff.actualDiff.month.toLocaleString()}
          actualDiffWeek={calculatedDiff.actualDiff.week.toLocaleString()}
          actualDiffDay={calculatedDiff.actualDiff.day.toLocaleString()}
          actualDiffHour={calculatedDiff.actualDiff.hour.toLocaleString()}
          actualDiffMinute={calculatedDiff.actualDiff.minute.toLocaleString()}
        />
      </div>
    </div>
  )
})
