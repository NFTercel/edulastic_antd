import { TOGGLE_MENU, RESPONSIVE_TOGGLE_MENU } from "../constants/actions";

const initialState = {
  isSidebarCollapsed: window.innerWidth < 770 ? true : false,
  isResponsive: false
};
const reducer = (state = initialState, { type }) => {
  switch (type) {
    case TOGGLE_MENU:
      return {
        ...state,
        isSidebarCollapsed: !state.isSidebarCollapsed
      };
    case RESPONSIVE_TOGGLE_MENU:
      return {
        ...state,
        isResponsive: !state.isResponsive
      };
    default:
      return state;
  }
};

export default reducer;
