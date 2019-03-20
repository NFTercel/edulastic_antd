import authorUi from "./authorUi";
import view from "./view";
import items from "./items";
import testItem from "./testItem";
import dictionaries from "./dictionaries";
import author_assignments from "./assignments";
import author_classboard_gradebook from "./gradeBook";
import author_classboard_testActivity from "./testActivity";
import authorGroups from "../../sharedDucks/groups";
import authorQuestions from "../../sharedDucks/questions";
import classResponse from "./classResponse";
import studentResponse from "./studentResponse";
import feedbackResponse from "./feedbackResponse";
import studentQuestionResponse from "./studentQuestionResponse";
import classQuestionResponse from "./classQuestionResponse";
import { itemAdd } from "../../ItemAdd";
import { testList } from "../../TestList";
import { tests } from "../../TestPage";
import { itemDetail } from "../../ItemDetail";
import { question } from "../../QuestionEditor";
import { testsAddItems } from "../../TestPage/components/AddItems";
import { testAssignmentsReducer } from "../../TestPage/components/Assign";
import { assessmentCreate } from "../../AssessmentCreate";
import { manageClass } from "../../ManageClass";

const authorReducers = {
  authorUi,
  view,
  authorGroups,
  items,
  testsAddItems,
  itemAdd,
  question,
  testItem,
  itemDetail,
  dictionaries,
  authorQuestions,
  author_assignments,
  authorTestAssignments: testAssignmentsReducer,
  author_classboard_gradebook,
  author_classboard_testActivity,
  classResponse,
  studentResponse,
  feedbackResponse,
  tests,
  testList,
  assessmentCreate,
  studentQuestionResponse,
  classQuestionResponse,
  manageClass
};

export default authorReducers;
