import items from "./items";
import test from "./test";
import answers from "./answers";
import evaluation from "./evaluation";
import userWork from "./userWork";
import questions from "./questions";
import shuffledOptions from "./shuffledOptions";

const assessmentReducers = {
  userWork,
  test,
  items,
  answers,
  evaluation,
  assessmentplayerQuestions: questions,
  shuffledOptions
};

export default assessmentReducers;
