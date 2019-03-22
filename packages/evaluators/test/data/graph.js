import { IgnoreRepeatedShapes } from "../../src/graph/quadrants/constants/ignoreRepeatedShapes";
import { ShapeTypes } from "../../src/graph/quadrants/constants/shapeTypes";
import { AxisSegmentsShapeTypes } from "../../src/graph/constants/axisSegmentsShapeTypes";

// Point ===========================================================================================

export const trueAnswerWith1Point = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 8
      }
    ]
  },
  ignore_repeated_shapes: IgnoreRepeatedShapes.NO
};

export const trueAnswerWith2Points = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 8
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 0,
        y: -3
      }
    ]
  },
  ignore_repeated_shapes: IgnoreRepeatedShapes.NO
};

// Line ============================================================================================

export const trueAnswerWith1Line = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: -2,
        y: 5,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.LINE,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const trueLineWithOtherPoints = [
  {
    id: "lrn_4",
    type: ShapeTypes.POINT,
    x: -6,
    y: 4,
    subElement: true
  },
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: 6,
    y: 7,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.LINE,
    subElementsIds: {
      startPoint: "lrn_4",
      endPoint: "lrn_5"
    }
  }
];

export const secondTrueLine = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -1,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: -2,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.LINE,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorLine = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.LINE,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

export const EV315_trueAnswer = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 1,
        y: 1,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 2,
        y: 2,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.LINE,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const EV315_testPoints = [
  {
    id: "lrn_4",
    type: ShapeTypes.POINT,
    x: 1,
    y: 1,
    subElement: true
  },
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: 2,
    y: 2,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.LINE,
    subElementsIds: {
      startPoint: "lrn_4",
      endPoint: "lrn_5"
    }
  },
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 3,
    y: 3,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 4,
    y: 4,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.LINE,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Ray =============================================================================================

export const trueAnswerWith1Ray = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 4,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.RAY,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const trueRayWithOtherPoints = [
  {
    id: "lrn_4",
    type: ShapeTypes.POINT,
    x: 6,
    y: 6,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.RAY,
    subElementsIds: {
      startPoint: "lrn_1",
      endPoint: "lrn_4"
    }
  }
];

export const secondTrueRay = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -1,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: -2,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.RAY,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorRay = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.RAY,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Segment =========================================================================================

export const trueAnswerWith1Segment = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 4,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.SEGMENT,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const trueSegmentWithReversedPoints = {
  id: "lrn_6",
  type: ShapeTypes.SEGMENT,
  subElementsIds: {
    startPoint: "lrn_2",
    endPoint: "lrn_1"
  }
};

export const secondTrueSegment = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -1,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: -2,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.SEGMENT,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorSegment = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.SEGMENT,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Vector ==========================================================================================

export const trueAnswerWith1Vector = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 4,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.VECTOR,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const vectorWithReversedPoints = {
  id: "lrn_6",
  type: ShapeTypes.VECTOR,
  subElementsIds: {
    startPoint: "lrn_2",
    endPoint: "lrn_1"
  }
};

export const secondTrueVector = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -1,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: -2,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.VECTOR,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorVector = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.VECTOR,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Circle ==========================================================================================

export const trueAnswerWith1Circle = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 4,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.CIRCLE,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const trueCircleWithOtherPoints = [
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: 2,
    y: 4,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.CIRCLE,
    subElementsIds: {
      startPoint: "lrn_1",
      endPoint: "lrn_5"
    }
  }
];

export const secondTrueCircle = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -1,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: -2,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.CIRCLE,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorCircle = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.CIRCLE,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Parabola ========================================================================================

export const trueAnswerWith1Parabola = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 2,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 4,
        y: 6,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.PARABOLA,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const trueParabolaWithOtherPoints = [
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: 0,
    y: 6,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.PARABOLA,
    subElementsIds: {
      startPoint: "lrn_1",
      endPoint: "lrn_5"
    }
  }
];

export const secondTrueParabola = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -1,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: -2,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.PARABOLA,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorParabola = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.PARABOLA,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Sine ============================================================================================

export const trueAnswerWith1Sine = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 2,
        y: 5,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 4,
        y: 7,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.SINE,
        subElementsIds: {
          startPoint: "lrn_1",
          endPoint: "lrn_2"
        }
      }
    ]
  }
};

export const trueSineWithOtherPoints = [
  {
    id: "lrn_4",
    type: ShapeTypes.POINT,
    x: -2,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: 0,
    y: 3,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.SINE,
    subElementsIds: {
      startPoint: "lrn_4",
      endPoint: "lrn_5"
    }
  }
];

