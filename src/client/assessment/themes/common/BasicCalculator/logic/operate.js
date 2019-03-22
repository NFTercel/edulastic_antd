export default function operate(numberOne, numberTwo, operation) {
  const one = parseFloat(numberOne);
  const two = parseFloat(numberTwo);

  if (operation === "+") {
    return (one + two).toString();
  }

  if (operation === "-") {
    return (one - two).toString();
  }

  if (operation === "x") {
    return (one * two).toString();
  }

  if (operation === "÷") {
    if (two == "0") {
      alert("Divide by 0 error");
      return "0";
    } else {
      return (one / two).toString();
    }
  }
  throw Error(`Unknown operation '${operation}'`);
}
