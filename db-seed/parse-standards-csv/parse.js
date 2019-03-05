const fs = require('fs');
const parse = require('csv-parse');
const { getObjectIdByName } = require('../helpers/index');
const { curriculumCode, csvFileName } = require('../constants');

const outputTlo = [];
const outputElo = [];
const outputSubElo = [];
const outputSubSubElo = [];

const parser = parse({ delimiter: ',' });
const src = fs.createReadStream(`./${csvFileName}`);
src.pipe(parser);

parser.on('readable', () => {
  const curriculumId = getObjectIdByName(curriculumCode);
  let record = parser.read();
  while (record) {
    const [, grades,, parentIdentifier,,, identifier, description,, level] = record;
    const cleanIdentifier = identifier.replace('##-', '');
    const obj = {
      id: getObjectIdByName(curriculumCode + cleanIdentifier),
      curriculumId,
      grades: grades.split(','),
      level,
      identifier: cleanIdentifier,
      description,
      parentIdentifier: parentIdentifier.replace('##-', '')
    };
    switch (level) {
      case 'TLO':
        outputTlo.push(obj);
        break;
      case 'ELO':
        outputElo.push(obj);
        break;
      case 'SUB_ELO':
        outputSubElo.push(obj);
        break;
      case 'SUB_SUB_ELO':
        outputSubSubElo.push(obj);
        break;
      default:
        break;
    }
    record = parser.read();
  }
});

parser.on('error', (err) => {
  console.error(err.message);
});

parser.on('end', () => {
  outputElo.forEach((el) => {
    const parent = outputTlo.filter(parEl => parEl.identifier === el.parentIdentifier)[0];
    el.tloIdentifier = parent.identifier;
    el.tloDescription = parent.description;
    el.tloId = parent.id;
  });
  outputSubElo.forEach((el) => {
    const parent = outputElo.filter(parEl => parEl.identifier === el.parentIdentifier)[0];
    el.tloIdentifier = parent.tloIdentifier;
    el.tloDescription = parent.tloDescription;
    el.tloId = parent.tloId;
    el.eloIdentifier = parent.identifier;
    el.eloDescription = parent.description;
    el.eloId = parent.id;
  });
  outputSubSubElo.forEach((el) => {
    const parent = outputSubElo.filter(parEl => parEl.identifier === el.parentIdentifier)[0];
    el.tloIdentifier = parent.tloIdentifier;
    el.tloDescription = parent.tloDescription;
    el.tloId = parent.tloId;
    el.eloIdentifier = parent.eloIdentifier;
    el.eloDescription = parent.eloDescription;
    el.eloId = parent.eloId;
    el.subEloIdentifier = parent.identifier;
    el.subEloDescription = parent.description;
    el.subEloId = parent.id;
  });
  const totalArr = outputTlo.concat(outputElo).concat(outputSubElo).concat(outputSubSubElo);

  const totalArrWithoutParentIdentifier = [];
  totalArr.forEach((el) => {
    const { parentIdentifier, ...rest } = el;
    totalArrWithoutParentIdentifier.push(rest);
  });

  fs.writeFile('output.json', JSON.stringify(totalArrWithoutParentIdentifier), (err) => {
    if (err) console.log(err);
    console.log('Successfully Written to File.');
  });
});
