import questionSaga from "./question";
import itemsSaga from "./items";
import testSaga from "./test";
import evaluationSaga from "./evaluation";
import viewSaga from "./view";
import assessmentSaga from "./assessment";

const assessmentSagas = [questionSaga(), itemsSaga(), testSaga(), evaluationSaga(), viewSaga(), assessmentSaga()];

export default assessmentSagas;
