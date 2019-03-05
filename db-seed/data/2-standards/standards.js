const { ObjectID } = require('mongodb');
const standards = require('../../parse-standards-csv/output.json');

const standardsWithObjectId = standards.map(el => ({ ...el, id: ObjectID(el.id) }));

// Standards hierarchy:
// TLO - Domain (highest level)
// ELO - Cluster
// SUB_ELO - Standard
// SUB_SUB_ELO - Component (lowest level)

module.exports = standardsWithObjectId;
