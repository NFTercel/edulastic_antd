// theme
export const LOAD_THEME = "load theme";

// question
export const RECEIVE_QUESTION_REQUEST = "[question] receive question request";
export const RECEIVE_QUESTION_SUCCESS = "[question] receive question success";
export const RECEIVE_QUESTION_ERROR = "[question] receive question error";

export const SAVE_QUESTION_REQUEST = "[question] save question request";
export const SAVE_QUESTION_SUCCESS = "[question] save question success";
export const SAVE_QUESTION_ERROR = "[question] save question error";

export const SET_QUESTION_DATA = "[question] set question data";
export const SET_QUESTION_ALIGNMENT_ADD_ROW = "[question] set question alignment add row";
export const SET_QUESTION_ALIGNMENT_REMOVE_ROW = "[question] set question alignment remove row";
export const SET_QUESTION = "[question] set question";
export const LOAD_QUESTION = "[quesiton] load question from testItem";

// assessment
export const LOAD_ASSESSMENT = "load assessment";

// view
export const CHANGE_VIEW = "[view] CHANGE_VIEW";
export const CHANGE_PREVIEW = "[view] change view";

// preview
export const PREVIEW_UPDATE_LIST = "[preview] PREVIEW_UPDATE_LIST";
export const CHANGE_PREVIEW_TAB = "[preview] CHANGE_PREVIEW_TAB";

// items
export const RECEIVE_ITEMS_REQUEST = "[items] receive items request";
export const RECEIVE_ITEMS_SUCCESS = "[items] receive items success";
export const RECEIVE_ITEMS_ERROR = "[items] receive items error";

export const RECEIVE_ITEM_REQUEST = "[items] receive item request";
export const RECEIVE_ITEM_SUCCESS = "[items] receive item success";
export const RECEIVE_ITEM_ERROR = "[items] receive item error";
export const CREATE_ITEM_REQUEST = "[items] create item request";
export const UPDATE_ITEM_REQUEST = "[items] update item request";

// item detail
export const RECEIVE_ITEM_DETAIL_REQUEST = "[itemDetail] receive request";
export const RECEIVE_ITEM_DETAIL_SUCCESS = "[itemDetail] receive success";
export const RECEIVE_ITEM_DETAIL_ERROR = "[itemDetail] receive error";

export const UPDATE_ITEM_DETAIL_REQUEST = "[itemDetail] update by id request";
export const UPDATE_ITEM_DETAIL_SUCCESS = "[itemDetail] update by id success";
export const UPDATE_ITEM_DETAIL_ERROR = "[itemDetail] update by id error";

export const SET_ITEM_DETAIL_DATA = "[itemDetail] set data";
export const UPDATE_ITEM_DETAIL_DIMENSION = "[itemDetail] update dimension";

export const SET_DRAGGING = "[itemDetail] set dragging";

export const DELETE_ITEM_DETAIL_WIDGET = "[itemDetail] delete widget";
export const UPDATE_TAB_TITLE = "[itemDetail] update tab title";
export const USE_TABS = "[itemDetail] is use tabs";
export const MOVE_WIDGET = "[itemDetail] move widget";

// Test items
export const RECEIVE_TEST_ITEMS_REQUEST = "[testItems] receive items request";
export const RECEIVE_TEST_ITEMS_SUCCESS = "[testItems] receive items success";
export const RECEIVE_TEST_ITEMS_ERROR = "[testItems] receive items error";
export const SET_TEST_ITEMS_REQUEST = "[testItems] set items request";

// Test item
export const CREATE_TEST_ITEM_REQUEST = "[testItem] create item request";
export const CREATE_TEST_ITEM_SUCCESS = "[testItem] create item success";
export const CREATE_TEST_ITEM_ERROR = "[testItem] create item error";

export const UPDATE_TEST_ITEM_REQUEST = "[testItem] update by id request";
export const UPDATE_TEST_ITEM_SUCCESS = "[testItem] update by id success";
export const UPDATE_TEST_ITEM_ERROR = "[testItem] update by id error";

export const CHECK_ANSWER = "[testItem] evaluate test item";
export const SHOW_ANSWER = "[testItem] show test item answer";

export const ADD_ITEM_EVALUATION = "[evaluation] add evaluation";

// Tests
export const RECEIVE_TESTS_REQUEST = "[tests] receive list request";
export const RECEIVE_TESTS_SUCCESS = "[tests] receive list success";
export const RECEIVE_TESTS_ERROR = "[tests] receive list error";

export const CREATE_TEST_REQUEST = "[tests] create test request";
export const CREATE_TEST_SUCCESS = "[tests] create test success";
export const CREATE_TEST_ERROR = "[tests] create test error";

export const UPDATE_TEST_REQUEST = "[tests] update test request";
export const UPDATE_TEST_SUCCESS = "[tests] update test success";
export const UPDATE_TEST_ERROR = "[tests] update test error";

