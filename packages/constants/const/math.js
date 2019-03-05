const methods = {
  EQUIV_SYMBOLIC: 'equivSymbolic',
  EQUIV_LITERAL: 'equivLiteral',
  EQUIV_VALUE: 'equivValue',
  IS_SIMPLIFIED: 'isSimplified',
  IS_FACTORISED: 'isFactorised',
  IS_EXPANDED: 'isExpanded',
  IS_UNIT: 'isUnit',
  IS_TRUE: 'isTrue',
  STRING_MATCH: 'stringMatch',
  EQUIV_SYNTAX: 'equivSyntax'
};

const fields = {
  INTEGER: 'integer',
  REAL: 'real',
  COMPLEX: 'complex'
};

const decimalSeparators = {
  DOT: '.',
  COMMA: ','
};

const syntaxes = {
  DECIMAL: 'isDecimal',
  SIMPLE_FRACTION: 'isSimpleFraction',
  MIXED_FRACTION: 'isMixedFraction',
  EXPONENT: 'isExponent',
  STANDARD_FORM: 'isStandardForm',
  SLOPE_INTERCEPT_FORM: 'isSlopeInterceptForm',
  POINT_SLOPE_FORM: 'isPointSlopeForm'
};

const mathInputTypes = {
  CLEAR: 'clear',
  WRONG: 'wrong',
  SUCCESS: 'success'
};

const symbols = [
  { value: 'all', label: 'All symbols' },
  { value: 'qwerty', label: 'Keyboard' },
  { value: 'basic', label: 'Basic' },
  { value: 'basic_junior', label: 'Basic Junior' },
  { value: 'algebra', label: 'Algebra' },
  { value: 'comparison', label: 'Comparison' },
  { value: 'geometry', label: 'Geometry' },
  { value: 'matrices', label: 'Matrices' },
  { value: 'trigonometry', label: 'Trigonometry' },
  { value: 'sets', label: 'Sets' },
  { value: 'units_si', label: 'Units (SI)' },
  { value: 'units_us', label: 'Units (US Customary)' },
  { value: 'greek', label: 'Greek letters' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'grouping', label: 'Grouping Symbols' },
  { value: 'calculus', label: 'Calculus' },
  { value: 'misc', label: 'Miscellaneous' },
  { value: 'discrete', label: 'Discrete' },
  { value: 'general', label: 'General' }
];

const modes = [{ value: 'text', label: 'Text' }, { value: 'math', label: 'Math' }];

const mathRenderOptions = [
  { value: '', label: '' },
  { value: 'mathjax', label: 'MathJax (response inputs rendered with MathQuill)' },
  { value: 'mathquill', label: 'MathQuill' }
];

const templateFontScaleOption = [
  { value: 'normal', label: 'Normal (100%)' },
  { value: 'boosted', label: 'Boosted (150%)' }
];

const EMBED_RESPONSE = '\\embed{response}';

module.exports = {
  methods,
  fields,
  decimalSeparators,
  syntaxes,
  mathInputTypes,
  symbols,
  modes,
  mathRenderOptions,
  templateFontScaleOption,
  EMBED_RESPONSE
};
