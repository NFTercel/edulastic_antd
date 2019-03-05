import { cloneDeep, set } from "lodash";
import { arrayMove } from "react-sortable-hoc";

export const change = ({ item, setQuestionData }) => (path, value) => {
  const newData = cloneDeep(item);
  set(newData, path, value);
  setQuestionData(newData);
};

export const remove = ({ item, setQuestionData, prop }) => index => {
  if (item.metadata && Array.isArray(item.metadata[prop])) {
    const newData = cloneDeep(item);
    newData.metadata[prop].splice(index, 1);
    setQuestionData(newData);
  }
};

export const sort = ({ item, setQuestionData, prop }) => ({ oldIndex, newIndex }) => {
  const newData = cloneDeep(item);

  if (!newData.metadata || !Array.isArray(newData.metadata[prop])) {
    return;
  }

  newData.metadata[prop] = arrayMove(newData.metadata[prop], oldIndex, newIndex);
  setQuestionData(newData);
};

export const add = ({ item, setQuestionData, prop }) => () => {
  const newData = cloneDeep(item);

  if (!newData.metadata) {
    newData.metadata = {};
  }

  if (!Array.isArray(newData.metadata[prop])) {
    newData.metadata[prop] = [];
  }

  newData.metadata[prop].push("");
  setQuestionData(newData);
};
