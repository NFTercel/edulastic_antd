import { createSelector } from "reselect";
import { testItemsApi, evaluateApi, questionsApi } from "@edulastic/api";
import { call, put, all, takeEvery, takeLatest, select } from "redux-saga/effects";
import { cloneDeep, values } from "lodash";
import { message } from "antd";
import { questionType } from "@edulastic/constants";
import { getItemDetailSelector, UPDATE_ITEM_DETAIL_SUCCESS } from "../ItemDetail/ducks";
import { history } from "../../configureStore";
import {
  UPDATE_QUESTION,
  SET_FIRST_MOUNT,
  getCurrentQuestionSelector,
  getQuestionsArraySelector,
  changeCurrentQuestionAction
} from "../sharedDucks/questions";

// constants
export const resourceTypeQuestions = {
  PASSAGE: questionType.PASSAGE,
  PROTRACTOR: questionType.PROTRACTOR
};

export const widgetTypes = {
  QUESTION: "question",
  RESOURCE: "resource"
};

export const RECEIVE_QUESTION_REQUEST = "[question] receive question request";
export const RECEIVE_QUESTION_SUCCESS = "[question] receive question success";
export const RECEIVE_QUESTION_ERROR = "[question] receive question error";

export const SAVE_QUESTION_REQUEST = "[question] save question request";
export const SAVE_QUESTION_SUCCESS = "[question] save question success";
export const SAVE_QUESTION_ERROR = "[question] save question error";

export const SET_QUESTION_DATA = "[question] set question data";
export const SET_QUESTION_ALIGNMENT_ADD_ROW = "[question] set question alignment add row";
export const SET_QUESTION_ALIGNMENT_REMOVE_ROW = "[question] set question alignment remove row";
export const SET_QUESTION = "[question] set question";
export const LOAD_QUESTION = "[quesiton] load question from testItem";
// actions

// Variable
export const CALCULATE_FORMULA = "[variable] calculate variable formulation for example value";

export const receiveQuestionByIdAction = id => ({
  type: RECEIVE_QUESTION_REQUEST,
  payload: {
    id
  }
});

export const saveQuestionAction = () => ({
  type: SAVE_QUESTION_REQUEST
});

export const setQuestionDataAction = question => ({
  type: UPDATE_QUESTION,
  payload: question
});

export const setFirstMountAction = id => ({
  type: SET_FIRST_MOUNT,
  id
});

export const setQuestionAlignmentAddRowAction = alignmentRow => ({
  type: SET_QUESTION_ALIGNMENT_ADD_ROW,
  payload: { alignmentRow }
});

export const setQuestionAlignmentRemoveRowAction = index => ({
  type: SET_QUESTION_ALIGNMENT_REMOVE_ROW,
  payload: { index }
});

export const setQuestionAction = data => ({
  type: SET_QUESTION,
  payload: { data }
});

export const loadQuestionAction = (data, rowIndex) => ({
  type: LOAD_QUESTION,
  payload: { data, rowIndex }
});

export const calculateFormulaAction = data => ({
  type: CALCULATE_FORMULA,
  payload: { data }
});

// reducer

const initialState = {
  entity: null,
  loading: false,
  saving: false,
  error: null,
  saveError: null
};

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RECEIVE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case RECEIVE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        entity: payload.entity
      };
    case RECEIVE_QUESTION_ERROR:
      return {
        ...state,
        loading: false,
        error: payload.error
      };

    case SAVE_QUESTION_REQUEST:
      return {
        ...state,
        saving: true
      };
    case SAVE_QUESTION_SUCCESS:
      return {
        ...state,
        saving: false
      };
    case SAVE_QUESTION_ERROR:
      return {
        ...state,
        saving: false,
        saveError: payload.error
      };

    case SET_QUESTION_DATA:
      return {
        ...state,
        entity: { ...state.entity, data: payload.data }
      };
    case SET_QUESTION_ALIGNMENT_ADD_ROW: {
      const { alignmentRow } = payload;
      const currentAlignment = state.entity.data && state.entity.data.alignment;
      const newAlignment = currentAlignment ? [...currentAlignment] : [];
      newAlignment.push(alignmentRow);
      return {
        ...state,
        entity: {
          ...state.entity,
          data: {
            ...state.entity.data,
            alignment: newAlignment
          }
        }
      };
    }
    case SET_QUESTION_ALIGNMENT_REMOVE_ROW: {
      const { index } = payload;
      const newAlignment = [...state.entity.data.alignment];
      newAlignment.splice(index, 1);
      return {
        ...state,
        entity: {
          ...state.entity,
          data: {
            ...state.entity.data,
            alignment: newAlignment
          }
        }
      };
    }
    case SET_QUESTION:
      return {
        ...state,
        entity: {
          data: payload.data
        }
      };

    default:
      return state;
  }
};

// selectors

export const stateSelector = state => state.question;
export const getQuestionSelector = createSelector(
  stateSelector,
  state => state.entity
);
export const getQuestionDataSelector = createSelector(
  getCurrentQuestionSelector,
  state => state
);
export const getQuestionAlignmentSelector = createSelector(
  getCurrentQuestionSelector,
  state => state.alignment
);

export const getValidationSelector = createSelector(
  getCurrentQuestionSelector,
  state => state.validation
);

// saga

