export const appQueryParams = {
  step: 'step',
} as const

export type QueryParam = (typeof appQueryParams)[keyof typeof appQueryParams]
export type QueryParamRecord = {
  [key in QueryParam]?: string
}
