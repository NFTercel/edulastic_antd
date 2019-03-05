export const getTabSize = type => {
  switch (type) {
    case "100-100":
      return {
        left: "100%",
        right: "100%"
      };
    case "30-70":
      return {
        left: "30%",
        right: "70%"
      };
    case "70-30":
      return {
        left: "70%",
        right: "30%"
      };
    case "50-50":
      return {
        left: "50%",
        right: "50%"
      };
    case "40-60":
      return {
        left: "40%",
        right: "60%"
      };
    case "60-40":
      return {
        left: "60%",
        right: "40%"
      };
    default:
      return {
        left: "100%",
        right: "100%"
      };
  }
};