export const secondTrueSine = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: 1,
    y: -3,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 2,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.SINE,
    subElementsIds: {
      startPoint: "lrn_11",
      endPoint: "lrn_12"
    }
  }
];

export const errorSine = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.SINE,
    subElementsIds: {
      startPoint: "lrn_7",
      endPoint: "lrn_8"
    }
  }
];

// Polygon =========================================================================================

export const trueAnswerWith1Polygon = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: 1,
        y: 7,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 1,
        y: 5,
        subElement: true
      },
      {
        id: "lrn_21",
        type: ShapeTypes.POINT,
        x: 1,
        y: 3,
        subElement: true
      },
      {
        id: "lrn_22",
        type: ShapeTypes.POINT,
        x: 3,
        y: 5,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.POLYGON,
        subElementsIds: {
          0: "lrn_1",
          1: "lrn_2",
          2: "lrn_21",
          3: "lrn_22",
          4: "lrn_1"
        }
      }
    ]
  }
};

export const truePolygonWithOtherOrderedPoints = {
  id: "lrn_6",
  type: ShapeTypes.POLYGON,
  subElementsIds: {
    0: "lrn_2",
    1: "lrn_1",
    2: "lrn_22",
    3: "lrn_21",
    4: "lrn_2"
  }
};

export const secondTruePolygon = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -7,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: -6,
    y: 3,
    subElement: true
  },
  {
    id: "lrn_31",
    type: ShapeTypes.POINT,
    x: -3,
    y: -4,
    subElement: true
  },
  {
    id: "lrn_32",
    type: ShapeTypes.POINT,
    x: -5,
    y: 7,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.POLYGON,
    subElementsIds: {
      0: "lrn_11",
      1: "lrn_12",
      2: "lrn_31",
      3: "lrn_32",
      4: "lrn_11"
    }
  }
];

export const errorPolygon = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 6,
    y: -4,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: -4,
    y: 3,
    subElement: true
  },
  {
    id: "lrn_41",
    type: ShapeTypes.POINT,
    x: -6,
    y: -6,
    subElement: true
  },
  {
    id: "lrn_42",
    type: ShapeTypes.POINT,
    x: 3,
    y: -7,
    subElement: true
  },
  {
    id: "lrn_43",
    type: ShapeTypes.POINT,
    x: 8,
    y: -8,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.POLYGON,
    subElementsIds: {
      0: "lrn_7",
      1: "lrn_8",
      2: "lrn_41",
      3: "lrn_42",
      4: "lrn_43",
      5: "lrn_7"
    }
  }
];

// Ellipse =========================================================================================

export const trueAnswerWith1Ellipse = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: -2,
        y: 2,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 2,
        y: 3,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.POINT,
        x: 2,
        y: 5,
        subElement: true
      },
      {
        id: "lrn_4",
        type: ShapeTypes.ELLIPSE,
        subElementsIds: {
          0: "lrn_1",
          1: "lrn_2",
          2: "lrn_3"
        }
      }
    ]
  }
};

export const trueEllipseWithOtherPoints = [
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: -2,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.ELLIPSE,
    subElementsIds: {
      0: "lrn_1",
      1: "lrn_2",
      2: "lrn_5"
    }
  }
];

export const secondTrueEllipse = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: -5,
    y: -6,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: -5,
    y: -4,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.POINT,
    x: -6,
    y: -3,
    subElement: true
  },
  {
    id: "lrn_14",
    type: ShapeTypes.ELLIPSE,
    subElementsIds: {
      0: "lrn_11",
      1: "lrn_12",
      2: "lrn_13"
    }
  }
];

export const errorEllipse = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: 0,
    y: 0,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: 10,
    y: 10,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.POINT,
    x: 5,
    y: 5,
    subElement: true
  },
  {
    id: "lrn_10",
    type: ShapeTypes.ELLIPSE,
    subElementsIds: {
      0: "lrn_7",
      1: "lrn_8",
      2: "lrn_9"
    }
  }
];

// Hyperbola =======================================================================================

export const trueAnswerWith1Hyperbola = {
  graphType: "quadrants",
  scoring_type: "exactMatch",
  valid_response: {
    score: 1,
    value: [
      {
        id: "lrn_1",
        type: ShapeTypes.POINT,
        x: -1,
        y: 2,
        subElement: true
      },
      {
        id: "lrn_2",
        type: ShapeTypes.POINT,
        x: 3,
        y: 4,
        subElement: true
      },
      {
        id: "lrn_3",
        type: ShapeTypes.POINT,
        x: 4,
        y: 7,
        subElement: true
      },
      {
        id: "lrn_4",
        type: ShapeTypes.HYPERBOLA,
        subElementsIds: {
          0: "lrn_1",
          1: "lrn_2",
          2: "lrn_3"
        }
      }
    ]
  }
};

