import type { Signal } from "@builder.io/qwik"
import type { eventType } from "~/libs/contexts"
import { valueToUnit, millisecondsToUnit } from "~/libs/convertUnits"

//イベントがターゲットまでに何回あるかを計算
export const getEventIterationCount = ({ diff, events }: {
  diff: number
  events: Signal<eventType[]>
}) => {
  if (events.value.length === 0) return 0
  const eventIterationCount =
    events.value.reduce((acc, event) => {
      return (
        acc +
        Math.floor(millisecondsToUnit(diff, event.perUnit) / event.perValue)
      )
    }, 0) / events.value.length
  return eventIterationCount
}

//ターゲット日までのmillisecondsからイベントを引いたmillisecondsを算出して各単位で返す
export const calculateDiff = ({ diff, events }: {
  diff: number
  events: Signal<eventType[]>
}) => {
  const eventIterationCount = getEventIterationCount({ diff, events })
  const eventIterationMilliseconds = events.value.reduce((acc, event) => {
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
