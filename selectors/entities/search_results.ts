import { AppState } from 'store'

export function getByHashIds(state: AppState, hashIds: string[]) {
  const obj = state.entities.searchResults.byHashId
  return hashIds.map((id) => obj[id]).filter((x) => !!x)
}
