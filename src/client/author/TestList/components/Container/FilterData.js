const filterData = [
  {
    mode: "multiple",
    size: "large",
    title: "Grades",
    placeholder: "Please select",
    onChange: "grades",
    data: [
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
    ]
  },
  {
    mode: "multiple",
    size: "large",
    title: "Tags",
    placeholder: "Please select",
    onChange: "tags",
    data: [{ value: "tag1", text: "Tag1" }, { value: "tag2", text: "Tag2" }]
  },
  {
    size: "large",
    title: "Subject",
    onChange: "subject",
    data: [
      { value: "", text: "All Subjects" },
      { value: "Mathematics", text: "Mathematics" },
      { value: "ELA", text: "ELA" },
      { value: "Science", text: "Science" },
      { value: "Social Studies", text: "Social Studies" },
      { value: "Other Subjects", text: "Other Subjects" }
    ]
  },
  {
    size: "large",
    title: "Question Types",
    onChange: "questionType",
    data: [{ value: "", text: "All types" }, { value: "sub1", text: "Sub1" }]
  },
  {
    size: "large",
    title: "Knowledge",
    onChange: "depthOfKnowledge",
    data: [
      { value: "", text: "All Depth of Knowledge" },
      { value: "Recall", text: "Recall" },
      { value: "Skill/Concept", text: "Skill/Concept" },
      { value: "Strategic Thinking", text: "Strategic Thinking" },
      { value: "Extended Thinking", text: "Extended Thinking" }
    ]
  },
  {
    size: "large",
    title: "Difficulties",
    onChange: "authorDifficulty",
    data: [
      { value: "", text: "All Levels" },
      { value: "Easy", text: "Easy" },
      { value: "Medium", text: "Medium" },
      { value: "Hard", text: "Hard" }
    ]
  }
];

export default filterData;
