import { createAction, createReducer } from "redux-starter-kit";
import { createSelector } from "reselect";
import { values as _values, groupBy as _groupBy, intersection as _intersection, cloneDeep as _cloneDeep } from "lodash";

// actions types
export const LOAD_QUESTIONS = "[author questions] load questions";
export const UPDATE_QUESTION = "[author questions] update questions";
export const SET_FIRST_MOUNT = "[author questions] set first mount";
export const CHANGE_ITEM = "[author questions] change item";
export const CHANGE_ITEM_UI_STYLE = "[author questions] change item ui_style";
export const ADD_QUESTION = "[author questions] add question";
export const CHANGE_CURRENT_QUESTION = "[author quesitons] change current question";
export const ADD_ALIGNMENT = "[author questions] add alignment";
export const REMOVE_ALIGNMENT = "[author questions] remove alignment";

// actions creators
export const loadQuestionsAction = createAction(LOAD_QUESTIONS);
export const addQuestionAction = createAction(ADD_QUESTION);
export const updateQuestionAction = createAction(UPDATE_QUESTION);
export const changeItemAction = createAction(CHANGE_ITEM);
export const changeUIStyleAction = createAction(CHANGE_ITEM_UI_STYLE);
export const setFirstMountAction = createAction(SET_FIRST_MOUNT);
export const changeCurrentQuestionAction = createAction(CHANGE_CURRENT_QUESTION);
export const addAlignmentAction = createAction(ADD_ALIGNMENT);
export const removeAlignmentAction = createAction(REMOVE_ALIGNMENT);

// initialState
const initialState = {
  byId: {},
  current: ""
};

// load questions to the store.
const loadQuestions = (state, { payload }) => {
  state.byId = payload;
};

// update question by id
const updateQuestion = (state, { payload }) => {
  state.byId[payload.id] = payload;
};

const changeItem = (state, { payload }) => {
  const newItem = _cloneDeep(state.byId[state.current]);
  newItem[payload.prop] = payload.value;
  state.byId[state.current] = newItem;
};

const changeUIStyle = (state, { payload }) => {
  const newItem = _cloneDeep(state.byId[state.current]);

  if (!newItem.ui_style) {
    newItem.ui_style = {};
  }

  newItem.ui_style[payload.prop] = payload.value;
  state.byId[state.current] = newItem;
};

const setFirstMount = (state, { id }) => {
  state.byId[id].firstMount = false;
};

// add a new question
const addQuestion = (state, { payload }) => {
  state.byId[payload.id] = payload;
  state.current = payload.id;
};

// change current question
const changeCurrent = (state, { payload }) => {
  state.current = payload;
};

// add alignment to question
const addAlignment = (state, { payload }) => {
  const currentQuestion = state.byId[state.current];

  if (!currentQuestion.alignment || currentQuestion.alignment.length === 0) {
    state.byId[currentQuestion.id].alignment = [payload];
    return;
  }

  let existing = false;

  for (const alignment of currentQuestion.alignment) {
    if (alignment.curriculumId === payload.curriculumId) {
      existing = true;
      const domainGrouped = _groupBy(payload.domain, "id");
      for (const domain of alignment.domain) {
        if (domainGrouped[domain.id]) {
          const selected = domainGrouped[domain.id];
          domains.standards = _intersection(domain.standards, selected.standards, "id");
        }
      }
    }
  }

  if (!existing) {
    currentQuestion.alignment.push(payload);
  }
};

const removeAlignment = (state, { payload }) => {
  const currentQuestion = state.byId[state.current];
  currentQuestion.alignment = currentQuestion.alignment.filter(item => item.curriculumId !== payload);
};

// reducer
export default createReducer(initialState, {
  [LOAD_QUESTIONS]: loadQuestions,
  [UPDATE_QUESTION]: updateQuestion,
  [CHANGE_ITEM]: changeItem,
  [CHANGE_ITEM_UI_STYLE]: changeUIStyle,
  [ADD_QUESTION]: addQuestion,
  [SET_FIRST_MOUNT]: setFirstMount,
  [CHANGE_CURRENT_QUESTION]: changeCurrent,
  [ADD_ALIGNMENT]: addAlignment,
  [REMOVE_ALIGNMENT]: removeAlignment
});

// selectors
const module = "authorQuestions";

export const getCurrentQuestionIdSelector = state => state[module].current;
export const getQuestionsSelector = state => state[module].byId;

// get current Question
export const getCurrentQuestionSelector = createSelector(
  getQuestionsSelector,
  getCurrentQuestionIdSelector,
  (questions, currentId) => questions[currentId]
);

export const getQuestionsArraySelector = createSelector(
  getQuestionsSelector,
  questions => _values(questions)
);

export const getQuestionByIdSelector = (state, qId) => state[module].byId[qId] || {};

// get alignment of current question
export const getQuestionAlignmentSelector = createSelector(
  getCurrentQuestionSelector,
  question => question.alignment || []
);
