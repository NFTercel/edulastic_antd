// exact match Object 1
export const emObj1 = {
  userResponse: ["8", "apples"],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: ["8", "apples"]
    },
    alt_responses: []
  }
};


// exact match Object 2
export const emObj2 = {
  userResponse: ["eighty", "apples"],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: ["8", "apples"]
    },
    alt_responses: []
  }
};

// exact match Object 3
export const emObj3 = {
  userResponse: ["eighty", "apples"],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 5,
      value: ["8", "apples"]
    },
    alt_responses: [{
      score: 3,
      value: ["eighty", "apples"]
    }]
  }
};



// partial match Object 1
export const pmObj1 = {
  userResponse: ["eighty", "apples"],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 5,
      value: ["8", "apples"]
    },
    alt_responses: [{
      score: 3,
      value: ["eighteen", "apple"]
    }]
  }
};



// partial match Object 2
export const pmObj2 = {
  userResponse: ["eighty", "apples"],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 5,
      value: ["8", "apples"]
    },
    alt_responses: [{
      score: 3,
      value: ["eighty", "apple"]
    }]
  }
};




// partial match Object 3
export const pmObj3 = {
  userResponse: ["eighty", "apples"],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 3,
      value: ["8", "apple"]
    },
    alt_responses: [{
      score: 6,
      value: ["eighteen", "apples", "backapck"]
    }]
  }
};
