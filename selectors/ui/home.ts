import { Curation } from 'models'
import { createSelector } from 'reselect'
import { AppState } from 'store'
import { $Id, MapById } from 'types/utilities'

export function makeGetHomePageCurations() {
  return createSelector<
    AppState,
    $Id<Curation>[],
    MapById<Curation>,
    Curation[]
  >(
    (state) => state.ui.home.curationIds,
    (state) => state.entities.curations.byId,
    (ids, all) => ids.map((id) => all[id]),
  )
}