export const trueHyperbolaWithOtherPoints = [
  {
    id: "lrn_5",
    type: ShapeTypes.POINT,
    x: -2,
    y: -1,
    subElement: true
  },
  {
    id: "lrn_6",
    type: ShapeTypes.HYPERBOLA,
    subElementsIds: {
      0: "lrn_1",
      1: "lrn_2",
      2: "lrn_5"
    }
  }
];

export const secondTrueHyperbola = [
  {
    id: "lrn_11",
    type: ShapeTypes.POINT,
    x: 4,
    y: -7,
    subElement: true
  },
  {
    id: "lrn_12",
    type: ShapeTypes.POINT,
    x: 4,
    y: -5,
    subElement: true
  },
  {
    id: "lrn_13",
    type: ShapeTypes.POINT,
    x: 3,
    y: -4,
    subElement: true
  },
  {
    id: "lrn_14",
    type: ShapeTypes.HYPERBOLA,
    subElementsIds: {
      0: "lrn_11",
      1: "lrn_12",
      2: "lrn_13"
    }
  }
];

export const errorHyperbola = [
  {
    id: "lrn_7",
    type: ShapeTypes.POINT,
    x: -7,
    y: -5,
    subElement: true
  },
  {
    id: "lrn_8",
    type: ShapeTypes.POINT,
    x: -3,
    y: -5,
    subElement: true
  },
  {
    id: "lrn_9",
    type: ShapeTypes.POINT,
    x: 0,
    y: -8,
    subElement: true
  },
  {
    id: "lrn_10",
    type: ShapeTypes.HYPERBOLA,
    subElementsIds: {
      0: "lrn_7",
      1: "lrn_8",
      2: "lrn_9"
    }
  }
];

// Axis Labels =====================================================================================

// true userResponse
export const axisLabelsObj1 = {
  userResponse: [
    {
      point: "Choice A",
      position: 1
    },
    {
      point: "Choice B",
      position: 4
    }
  ],
  validation: {
    graphType: "axisLabels",
    valid_response: {
      score: 5,
      value: [
        {
          point: "Choice A",
          position: 1
        },
        {
          point: "Choice B",
          position: 4
        }
      ]
    },
    alt_responses: []
  }
};

// error userResponse
export const axisLabelsObj2 = {
  userResponse: [
    {
      point: "Choice A",
      position: 2
    },
    {
      point: "Choice B",
      position: 5
    }
  ],
  validation: {
    graphType: "axisLabels",
    valid_response: {
      score: 5,
      value: [
        {
          point: "Choice A",
          position: 1
        },
        {
          point: "Choice B",
          position: 4
        }
      ]
    },
    alt_responses: []
  }
};

// true userResponse with alt_responses and max score
export const axisLabelsObj3 = {
  userResponse: [
    {
      point: "Choice A",
      position: -3
    },
    {
      point: "Choice B",
      position: 9
    }
  ],
  validation: {
    graphType: "axisLabels",
    valid_response: {
      score: 5,
      value: [
        {
          point: "Choice A",
          position: 1
        },
        {
          point: "Choice B",
          position: 4
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            point: "Choice A",
            position: -3
          },
          {
            point: "Choice B",
            position: 9
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            point: "Choice A",
            position: 0
          },
          {
            point: "Choice B",
            position: 4
          }
        ]
      }
    ]
  }
};

// true userResponse with alt_responses and not max score
export const axisLabelsObj4 = {
  userResponse: [
    {
      point: "Choice A",
      position: 0
    },
    {
      point: "Choice B",
      position: 4
    }
  ],
  validation: {
    graphType: "axisLabels",
    valid_response: {
      score: 5,
      value: [
        {
          point: "Choice A",
          position: 1
        },
        {
          point: "Choice B",
          position: 4
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            point: "Choice A",
            position: -3
          },
          {
            point: "Choice B",
            position: 9
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            point: "Choice A",
            position: 0
          },
          {
            point: "Choice B",
            position: 4
          }
        ]
      }
    ]
  }
};

// partially true userResponse with alt_responses
export const axisLabelsObj5 = {
  userResponse: [
    {
      point: "Choice A",
      position: -3
    },
    {
      point: "Choice B",
      position: 4
    }
  ],
  validation: {
    graphType: "axisLabels",
    valid_response: {
      score: 5,
      value: [
        {
          point: "Choice A",
          position: 1
        },
        {
          point: "Choice B",
          position: 4
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            point: "Choice A",
            position: -3
          },
          {
            point: "Choice B",
            position: 9
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            point: "Choice A",
            position: 0
          },
          {
            point: "Choice B",
            position: 4
          }
        ]
      }
    ]
  }
};

