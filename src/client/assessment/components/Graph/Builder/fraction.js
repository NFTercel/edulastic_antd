const FRACTIONS_FORMAT = require("./config/constants").FRACTIONS_FORMAT;

function getFraction(str) {
  let split = NaN;

  if (str.indexOf("/") !== -1) {
    split = str.split("/");
    // get the last occurrence
    const lastIndex = split.length - 1;
    split = [split[lastIndex - 1], split[lastIndex]];

    const up = split[0];
    const down = split[1];

    const firstLeftChar = parseInt(up[up.length - 1], 10);
    const firstRightChar = parseInt(down[0], 10);
    if (isNaN(firstLeftChar) === false && isNaN(firstRightChar) === false) {
      let ch;
      let zn;
      let integ;

      let i = up.length - 1;
      const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      ch = "";
      while (i >= 0 && nums.includes(parseInt(up[i], 10))) {
        ch = `${up[i]}${ch}`;
        i--;
      }

      const stoppedCharIndex = i;
      integ = "";
      if (up[stoppedCharIndex] === " " && i >= 0) {
        i--;
        while (i >= 0 && nums.includes(parseInt(up[i], 10))) {
          integ = `${up[i]}${integ}`;
          i--;
        }
      }

      integ = parseInt(integ, 10);
      if (isNaN(integ)) {
        integ = 0;
      }
      ch = parseInt(ch, 10);
      zn = parseInt(down, 10);

      split = {
        split,
        decim: integ + ch / zn,
        integ,
        numerator: ch,
        denominator: zn,
        fracStr: `${ch}/${zn}`
      };
    } else {
      split = NaN;
    }
  }

  return split;
}

var gcd = function(a, b) {
  if (b < 0.0000001) return a; // Since there is a limited precision we need to limit the value.

  return gcd(b, Math.floor(a % b)); // Discard any fractions due to limitations in precision.
};

function toFractionHTML(fraction, denominator, fractionsFormat) {
  let numerator = fraction >= 0 ? Math.ceil(fraction * denominator) : Math.floor(fraction * denominator);
  let integ = 0;
  const isNegative = Math.sign(numerator) === -1;
  numerator = Math.abs(numerator);
  if (fractionsFormat !== FRACTIONS_FORMAT.IMPROPER) {
    const remainder = numerator % denominator;
    integ = (numerator - remainder) / denominator;
    numerator = remainder;
    if (fractionsFormat === FRACTIONS_FORMAT.NORMALIZED) {
      try {
        const divisor = gcd(numerator, denominator);
        numerator /= divisor;
        denominator /= divisor;
      } catch (err) {
        console.log(err);
      }
    }
  }

  let str = '<div class="numberline-fraction">';
  if (isNegative || integ) {
    let resStr = "";
    if (isNegative) {
      resStr += "-";
    }
    if (integ) {
      resStr += integ;
    }
    str += `<div class="numberline-fraction-integer" style="line-height: 2.5em; margin-right: 3px;">
                ${resStr}
            </div>`;
  }

  if (numerator || fractionsFormat === FRACTIONS_FORMAT.IMPROPER) {
    str += `<span>${numerator}<hr>${denominator}<span>`;
  }
  str += "</div>";
  return str;
}

function roundFracIfPossible(fraction, denominator) {
  let numerator = fraction >= 0 ? Math.ceil(fraction * denominator) : Math.floor(fraction * denominator);
  const remainder = numerator % denominator;
  const integ = (numerator - remainder) / denominator;
  numerator = remainder;
  if (integ && !numerator) {
    fraction = integ;
  }
  return fraction;
}

exports.getFraction = getFraction;
exports.toFractionHTML = toFractionHTML;
exports.roundFracIfPossible = roundFracIfPossible;
