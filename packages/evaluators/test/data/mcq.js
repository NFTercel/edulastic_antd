// exact match Object 1
export const emObj1 = {
  userResponse: [0, 1],
  type: 'multipleChoice',
  stimulus: 'batman is black',
  ui_style: {
    type: 'horizontal'
  },
  options: [
    {
      value: 0,
      label: 'True'
    },
    {
      value: 1,
      label: 'False'
    }
  ],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: [1, 0]
    },
    alt_responses: []
  },

};

// exact match object 2
export const emObj2 = {
  userResponse: [1],
  type: 'multipleChoice',
  stimulus: 'batman is black',
  ui_style: {
    type: 'horizontal'
  },
  options: [
    {
      value: 0,
      label: 'True'
    },
    {
      value: 1,
      label: 'False'
    }
  ],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 2,
      value: [0]
    },
    alt_responses: [
      {
        score: 3,
        value: [0]
      }
    ]
  },
  multiple_responses: false,
  smallSize: true
};

// exact match object 3
export const emObj3 = {
  userResponse: [0, 1],
  type: 'multipleChoice',
  stimulus: 'batman is black',
  ui_style: {
    type: 'horizontal'
  },
  options: [
    {
      value: 0,
      label: 'True'
    },
    {
      value: 1,
      label: 'False'
    }
  ],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 2,
      value: [0]
    },
    alt_responses: [
      {
        score: 3,
        value: [0]
      }
    ]
  },
  multiple_responses: false,
  smallSize: true
};

// partial match object 1
export const pmObj1 = {
  userResponse: [0, 1],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 1,
      value: [1, 0]
    },
    alt_responses: []
  },
  multiple_responses: false,
  smallSize: true
};

// partial match object 2
export const pmObj2 = {
  userResponse: [0, 1],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 2,
      value: [1, 2]
    },
    alt_responses: []
  },
  multiple_responses: false,
  smallSize: true
};

export const pmObj3 = {
  userResponse: [1],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 2,
      value: [1, 2]
    },
    alt_responses: [
      {
        score: 3,
        value: [0, 1]
      }
    ]
  },
  multiple_responses: false,
  smallSize: true
};

// attempt score
// partial match object 2
export const attObj1 = {
  userResponse: [0, 1],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 2,
      value: [1, 2]
    },
    min_score_if_attempted: 4,
    alt_responses: []
  },
  multiple_responses: false,
  smallSize: true,

};


// attempt score
// partial match object 2
export const attObj2 = {
  userResponse: [],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 2,
      value: [1, 2]
    },
    min_score_if_attempted: 4,
    alt_responses: []
  },
  multiple_responses: false,
  smallSize: true,
};
