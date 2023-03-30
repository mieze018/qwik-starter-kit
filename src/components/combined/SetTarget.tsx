import { component$ } from '@builder.io/qwik'

export const SetTarget = component$(
  (props: {
    min: string
    step: string
    value: string
    // onInput: (event: Event) => void
  }) => (
    <label>
      ターゲット日:
      <input
        type="datetime-local"
        min={props.min}
        step={props.step}
        value={props.value}
        // onInput$={(event) => props.onInput(event)}
      />
    </label>
  )
)
