module.exports = {
  type: {
    ASSESSMENT: "assessment",
    PRACTICE: "practice"
  },
  settingCategories: [
    { id: "mark-as-done", title: "MARK AS DONE" },
    { id: "release-scores", title: "RELEASE SCORES AUTOMATICALLY" },
    { id: "maximum-attempts-allowed", title: "MAXIMUM ATTEMPTS ALLOWED" },
    { id: "test-type", title: "TEST TYPE" },
    { id: "require-safe-exame-browser", title: "REQUIRE SAFE EXAME BROWSER" },
    { id: "show-questions", title: "RELEASE ANSWERS WITH GRADES" },
    { id: "suffle-question", title: "SUFFLE QUESTION" },
    { id: "show-answer-choice", title: "SHOW ANSWER CHOICE" },
    { id: "show-calculator", title: "SHOW CALCULATOR" },
    { id: "answer-on-paper", title: "ANSWER ON PAPER" },
    { id: "require-password", title: "REQUIRE PASSWORD" },
    { id: "evaluation-method", title: "EVALUATION METHOD" },
    { id: "performance-bands", title: "PERFORMANCE BANDS" },
    { id: "title", title: "TITLE" },
    { id: "navigations", title: "NAVIGATIONS / CONTROL" },
    { id: "accessibility", title: "ACCESSIBILITY" },
    { id: "ui-time", title: "UI / TIME" },
    { id: "administration", title: "ADMINISTRATION" }
  ],
  performanceBandsData: {
    ADVANCED: {
      bands: "Advanced",
      from: "100%"
    },
    MASTERY: {
      bands: "Mastery",
      from: "100%"
    },
    BASIC: {
      bands: "Basic",
      from: "100%"
    },
    APPROACHING_BASIC: {
      bands: "Approaching Basic",
      from: "100%"
    },
    UNSATISFACTORY: {
      bands: "Unsatisfactory",
      from: "100%"
    }
  },
  navigations: [
    "Intro Item",
    "Outro Item",
    "Previous",
    "Next",
    "Pause",
    "Save",
    "Submit",
    "Fullscreen",
    "Response Masking",
    "TOC Item Count",
    "Calculator",
    "Submit Criteria",
    "Warning if question not attempted",
    "Confirmation windows on submit",
    "Scroll to test element on test start",
    "Scroll to top on item change",
    "Exit Secure Browser",
    "Acknowledgements",
    "Table of Contents"
  ],
  completionTypes: { AUTOMATICALLY: "Automatically", MANUALLY: "Manually" },
  releaseGradeTypes: {
    DONT_RELEASE: "Do not release scores or responses",
    SCORE_ONLY: "Release scores only",
    WITH_RESPONSE: "Release scores and student responses",
    WITH_ANSWERS: "Release scores,student responses and correct answers"
  },
  releaseGradeKeys: ["DONT_RELEASE", "SCORE_ONLY", "WITH_RESPONSE", "WITH_ANSWERS"],
  calculators: {
    NONE: "None",
    SCIENTIFIC: "Scientific",
    BASIC: "Basic",
    GRAPHING: "Graphing"
  },
  evalTypes: {
    ALL_OR_NOTHING: "All or Nothing",
    PARTIAL_CREDIT: "Partial Credit"
  },
  accessibilities: {
    SHOW_COLOUR_SHCEME: "Show Colour Shceme",
    SHOW_FONT_SIZE: "Show Font Size",
    SHOW_ZOOM: "Show Zoom"
  }
};
