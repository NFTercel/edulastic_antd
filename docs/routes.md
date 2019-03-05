# Routes 🚶

For routing we are using [React-router-dom]() package, and uses [React-router-redux]() to manage them in store as well.
To do navigation and other route manipulation operation use methods from the library.

- Use Link from `react-router-dom` to add hyperlink's in component.

```js
<Link to="/test"> Goto test </Link>
```

---

- Use `withRouter` hoc to do conditional navigation, access route elements etc in the components.

```js
withRouter(MainComponent);
```

---

- For route navigation in saga use `push` and other methods from `react-router-redux` to programatically manipulate routes.

```js
export function* sendDataSaga() {
  while (true) {
    // Wait for user to submit the form
    const data = yield take(ActionTypes.SEND_DATA_REQUEST);
    let response;
    try {
      // Send the data to the server and get a response back
      response = yield call(apiPost, '/api/data', data);
    } catch (err) {
      // Report errors to our store
      yield put(sendDataFailure(err));
      continue;
    }
    // Report success to our store and redirect to another page
    yield put(sendDataSuccess(response));
    yield put(push('/next-page'));
  }
}
```
