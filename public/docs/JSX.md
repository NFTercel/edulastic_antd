# JSX Guideline

- React only allows to export one top level component, so use [Fragment](https://reactjs.org/docs/fragments.html) to wrap in case of returning
  multiple elements from conditions, component etc where div is added for exactly this purpose. This could get rid out unwanted padding etc.

```
 const Assignment = () =>  (
   <React.Fragment>
    <AssignmentList/>
    <AssignmentFooter/>
  </React.Fragment>
  );
```

---

- Move complex logic out of components and ideally keep it in a variable if possble.

❌ 🤦‍♀

```
  {
    (attemptCount > test.maxAttempt) && (attemptCount < 3)
    && <Review/>
  }
```

✅ 💃

```
  render() {
    let showReview = attemptCount > test.maxAttempt) && (attemptCount < 3);
    return (
      ...
      {showReview && <Review/>}
      ...
    )
  }
```

---

- Extract out components to a varaible while putting inside loops and conditions

```
  render() {

    let AttemptRow = (
      <RowWrapper>
        <Button> Filter </Button>
      </RowWrapper>
    )

    return (
      ...
      {attempts.map(attempt => <AttemptRow data={attempt}>)}
      ...
    )
  }
```
