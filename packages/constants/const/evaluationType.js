const EXACT_MATCH = "exactMatch";
const PARTIAL_MATCH = "partialMatch";
const PARTIAL_MATCH_V2 = "partialMatchV2";

module.exports = {
  EXACT_MATCH,
  PARTIAL_MATCH,
  PARTIAL_MATCH_V2,
  exactMatch: {
    value: EXACT_MATCH,
    label: "Exact match"
  },
  partialMatch: {
    value: PARTIAL_MATCH,
    label: "Partial match"
  },
  partialMatchV2: {
    value: PARTIAL_MATCH_V2,
    label: "Partial match per response"
  }
};
