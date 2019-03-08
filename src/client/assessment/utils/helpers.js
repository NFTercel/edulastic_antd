import { groupBy } from "lodash";

export const getFontSize = (fontSize, withRem = false) => {
  switch (fontSize) {
    case "small":
      return withRem ? "0.8rem" : "12px";
    case "normal":
      return withRem ? "1rem" : "14px";
    case "large":
      return withRem ? "1.2rem" : "16px";
    case "xlarge":
      return withRem ? "1.4rem" : "18px";
    case "xxlarge":
      return withRem ? "1.6rem" : "20px";
    default:
      return withRem ? "1rem" : "14px";
  }
};

export const topAndLeftRatio = (styleNumber, imagescale, fontsize, smallSize) => {
  const getValueWithRatio = newRatio => (smallSize ? styleNumber / 2 : styleNumber * newRatio);

  if (!imagescale) {
    return getValueWithRatio(1);
  }

  switch (fontsize) {
    case "large":
      return getValueWithRatio(1.2);
    case "xlarge":
      return getValueWithRatio(1.5);
    case "xxlarge":
      return getValueWithRatio(1.7);
    case "small":
      return getValueWithRatio(0.8);
    default:
      return getValueWithRatio(1);
  }
};

export const calculateRatio = (imagescale, fontsize, imageWidth) => {
  if (!imagescale) {
    return imageWidth * 1;
  }

  switch (fontsize) {
    case "large":
      return imageWidth * 1.2;
    case "xlarge":
      return imageWidth * 1.5;
    case "xxlarge":
      return imageWidth * 1.7;
    case "small":
      return imageWidth * 0.8;
    default:
      return imageWidth * 1;
  }
};

export const preventEvent = e => {
  e.preventDefault();
};

export const getInputSelection = el => {
  let start = 0;

  let end = 0;

  let normalizedValue;

  let range;

  let textInputRange;

  let len;

  let endRange;

  if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
    start = el.selectionStart;
    end = el.selectionEnd;
  } else {
    range = document.selection.createRange();

    if (range && range.parentElement() === el) {
      len = el.value.length;
      normalizedValue = el.value.replace(/\r\n/g, "\n");

      // Create a working TextRange that lives only in the input
      textInputRange = el.createTextRange();
      textInputRange.moveToBookmark(range.getBookmark());

      // Check if the start and end of the selection are at the very end
      // of the input, since moveStart/moveEnd doesn't return what we want
      // in those cases
      endRange = el.createTextRange();
      endRange.collapse(false);

      if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
        // eslint-disable-next-line no-multi-assign
        start = end = len;
      } else {
        start = -textInputRange.moveStart("character", -len);
        start += normalizedValue.slice(0, start).split("\n").length - 1;

        if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
          end = len;
        } else {
          end = -textInputRange.moveEnd("character", -len);
          end += normalizedValue.slice(0, end).split("\n").length - 1;
        }
      }
    }
  }

  return {
    start,
    end
  };
};

/**
 * Convert UI alignment row standards to Mongo alignment domains
 *
 * @param {Array} alignmentRowStandards - alignment row standards from UI
 * @returns {Array} - alignment domains for Mongo
 */
export const alignmentStandardsFromUIToMongo = alignmentRowStandards => {
  const grouped = groupBy(alignmentRowStandards, "tloId");
  const domainIds = Object.keys(grouped);
  return domainIds.map(id => {
    const allStandards = grouped[id];
    const standards = allStandards.map(({ _id, identifier, grades, description, level }) => ({
      id: _id,
      name: identifier,
      grades,
      description,
      level
    }));

    return {
      name: allStandards[0].tloDescription,
      id: allStandards[0].tloId,
      standards
    };
  });
};

/**
 * Convert Mongo alignment domains to UI alignment row standards
 *
 * @param {Array} alignmentDomains - alignment domains from Mongo
 * @returns {Array} - alignment row standards for UI
 */
export const alignmentStandardsFromMongoToUI = alignmentDomains => {
  const alignmentRowStandards = [];
  alignmentDomains.forEach(alignmentDomain => {
    alignmentDomain.standards.forEach(standard => {
      alignmentRowStandards.push({
        description: standard.description,
        grades: standard.grades,
        identifier: standard.name,
        level: standard.level,
        tloDescription: alignmentDomain.name,
        tloId: alignmentDomain.id,
        _id: standard.id
      });
    });
  });
  return alignmentRowStandards;
};

export const getSpellCheckAttributes = (isSpellCheck = false) => ({
  spellCheck: isSpellCheck,
  autoComplete: isSpellCheck,
  autoCorrect: isSpellCheck,
  autoCapitalize: isSpellCheck
});

export const getDirection = pos => {
  switch (pos) {
    case "bottom":
      return "column";
    case "top":
      return "column-reverse";
    case "right":
      return "row";
    case "left":
      return "row-reverse";
    default:
      return "column";
  }
};
