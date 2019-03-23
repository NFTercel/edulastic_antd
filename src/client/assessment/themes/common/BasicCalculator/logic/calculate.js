import { isNumber } from "lodash";

export default function calculate(obj, buttonName) {
  function operate(numberOne, numberTwo, operation) {
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

  if (buttonName === "AC") {
    return {
      total: null,
      next: null,
      operation: null
    };
  }

  if (!isNaN(parseFloat(buttonName)) && isNumber(parseFloat(buttonName))) {
    if (buttonName === "0" && obj.next === "0") {
      return {};
    }

    if (obj.operation) {
      if (obj.next) {
        return { next: obj.next + buttonName };
      }
      return { next: buttonName };
    }

    if (obj.next) {
      return {
        next: obj.next + buttonName,
        total: null
      };
    }
    return {
      next: buttonName,
      total: null
    };
  }

  if (buttonName === "%") {
    if (obj.operation && obj.next) {
      const result = operate(obj.total, obj.next, obj.operation);
      return {
        total: (parseFloat(result) / 100).toString(),
        next: null,
        operation: null
      };
    }
    if (obj.next) {
      return {
        next: (parseFloat(obj.next) / 100).toString()
      };
    }
    return {};
  }

  if (buttonName === ".") {
    if (obj.next) {
      if (obj.next.includes(".")) {
        return {};
      }
      return { next: obj.next + "." };
    }
    return { next: "0." };
  }

  if (buttonName === "=") {
    if (obj.next && obj.operation) {
      return {
        total: operate(obj.total, obj.next, obj.operation),
        next: null,
        operation: null
      };
    } else {
      return {};
    }
  }

  if (buttonName === "+/-") {
    if (obj.next) {
      return { next: (-1 * parseFloat(obj.next)).toString() };
    }
    if (obj.total) {
      return { total: (-1 * parseFloat(obj.total)).toString() };
    }
    return {};
  }

  if (obj.operation) {
    return {
      total: operate(obj.total, obj.next, obj.operation),
      next: null,
      operation: buttonName
    };
  }

  if (!obj.next) {
    return { operation: buttonName };
  }

  return {
    total: obj.next,
    next: null,
    operation: buttonName
  };
}
