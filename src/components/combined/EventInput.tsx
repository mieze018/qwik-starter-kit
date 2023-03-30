import { component$, useContext } from '@builder.io/qwik'
import type { eventType } from '~/libs/contexts'
import { contextEvents } from '~/libs/contexts'

export const EventInput = component$(
  ({
    name = '',
    value = 0,
    unit = 'hour',
    perValue = 0,
    perUnit = 'day',
  }: eventType) => {
    const events = useContext(contextEvents)
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
        <button onClick$={() => {}}>削除</button>
      </>
    )
  }
)