function* receiveQuestionSaga({ payload }) {
  try {
    const entity = yield call(questionsApi.getById, payload.id);

    yield put({
      type: RECEIVE_QUESTION_SUCCESS,
      payload: { entity }
    });
  } catch (err) {
    const errorMessage = "Receive question is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: RECEIVE_QUESTION_ERROR,
      payload: { error: errorMessage }
    });
  }
}

export const getQuestionIds = item => {
  const { rows = [] } = item;
  let questionIds = [];
  rows.forEach(entry => {
    const qIds = (entry.widgets || []).map(w => w.reference);
    questionIds = [...questionIds, ...qIds];
  });

  return questionIds;
};

function* saveQuestionSaga() {
  try {
    const question = yield select(getCurrentQuestionSelector);
    const itemDetail = yield select(getItemDetailSelector);
    let currentQuestionIds = getQuestionIds(itemDetail);
    const { rowIndex, tabIndex } = history.location.state || {};
    const { id } = question;
    const entity = {
      ...question,
      firstMount: false
    };

    if (itemDetail && itemDetail.rows) {
      const isNew = currentQuestionIds.filter(item => item === id).length === 0;

      // if a new question add question
      if (isNew) {
        const widgetType = values(resourceTypeQuestions).includes(entity.type)
          ? widgetTypes.RESOURCE
          : widgetTypes.QUESTION;
        itemDetail.rows[rowIndex].widgets.push({
          widgetType,
          type: entity.type,
          title: entity.title,
          reference: id,
          tabIndex
        });
      }
    }

    currentQuestionIds = getQuestionIds(itemDetail);
    const allQuestions = yield select(getQuestionsArraySelector);
    const currentQuestions = allQuestions.filter(
      q => currentQuestionIds.includes(q.id) && !values(resourceTypeQuestions).includes(q.type)
    );
    const currentResources = allQuestions.filter(
      q => currentQuestionIds.includes(q.id) && values(resourceTypeQuestions).includes(q.type)
    );

    const data = {
      ...itemDetail,
      data: {
        questions: currentQuestions,
        resources: currentResources
      }
    };
    const item = yield call(testItemsApi.updateById, itemDetail._id, data);
    yield put({
      type: UPDATE_ITEM_DETAIL_SUCCESS,
      payload: { item }
    });

    yield call(message.success, "Update item by id is success", "Success");

    if (itemDetail) {
      yield call(history.push, {
        pathname: `/author/items/${itemDetail._id}/item-detail`,
        state: {
          backText: "Back to item list",
          backUrl: "/author/items",
          itemDetail: false
        }
      });
    }
  } catch (err) {
    console.error(err);
    const errorMessage = "Save question is failing";
    yield call(message.error, errorMessage);
    yield put({
      type: SAVE_QUESTION_ERROR,
      payload: { error: errorMessage }
    });
  }
}
// actions

function* calculateFormulaSaga() {
  try {
    const getLatexValuePairs = (id, variables, example) => ({
      id,
      latexes: Object.keys(variables)
        .map(variableName => variables[variableName])
        .filter(variable => variable.type === "FORMULA")
        .reduce(
          (lx, variable) => [
            ...lx,
            {
              id: variable.name,
              formula: variable.formula
            }
          ],
          []
        ),
      variables: Object.keys(variables).map(variableName => ({
        id: variableName,
        value:
          variables[variableName].type === "FORMULA"
            ? variables[variableName].formula
            : example
            ? example[variableName]
            : variables[variableName].exampleValue
      }))
    });

    const question = yield select(getCurrentQuestionSelector);

    if (!question.variable || !question.variable.enabled) {
      return [];
    }
    const variables = question.variable.variables || {};

    const latexValuePairs = [getLatexValuePairs("definition", variables)];
    if (question.variable.examples) {
      for (const example of question.variable.examples) {
        const pair = getLatexValuePairs(`example${example.key}`, variables, example);
        if (pair.latexes.length > 0) {
          latexValuePairs.push(pair);
        }
      }
    }

    const results = yield call(evaluateApi.calculate, latexValuePairs);
    const newQuestion = cloneDeep(question);

    for (const result of results) {
      if (result.id === "definition") {
        Object.keys(result.values).forEach(key => {
          newQuestion.variable.variables[key].exampleValue = result.values[key];
        });
      } else {
        const idx = question.variable.examples.findIndex(example => `example${example.key}` === result.id);
        Object.keys(result.values).forEach(key => {
          newQuestion.variable.examples[idx][key] = result.values[key];
        });
      }
    }

    yield put({
      type: UPDATE_QUESTION,
      payload: newQuestion
    });
  } catch (err) {
    console.log(err);
  }
}

function* loadQuestionSaga({ payload }) {
  try {
    const { data, rowIndex } = payload;
    const { pathname } = history.location.pathname;

    yield put(changeCurrentQuestionAction(data.reference));
    yield call(history.push, {
      pathname: "/author/questions/edit",
      state: {
        backText: "question edit",
        backUrl: pathname,
        rowIndex
      }
    });
  } catch (e) {
    const errorMessage = "Loading Question is failing";
    yield call(message.error, errorMessage);
  }
}

export function* watcherSaga() {
  yield all([
    yield takeEvery(RECEIVE_QUESTION_REQUEST, receiveQuestionSaga),
    yield takeEvery(SAVE_QUESTION_REQUEST, saveQuestionSaga),
    yield takeEvery(LOAD_QUESTION, loadQuestionSaga),
    yield takeLatest(CALCULATE_FORMULA, calculateFormulaSaga)
  ]);
}
