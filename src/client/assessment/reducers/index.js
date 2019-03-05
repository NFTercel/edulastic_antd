import items from "./items";
import test from "./test";
import answers from "./answers";
import evaluation from "./evaluation";
import userWork from "./userWork";
import questions from "./questions";

const assessmentReducers = {
  userWork,
  test,
  items,
  answers,
  evaluation,
  assessmentplayerQuestions: questions
};

export default assessmentReducers;
