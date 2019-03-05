const allGrades = [
  { value: "K", text: "Kindergarten" },
  { value: "1", text: "Grade 1" },
  { value: "2", text: "Grade 2" },
  { value: "3", text: "Grade 3" },
  { value: "4", text: "Grade 4" },
  { value: "5", text: "Grade 5" },
  { value: "6", text: "Grade 6" },
  { value: "7", text: "Grade 7" },
  { value: "8", text: "Grade 8" },
  { value: "9", text: "Grade 9" },
  { value: "10", text: "Grade 10" },
  { value: "11", text: "Grade 11" },
  { value: "12", text: "Grade 12" },
  { value: "other", text: "Other" }
];

const allSubjects = [
  { value: "", text: "All Subjects" },
  { value: "Mathematics", text: "Mathematics" },
  { value: "ELA", text: "ELA" },
  { value: "Science", text: "Science" },
  { value: "Social Studies", text: "Social Studies" },
  { value: "Other Subjects", text: "Other Subjects" }
];

const allTags = [{ value: "tag1", text: "Tag1" }, { value: "tag2", text: "Tag2" }];

const allCollections = [
  { value: "Private", text: "Private" },
  { value: "Public", text: "Public" },
  { value: "Edulastic Certified", text: "Edulastic Certified" }
];

const allDepthOfKnowledge = [
  { value: "", text: "All Depth of Knowledge" },
  { value: "Recall", text: "Recall" },
  { value: "Skill/Concept", text: "Skill/Concept" },
  { value: "Strategic Thinking", text: "Strategic Thinking" },
  { value: "Extended Thinking", text: "Extended Thinking" }
];

const allAuthorDifficulty = [
  { value: "", text: "All Levels" },
  { value: "Easy", text: "Easy" },
  { value: "Medium", text: "Medium" },
  { value: "Hard", text: "Hard" }
];

const openPolicy = [
  { value: "Automatically on Start Date", text: "Automatically on Start Date" },
  { value: "Open Manually by Admin", text: "Open Manually by Admin" },
  { value: "Open Manually by Teacher", text: "Open Manually by Teacher" }
];

const closePolicy = [
  { value: "Automatically on Due Date", text: "Automatically on Due Date" },
  { value: "Close Manually by Admin", text: "Close Manually by Admin" }
];

export default {
  allGrades,
  allSubjects,
  allTags,
  allCollections,
  allDepthOfKnowledge,
  allAuthorDifficulty,
  openPolicy,
  closePolicy
};
