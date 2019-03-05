import ui from "./Sidebar/ducks";
import skillReport from "./SkillReport/ducks";
import { studentAssignmentReducer } from "./sharedDucks/AssignmentModule";
import { studentReportReducer } from "./sharedDucks/ReportsModule";
import testItem from "./sharedDucks/TestItem";
import testFeedback from "./TestAcitivityReport/ducks";

import user from "./Login/ducks";

const studentReducer = {
  ui,
  skillReport,
  user,
  testFeedback,
  studentReport: studentReportReducer,
  studentAssignment: studentAssignmentReducer,
  studentTestItems: testItem
};

export default studentReducer;
