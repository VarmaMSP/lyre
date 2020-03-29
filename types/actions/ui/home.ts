export const HOME_LOAD_PAGE = 'home/load_page'

interface LoadPageAction {
  type: typeof HOME_LOAD_PAGE
  curationIds: string[]
}

export type HomeActionTypes = LoadPageAction
