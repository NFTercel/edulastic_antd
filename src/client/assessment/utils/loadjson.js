import { assessmentApi } from "@edulastic/api";
import { loadAssessment } from "../actions/assessment";
import { loadQuestions } from "../actions/questions";

// fetch and load the assessment from backend api
export const loadJSON = async (assessmentId, dispatch) => {
  const json = await assessmentApi.getAssessment(assessmentId);
  const { _id, name } = json;
  const { questions } = json.questionsApiActivity;
  dispatch(loadAssessment(_id, name));
  dispatch(loadQuestions(questions));
};
