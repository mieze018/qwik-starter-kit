import type { unitType, perUnitType } from "~/libs/contexts"

/** unitをmillisecondsに変換する */
export const unitToMilliseconds = (unit: unitType | perUnitType) => {
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
/** millisecondsをunit単位に変換する */
export const millisecondsToUnit = (
  milliseconds: number,
  unit: unitType | perUnitType
) => {
  return milliseconds / unitToMilliseconds(unit)
}
/** valueをunit単位に変換する */
export const valueToUnit = (value: number, unit: unitType | perUnitType) => {
  return value * unitToMilliseconds(unit)
}
