import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware, routerMiddleware(history)];

// redux persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "reports", "router", "studentTestItems", "question", "authorQuestions", "itemDetail"]
};

/* istanbul ignore next */
if (process.env.NODE_ENV === "development") {
  middleware.push(createLogger({ collapsed: true }));
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(
    connectRouter(history)(persistedReducer),
    composeWithDevTools(applyMiddleware(...middleware))
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", reducer => {
        store.replaceReducer(reducer);
      });
    }
  }

  return { store, persistor };
};
