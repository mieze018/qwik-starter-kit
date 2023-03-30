import { component$ } from '@builder.io/qwik'

export const DisplayRemainingTime = component$(
  ({
    calculatedDiffYear,
    calculatedDiffMonth,
    calculatedDiffWeek,
    calculatedDiffDay,
    calculatedDiffHour,
    calculatedDiffMinute,
    actualDiffYear,
    actualDiffMonth,
    actualDiffWeek,
    actualDiffDay,
    actualDiffHour,
    actualDiffMinute,
  }: {
    calculatedDiffYear: string
    calculatedDiffMonth: string
    calculatedDiffWeek: string
    calculatedDiffDay: string
    calculatedDiffHour: string
    calculatedDiffMinute: string
    actualDiffYear: string
    actualDiffMonth: string
    actualDiffWeek: string
    actualDiffDay: string
    actualDiffHour: string
    actualDiffMinute: string
  }) => (
    <div>
      <ul>
        <li>今日からターゲット日までの年</li>
        <li>
          {calculatedDiffYear}年（
          {actualDiffYear}年 ）
        </li>
        <li>今日からターゲット日までの月</li>
        <li>
          {calculatedDiffMonth}ヶ月（
          {actualDiffMonth}ヶ月 ）
        </li>
        <li>今日からターゲット日までの週</li>
        <li>
          {calculatedDiffWeek}週（
          {actualDiffWeek}週 ）
        </li>
        <li>今日からターゲット日までの日</li>
        <li>
          {calculatedDiffDay}日（
          {actualDiffDay}日 ）
        </li>
        <li>今日からターゲット日までの時間</li>
        <li>
          {calculatedDiffHour}時間（
          {actualDiffHour}時間 ）
        </li>
        <li>今日からターゲット日までの分</li>
        <li>
          {calculatedDiffMinute}分（
          {actualDiffMinute}分 ）
        </li>
      </ul>
    </div>
  )
)
