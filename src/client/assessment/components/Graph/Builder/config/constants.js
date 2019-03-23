export const TOOLS = {
  // Pickable

  POINT: "point",
  LINE: "line",
  RAY: "ray",
  SEGMENT: "segment",
  VECTOR: "vector",
  CIRCLE: "circle",
  SIN: "sine",
  TANGENT: "tangent",
  SECANT: "secant",
  POLYGON: "polygon",
  PARABOLA: "parabola",
  HYPERBOLA: "hyperbola",
  ELLIPSE: "ellipse",
  LABEL: "label",
  MARK: "mark",
  SEGMENTS_POINT: "segments_point",
  SEGMENT_BOTH_POINT_INCLUDED: "segment_both_point_included",
  SEGMENT_LEFT_POINT_HOLLOW: "segment_left_point_hollow",
  SEGMENT_RIGHT_POINT_HOLLOW: "segment_right_point_hollow",
  SEGMENT_BOTH_POINT_HOLLOW: "segment_both_points_hollow",
  RAY_LEFT_DIRECTION: "ray_left_direction",
  RAY_RIGHT_DIRECTION: "ray_right_direction",
  RAY_LEFT_DIRECTION_RIGHT_HOLLOW: "ray_left_direction_right_hollow",
  RAY_RIGHT_DIRECTION_LEFT_HOLLOW: "ray_right_direction_left_hollow",
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
