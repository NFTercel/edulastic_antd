// exact match Object 1
export const emObj1 = {
  userResponse: [0, 1, 2],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: [0, 1, 2]
    },
    alt_responses: []
  }
};

// exact match Object 1
export const emObj2 = {
  userResponse: [0, 1, 2],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: [1, 0, 2]
    },
    alt_responses: []
  }
};

// exact match Object 3
export const emObj3 = {
  userResponse: [0, 1, 2],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: [1, 0, 2]
    },
    alt_responses: [
      {
        score: 3,
        value: [0, 1, 2]
      }
    ]
  }
};

// partial match Object 3
export const pmObj1 = {
  userResponse: [0, 1, 2],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 3,
      value: [1, 0, 2]
    },
    alt_responses: []
  }
};

export const pmObj2 = {
  userResponse: [0, 1, 2, 3],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 5,
      value: [1, 0, 2, 3]
    },
    alt_responses: [
      {
        score: 4,
        value: [3, 1, 2, 0]
      }
    ]
  }
};

export const pmObj3 = {
  userResponse: [0, 3, 2, 1],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 5,
      value: [1, 0, 2, 3]
    },
    alt_responses: [
      {
        score: 4,
        value: [3, 0, 2, 1]
      }
    ]
  }
};
