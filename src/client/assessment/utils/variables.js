import { has } from "lodash";
import uuid from "uuid";
import produce from "immer";

const mathRegex = /<span class="input__math" data-latex="([^"]+)"><\/span>/g;

const detectVariables = (str, isLatex = false) => {
  if (isLatex) {
    const matches = str.match(/!([a-zA-Z])+([a-zA-Z]|[0-9])*/g);
    return matches ? matches.map(match => match.slice(1)) : [];
  }
  const matches = ` ${str}`.match(/([^\\]?\[)([a-zA-Z])+([a-zA-Z]|[0-9])*\]/g);
  return matches ? matches.map(match => (match.startsWith("[") ? match.slice(1, -1) : match.slice(2, -1))) : [];
};

export const detectVariablesFromObj = (item, exceptions = []) => {
  if (!item) return [];
  const variables = [];

  if (typeof item === "string") {
    const latexes = item.match(mathRegex) || [];
    latexes.forEach(latex => {
      variables.push(...detectVariables(latex, true));
      item.replace(latex, "");
    });

    variables.push(...detectVariables(item));
  } else if (Array.isArray(item)) {
    item.forEach(elem => {
      variables.push(...detectVariablesFromObj(elem));
    });
  } else if (typeof item === "object") {
    for (const key of Object.keys(item)) {
      if ([...exceptions, "variable"].includes(key)) continue;
      variables.push(...detectVariablesFromObj(item[key]));
    }
  }
  return variables;
};

export const updateVariables = item => {
  if (!item) return;
  if (!item.variable) {
    item.variable = {
      variables: []
    };
  }
  const { variables: itemVars } = item.variable;
  const newVariableNames = detectVariablesFromObj(item);
  const newVariables = {};
  newVariableNames.forEach(variableName => {
    newVariables[variableName] = itemVars[variableName] || {
      id: uuid.v4(),
      name: variableName,
      type: "NUMBER_RANGE",
      min: 0,
      max: 100,
      decimal: 0,
      exampleValue: Math.round(Math.random() * 100)
    };
  });
  item.variable.variables = newVariables;
};

const replaceValue = (str, variables, isLatex = false) => {
  if (!variables) return str;
  let result = str;
  Object.keys(variables).forEach(variableName => {
    if (isLatex) {
      result = result.replace(new RegExp(`!${variableName}`, "g"), `${variables[variableName].exampleValue}`);
    } else {
      result = result.replace(new RegExp(`\\[${variableName}\\]`, "g"), `${variables[variableName].exampleValue}`);
    }
  });
  return result;
};

export const replaceValues = (item, variableConfig) => {
  if (!item || !variableConfig || !variableConfig.enabled) return item;
  const { variables } = variableConfig;
  if (!variables) return item;
  if (typeof item === "string") {
    item = replaceValue(item, variables);
    const latexes = item.match(mathRegex) || [];
    for (let i = 0; i < latexes.length; i++) {
      item = item.replace(latexes[i], replaceValue(latexes[i], variables, true));
    }
  } else if (Array.isArray(item)) {
    for (let i = 0; i < item.length; i++) {
      item[i] = replaceValues(item[i], variableConfig);
    }
  } else if (typeof item === "object") {
    for (const key of Object.keys(item)) {
      item[key] = replaceValues(item[key], variableConfig);
    }
  }
  return item;
};

export const replaceVariables = item => {
  if (!has(item, "variable.variables") || !has(item, "variable.enabled") || !item.variable.enabled) return item;
  return produce(item, draft => {
    Object.keys(item).forEach(key => {
      if (key === "id" || key === "variable") return;
      draft[key] = replaceValues(draft[key], item.variable);
    });
  });
};
