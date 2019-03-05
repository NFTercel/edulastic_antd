import { createAction, createReducer } from "redux-starter-kit";

import { tabletWidth } from "@edulastic/colors";

export const TOGGLE_MENU = "[homeUI] toggle menu";
export const RESPONSIVE_TOGGLE_MENU = "[homeUI] responsive toggle menu";

const isMobile = parseFloat(window.innerWidth) <= parseFloat(tabletWidth);
const initialState = {
  isSidebarCollapsed: isMobile ? true : false,
  isResponsive: false
};

export const toggleSideBarAction = createAction(TOGGLE_MENU);
export const responsiveToggleSideBarAction = createAction(RESPONSIVE_TOGGLE_MENU);

const reducer = createReducer(initialState, {
  [TOGGLE_MENU]: state => {
    state.isSidebarCollapsed = !state.isSidebarCollapsed;
  },
  [RESPONSIVE_TOGGLE_MENU]: state => {
    state.isResponsive = !state.isResponsive;
  }
});

export default reducer;
