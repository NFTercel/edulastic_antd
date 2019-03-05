// exact match Object 1
export const emObj1 = {
  userResponse: [["apple"], ["apples"]],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 1,
      value: [["apple"], ["apples"]]
    },
    alt_responses: []
  }
};


// exact match Object 2
export const emObj2 = {
  userResponse: [["pikachu"], ["squirtle"]],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 5,
      value: [["pikachu"], ["bulbasaur"]]
    },
    alt_responses: [{
      score: 4,
      value: [["pikachu"], ["squirtle"]]
    }]
  }
};

// exact match Object 3
export const emObj3 = {
  userResponse: [["charmander"], ["pikachu"]],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 5,
      value: [["charmander"], ["squirtle"]]
    },
    alt_responses: [{
      score: 3,
      value: [["odish"], ["charmander"]]
    }]
  }
};

// exact match Object 4
export const emObj4 = {
  userResponse: [["charmander", "squirtle"], ["pikachu"]],
  validation: {
    scoring_type: 'exactMatch',
    valid_response: {
      score: 5,
      value: [["squirtle", "charmander"], ["pikachu"]]
    },
    alt_responses: [{
      score: 3,
      value: [["odish"], ["charmander"]]
    }]
  }
};

// partial match Object 1
export const pmObj1 = {
  userResponse: [["1"], ["2"]],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 5,
      value: [["1"], ["3"]]
    },
    alt_responses: [{
      score: 3,
      value: [["1"], ["5"]]
    }]
  }
};



// partial match Object 2
export const pmObj2 = {
  userResponse: [["red", "blue"], ["green"]],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 5,
      value: [["white"], ["red"]]
    },
    alt_responses: [{
      score: 3,
      value: [["blue", "red"], ["yellow"]]
    }]
  }
};




// partial match Object 3
export const pmObj3 = {
  userResponse: [["1"], ["2", "3"]],
  validation: {
    scoring_type: 'partialMatch',
    valid_response: {
      score: 3,
      value: [["8"], ["apple"]]
    },
    alt_responses: [{
      score: 6,
      value: [["4"], ["2", "3"], ["apples", "backapck"]]
    }]
  }
};