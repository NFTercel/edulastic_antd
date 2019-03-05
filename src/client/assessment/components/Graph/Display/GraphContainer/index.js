import GraphContainer from "./GraphContainerHOC";
import { CONSTANT } from "../../Builder/config/index";

export const DEFAULT_TOOLS = [
  CONSTANT.TOOLS.POINT,
  CONSTANT.TOOLS.LINE,
  CONSTANT.TOOLS.RAY,
  CONSTANT.TOOLS.SEGMENT,
  CONSTANT.TOOLS.VECTOR,
  CONSTANT.TOOLS.CIRCLE,
  CONSTANT.TOOLS.SIN,
  CONSTANT.TOOLS.POLYGON
];

export default GraphContainer;
