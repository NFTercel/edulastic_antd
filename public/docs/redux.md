# Redux

For managing the state of the application we are using [redux](https://redux.js.org/), and following the [ducks pattern](https://github.com/erikras/ducks-modular-redux) where all store/redux related stuffs are kept in a single file named `ducks`. Follow the rules while creating ducks.

- MUST export default a function called reducer()
- MUST export its action creators as functions
- MUST have action types in the form npm-module-or-app/reducer/ACTION_TYPE
- MAY export its action types as UPPER_SNAKE_CASE, if an external reducer needs to listen for them, or if it is a published reusable library

Check end of document for example.

## Store

While creating store slice, prefix it with related module (student, teacher etc). e.g: `StudentReport` `TeacherAssignment` etc.
Ideally stores should be kept flat, to avoid duplication and editing at multiple places or copying data around too much. We use
[normalizr](https://github.com/paularmstrong/normalizr) to normalize/flatten the store. and most stores will have a structure as per
provided below

```js
 StudentAsssignment: {
   byId: {
     5abcd23421ac4: {
       _id: "5abcd23421ac4",
       title: "testAssignment",
       ownerId: "5abcd2342bac3",
       studentIds: ["5abcd2ac42234", "5abcd2bac32423"]
     },
     5abcd2ac42fac4: {
       _id: "5abcd23421ac4",
       title: "testAssignment",
       ownerId: "5abcd2342bac3",
       studentIds: ["5abcd2ac42234", "5abcd2bac32423"]
     }
   },
   allIds: ["5abcd23421ac4", "5abcd2ac42fac4"],
   current: 0,
   errors: {

   },
   isloading: false
 }
```

## Action Types

Action types will be a string prefixed with the affecting storeSlice. i.e

```js
const SET_ASSIGNMENT = "[studentAssignment] set student assignments";
const DELETE_ASSIGNMENT = "[studentAssignment] delete student assignment";
```

## Actions Creators

Action creators are created using [`createAction`](https://github.com/reduxjs/redux-starter-kit/blob/master/docs/api/createAction.md) from 'redux-starter-kit`package. Actions should be suffixed with`action`.

```js
let setAssignmentAction = createAction(SET_ASSIGNMENT);
let deleteAssignmentAction = createAction(DELETE_ASSIGNMENT);
```

## Reducers

Alike actions, reducers are created with [`createReducer`](https://github.com/reduxjs/redux-starter-kit/blob/master/docs/api/createReducer.md) method from `redux-starter-kit` package. State can be directly mutate as createReducer internally using immer. Refer the [`createReducer`](https://github.com/reduxjs/redux-starter-kit/blob/master/docs/api/createReducer.md) doc.

```js
const counterReducer = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
});
```

## Selectors

We are using [`reselect`](https://github.com/reduxjs/reselect#readme) for writing selectors.

- Selectors can compute derived data, allowing Redux to store the minimal possible state.
- Selectors are efficient. A selector is not recomputed unless one of its arguments changes.
- Selectors are composable. They can be used as input to other selectors.

```js
import { createSelector } from "reselect";

const shopItemsSelector = state => state.shop.items;
const taxPercentSelector = state => state.shop.taxPercent;

const subtotalSelector = createSelector(
  shopItemsSelector,
  items => items.reduce((acc, item) => acc + item.value, 0)
);

const taxSelector = createSelector(
  subtotalSelector,
  taxPercentSelector,
  (subtotal, taxPercent) => subtotal * (taxPercent / 100)
);

export const totalSelector = createSelector(
  subtotalSelector,
  taxSelector,
  (subtotal, tax) => ({ total: subtotal + tax })
);

let exampleState = {
  shop: {
    taxPercent: 8,
    items: [{ name: "apple", value: 1.2 }, { name: "orange", value: 0.95 }]
  }
};
```

## Saga

[Redux saga](https://redux-saga.js.org/) library is used to manage the async flow. Refer the docs.

### Sample Duck

```js
import { createSelector } from "reselect";
import { createAction, createReducer } from "redux-starter-kit";

// action types
export const ADD_TODO = "[todo] add todo";
export const DELETE_TODO = "[todo] delete todo";

// action creators
export const addTodoAction = createAction(ADD_TODO);
export const deleteTodoAction = createAction(DELETE_TODO);

//
// intiial state
const initialState = {
  byId: {},
  allIds: [],
  error: {},
  isLoading: false,
  current: 0
};

const addTodo = (state, { payload }) => {
  state.allIds.push(payload._id);
  state.byId[payload._id] = payload;
};

// reducer
export default (reducer = createReducer(initialState, {
  [ADD_TODO]: addTodo,
  [DELETE_TODO]: deleteTodo
}));
```