// error userResponse with alt_responses
export const axisLabelsObj6 = {
  userResponse: [
    {
      point: "Choice A",
      position: -10
    },
    {
      point: "Choice B",
      position: 5
    }
  ],
  validation: {
    graphType: "axisLabels",
    valid_response: {
      score: 5,
      value: [
        {
          point: "Choice A",
          position: 1
        },
        {
          point: "Choice B",
          position: 4
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            point: "Choice A",
            position: -3
          },
          {
            point: "Choice B",
            position: 9
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            point: "Choice A",
            position: 0
          },
          {
            point: "Choice B",
            position: 4
          }
        ]
      }
    ]
  }
};

// Axis Segments ===================================================================================

// true userResponse
export const axisSegmentsObj1 = {
  userResponse: [
    {
      type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
      point1: 1
    },
    {
      type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
      point1: 4,
      point2: 5
    }
  ],
  validation: {
    graphType: "axisSegments",
    valid_response: {
      score: 5,
      value: [
        {
          type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
          point1: 1
        },
        {
          type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
          point1: 4,
          point2: 5
        }
      ]
    },
    alt_responses: []
  }
};

// error userResponse
export const axisSegmentsObj2 = {
  userResponse: [
    {
      type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
      point1: 2
    },
    {
      type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
      point1: 5,
      point2: 6
    }
  ],
  validation: {
    graphType: "axisSegments",
    valid_response: {
      score: 5,
      value: [
        {
          type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
          point1: 1
        },
        {
          type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
          point1: 4,
          point2: 5
        }
      ]
    },
    alt_responses: []
  }
};

// true userResponse with alt_responses and max score
export const axisSegmentsObj3 = {
  userResponse: [
    {
      type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
      point1: 10
    },
    {
      type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
      point1: -5,
      point2: 0
    }
  ],
  validation: {
    graphType: "axisSegments",
    valid_response: {
      score: 5,
      value: [
        {
          type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
          point1: 1
        },
        {
          type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
          point1: 4,
          point2: 5
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
            point1: 10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: -5,
            point2: 0
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
            point1: -10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: 4,
            point2: 5
          }
        ]
      }
    ]
  }
};

// true userResponse with alt_responses and not max score
export const axisSegmentsObj4 = {
  userResponse: [
    {
      type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
      point1: -10
    },
    {
      type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
      point1: 4,
      point2: 5
    }
  ],
  validation: {
    graphType: "axisSegments",
    valid_response: {
      score: 5,
      value: [
        {
          type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
          point1: 1
        },
        {
          type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
          point1: 4,
          point2: 5
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
            point1: 10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: -5,
            point2: 0
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
            point1: -10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: 4,
            point2: 5
          }
        ]
      }
    ]
  }
};

// partially true userResponse with alt_responses
export const axisSegmentsObj5 = {
  userResponse: [
    {
      type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
      point1: 10
    },
    {
      type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
      point1: 4,
      point2: 5
    }
  ],
  validation: {
    graphType: "axisSegments",
    valid_response: {
      score: 5,
      value: [
        {
          type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
          point1: 1
        },
        {
          type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
          point1: 4,
          point2: 5
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
            point1: 10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: -5,
            point2: 0
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
            point1: -10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: 4,
            point2: 5
          }
        ]
      }
    ]
  }
};

// error userResponse with alt_responses
export const axisSegmentsObj6 = {
  userResponse: [
    {
      type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
      point1: 0
    },
    {
      type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
      point1: -10,
      point2: -5
    }
  ],
  validation: {
    graphType: "axisSegments",
    valid_response: {
      score: 5,
      value: [
        {
          type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
          point1: 1
        },
        {
          type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
          point1: 4,
          point2: 5
        }
      ]
    },
    alt_responses: [
      {
        score: 7,
        value: [
          {
            type: AxisSegmentsShapeTypes.RAY_RIGHT_DIRECTION_LEFT_HOLLOW,
            point1: 10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: -5,
            point2: 0
          }
        ]
      },
      {
        score: 2,
        value: [
          {
            type: AxisSegmentsShapeTypes.SEGMENTS_POINT,
            point1: -10
          },
          {
            type: AxisSegmentsShapeTypes.SEGMENT_BOTH_POINT_INCLUDED,
            point1: 4,
            point2: 5
          }
        ]
      }
    ]
  }
};
