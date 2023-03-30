import { component$ } from '@builder.io/qwik'
import events from 'events'

export const InputEvent = component$(() => {
  return (
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
  )
})
