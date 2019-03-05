export const TOOLS = {
  // Pickable

  POINT: "point",
  LINE: "line",
  RAY: "ray",
  SEGMENT: "segment",
  VECTOR: "vector",
  CIRCLE: "circle",
  SIN: "sine",
  POLYGON: "polygon",
  PARABOLA: "parabola",
  LABEL: "label",
  MARK: "mark",
  BOTH_INCLUDED_SEGMENT: "bothIncludedSegment",
  BOTH_NOT_INCLUDED_SEGMENT: "bothNotIncludedSegment",
  ONLY_RIGHT_INCLUDED_SEGMENT: "onlyRightIncludedSegment",
  ONLY_LEFT_INCLUDED_SEGMENT: "onlyLeftIncludedSegment",
  INFINITY_TO_INCLUDED_SEGMENT: "infinityToIncludedSegment",
  INCLUDED_TO_INFINITY_SEGMENT: "includedToInfinitySegment",
  INFINITY_TO_NOT_INCLUDED_SEGMENT: "infinityToNotIncludedSegment",
  NOT_INCLUDED_TO_INFINITY_SEGMENT: "notIncludedToInfinitySegment",
  SEGMENTS_POINT: "segmentsPoint",
  TRASH: "trash",

  // Default
  RESET: "reset"
};

export const EVENT_NAMES = {
  // jsx
  UP: "up",
  DOWN: "down",

  // local
  CHANGE_NEW: "change.new",
  CHANGE_MOVE: "change.move"
};

export default {
  TOOLS,
  EVENT_NAMES
};

export const RENDERING_BASE = {
  ZERO_BASED: "zero-based",
  LINE_MINIMUM_VALUE: "min-value-based"
};

export const FRACTIONS_FORMAT = {
  NOT_NORMALIZED: "not-normalized-fractions",
  NORMALIZED: "normalized-fractions",
  IMPROPER: "improper-fractions"
};