export const RECEIVE_TEST_BY_ID_REQUEST = "[tests] receive test by id request";
export const RECEIVE_TEST_BY_ID_SUCCESS = "[tests] receive test by id success";
export const RECEIVE_TEST_BY_ID_ERROR = "[tests] receive test by id error";

export const SET_TEST_DATA = "[tests] set test data";
export const SET_DEFAULT_TEST_DATA = "[tests] set default test data";

// ui
export const TOGGLE_MENU = "[homeUI] toggle menu";
export const RESPONSIVE_TOGGLE_MENU = "[homeUI] responsive toggle menu";

// Dictionaries
export const RECEIVE_DICT_CURRICULUMS_REQUEST = "[dictionaries] receive curriculums request";
export const RECEIVE_DICT_CURRICULUMS_SUCCESS = "[dictionaries] receive curriculums success";
export const RECEIVE_DICT_CURRICULUMS_ERROR = "[dictionaries] receive curriculums error";
export const RECEIVE_DICT_STANDARDS_REQUEST = "[dictionaries] receive standards request";
export const RECEIVE_DICT_STANDARDS_SUCCESS = "[dictionaries] receive standards success";
export const RECEIVE_DICT_STANDARDS_ERROR = "[dictionaries] receive standards error";
export const CLEAR_DICT_STANDARDS = "[dictionaries] clear standards";

// ClassResponse
export const RECEIVE_CLASS_RESPONSE_REQUEST = "[classresponses] receive list request";
export const RECEIVE_CLASS_RESPONSE_SUCCESS = "[classresponses] receive list success";
export const RECEIVE_CLASS_RESPONSE_ERROR = "[classresponses] receive list error";
export const RECEIVE_STUDENT_RESPONSE_REQUEST = "[studentResponse] receive list request";
export const RECEIVE_STUDENT_RESPONSE_SUCCESS = "[studentResponse] receive list success";
export const RECEIVE_STUDENT_RESPONSE_ERROR = "[studentResponse] receive list error";
export const RECEIVE_FEEDBACK_RESPONSE_REQUEST = "[feedbackResponse] receive list request";
export const RECEIVE_FEEDBACK_RESPONSE_SUCCESS = "[feedbackResponse] receive list success";
export const RECEIVE_FEEDBACK_RESPONSE_ERROR = "[feedbackResponse] receive list error";

// Classboard
export const RECEIVE_GRADEBOOK_REQUEST = "[gradebook] receive list request";
export const RECEIVE_GRADEBOOK_SUCCESS = "[gradebook] receive list success";
export const RECEIVE_GRADEBOOK_ERROR = "[gradebook] receive list error";
export const UPDATE_RELEASE_SCORE = "[gradebook] release score";
export const SET_SHOW_SCORE = "[gradebook] set show score";

export const RECEIVE_TESTACTIVITY_REQUEST = "[testActivity] receive list request";
export const RECEIVE_TESTACTIVITY_SUCCESS = "[testActivity] receive list success";
export const RECEIVE_TESTACTIVITY_ERROR = "[testActivity] receive list error";

// assignments
export const RECEIVE_ASSIGNMENTS_REQUEST = "[assignments] receive list request";
export const RECEIVE_ASSIGNMENTS_SUCCESS = "[assignments] receive list success";
export const RECEIVE_ASSIGNMENTS_ERROR = "[assignments] receive list error";

export const FETCH_CURRENT_EDITING_ASSIGNMENT = "[assignments] fetch assignment data";
export const UPDATE_CURRENT_EDITING_ASSIGNMENT = "[assignments] save current assignment";
export const UPDATE_RELEASE_SCORE_SETTINGS = "[assignments] update assignment settings";
export const TOGGLE_RELEASE_GRADE_SETTINGS = "[assignments show release grade settings]";

export const RECEIVE_CLASS_QUESTION_REQUEST = "[answers] receive list request";
export const RECEIVE_CLASS_QUESTION_SUCCESS = "[answers] receive list success";
export const RECEIVE_CLASS_QUESTION_ERROR = "[answers] receive list error";

export const RECEIVE_STUDENT_QUESTION_REQUEST = "[answer] receive list request";
export const RECEIVE_STUDENT_QUESTION_SUCCESS = "[answer] receive list success";
export const RECEIVE_STUDENT_QUESTION_ERROR = "[answer] receive list success";

// answers
export const CLEAR_ANSWERS = "[answers] clear answers";

// upload image
export const UPDATE_TEST_IMAGE = "update test image";

// logout
export const LOGOUT = "[auth] logout"; // set redux store to initial values

// test page
export const SET_MAX_ATTEMPT = "[tests] maximum attempt";

export const SET_SAFE_BROWSE_PASSWORD = "[tests] safe browser password";
