import { getFontSize } from "../../../../src/client/assessment/utils/helpers";

class Helpers {
  static getElement(element) {
    return cy.get(`[data-cy="${element}"]`);
  }

  static fontSize(font) {
    switch (font) {
      case "small":
        return { font: getFontSize(font), name: "Small" };
      case "normal":
        return { font: getFontSize(font), name: "Normal" };
      case "large":
        return { font: getFontSize(font), name: "Large" };
      case "xlarge":
        return { font: getFontSize(font), name: "Extra Large" };
      case "xxlarge":
        return { font: getFontSize(font), name: "Huge" };
      default:
        return { font: getFontSize("normal"), name: "Normal" };
    }
  }

  static get stemNumeration() {
    return {
      numerical: "Numerical",
      upperAlpha: "Uppercase Alphabet",
      lowerAlpha: "Lowercase Alphabet"
    };
  }
}

export default Helpers;
