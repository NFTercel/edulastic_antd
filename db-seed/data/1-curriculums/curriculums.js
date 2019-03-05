const { getObjectIdByName } = require('../../helpers/index');
const { curriculumCode, curriculumData } = require('../../constants');

const curriculums = [
  {
    id: getObjectIdByName(curriculumCode),
    ...curriculumData
  }
];

module.exports = curriculums;
