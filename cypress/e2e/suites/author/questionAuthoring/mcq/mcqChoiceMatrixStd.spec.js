import FileHelper from "../../../../framework/util/fileHelper";
import runMatrixPageTests from "../../../../framework/author/itemList/questionType/mcq/runMatrixPageTests";

describe(`${FileHelper.getSpecName(Cypress.spec.name)} >> Author "Choice matrix - standard" type question`, () => {
  runMatrixPageTests({
    group: "Multiple Choice",
    queType: "Choice matrix - standard",
    queText: "Choose the correct number of days in following month",
    ansChoice: ["JAN", "APR", "MAY", "JUN"],
    steams: ["30", "31"],
    extlink: "www.testdomain.com",
    formattext: "formattedtext",
    formula: "s=ar^2"
  });
});
