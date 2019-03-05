/* eslint import/prefer-default-export: 0 */
// import { assessmentApi } from '@edulastic/api';
import moment from "moment";
// import { loadQuestions } from '../actions/questions';
// import { loadAssessment } from  '../actions/assessment';

// export const loadJSON = async (assessmentId, dispatch) => {
//   const json = await assessmentApi.getAssessment(assessmentId);
//   const { _id, name } = json;
//   const { questions } = json.questionsApiActivity;
//   dispatch(loadAssessment(_id, name));
//   dispatch(loadQuestions(questions));
// };

export const formatTime = time => {
  if (typeof time === "string") {
    if (isNaN(Number(time))) {
      time = new Date(time);
    } else {
      time = Number(time);
    }
  }
  return moment(time)
    .local()
    .format("MMM, DD YYYY hh:MMA");
};
