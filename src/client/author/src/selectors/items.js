import { createSelector } from "reselect";

export const stateSelector = state => state.items;
export const itemsSelector = createSelector(
  stateSelector,
  state => state.list
);
export const itemSelector = createSelector(
  stateSelector,
  state => state.item
);

export const getItemSelector = createSelector(
  itemSelector,
  state => state.item
);
export const getItemLoadingSelector = createSelector(
  itemSelector,
  state => state.loading
);

export const getItemsListSelector = createSelector(
  itemsSelector,
  state => state.items
);
export const getItemsPageSelector = createSelector(
  itemsSelector,
  state => state.page
);
export const getItemsLimitSelector = createSelector(
  itemsSelector,
  state => state.limit
);
export const getItemsCountSelector = createSelector(
  itemsSelector,
  state => state.count
);
export const getItemsLoadingSelector = createSelector(
  itemsSelector,
  state => state.loading
);
