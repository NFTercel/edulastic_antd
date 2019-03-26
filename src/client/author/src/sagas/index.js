import itemsSaga from "./items";
import testItemSaga from "./testItem";
import dictionariesSaga from "./dictionaries";
import { classBoardSaga } from "../../ClassBoard";
import { classResponsesSaga } from "../../ClassResponses";
import { testsListSaga } from "../../TestList";
import { testPageSaga } from "../../TestPage";
import { itemDetailSaga } from "../../ItemDetail";
import { ManageClassSaga } from "../../ManageClass";
import { questionSaga } from "../../QuestionEditor";
import { testsAddItemsSaga } from "../../TestPage/components/AddItems";
import { testsAssignSaga } from "../../TestPage/components/Assign";
import assignmentsSaga from "./assignments";
import { reportAssessmentSummarySaga } from "../../Reports/subPages/AssessmentSummary/ducks";
import { reportResponseFrequencySaga } from "../../Reports/subPages/ResponseFrequency/ducks";
import { authorGroupsWatcherSaga } from "../../sharedDucks/groups";
import { watcherSaga as UserDetails } from "../../sharedDucks/userDetails";
import { assessmentPageSaga } from "../../AssessmentCreate";

const authorSagas = [
  itemsSaga(),
  itemDetailSaga(),
  testItemSaga(),
  questionSaga(),
  dictionariesSaga(),
  classBoardSaga(),
  assignmentsSaga(),
  reportAssessmentSummarySaga(),
  reportResponseFrequencySaga(),
  classResponsesSaga(),
  testsListSaga(),
  testPageSaga(),
  testsAddItemsSaga(),
  testsAssignSaga(),
  authorGroupsWatcherSaga(),
  assessmentPageSaga(),
  ManageClassSaga(),
  UserDetails()
];

export default authorSagas;
