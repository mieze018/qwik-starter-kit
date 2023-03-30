import { component$, useStore } from '@builder.io/qwik'

export default component$(() => {
  // 今日からターゲット日までの時間を算出する
  const date = useStore({
    now: new Date(),
    //デフォルトを3ヶ月後に設定
    targetDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
  })

  const diff = date.targetDate.getTime() - date.now.getTime()
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24))
  const diffHours = Math.ceil(diff / (1000 * 60 * 60))
  const diffMinutes = Math.ceil(diff / (1000 * 60))
  const diffSeconds = Math.ceil(diff / 1000)

  const targetDataToValue = date.targetDate.toISOString().split('T')[0]

  return (
    <div>
      <div>
        <label>
          ターゲット日:
          <input
            type="date"
            value={targetDataToValue}
            onInput$={(event) => {
              date.targetDate = new Date(event?.target?.value)
            }}
          />
        </label>
        <div>
          <ul>
            <li>今日からターゲット日までの日数</li>
            <li>{diffDays}</li>
            <li>今日からターゲット日までの時間</li>
            <li>{diffHours}</li>
            <li>今日からターゲット日までの分</li>
            <li>{diffMinutes}</li>
            <li>今日からターゲット日までの秒</li>
            <li>{diffSeconds}</li>
          </ul>
        </div>
      </div>
    </div>
  )
})
