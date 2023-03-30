import { createContextId } from "@builder.io/qwik"

export type perUnitType = 'year' | 'month' | 'week' | 'day'
export type unitType = 'hour' | 'minute'
export type eventType = {
  name: string
  value: number
  unit: unitType
  perValue: number
  perUnit: perUnitType
}

export const contextEvents = createContextId<eventType[]>('events')

export const contextDates = createContextId<{
  now: Date
  targetDate: Date
}>('dates')
