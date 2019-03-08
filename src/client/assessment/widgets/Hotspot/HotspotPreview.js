import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep, difference, get } from "lodash";

import { Paper, Stimulus, InstructorStimulus } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import { PREVIEW, CLEAR, CHECK, SHOW, EDIT } from "../../constants/constantsForQuestions";

import BlockContainer from "./styled/BlockContainer";
import { Svg } from "./styled/Svg";
import { Polygon } from "./styled/Polygon";
import { getFontSize } from "../../utils/helpers";

const HotspotPreview = ({ view, item, smallSize, saveAnswer, userAnswer, previewTab }) => {
  const { areas, area_attributes, image, validation, multiple_responses, previewAreas } = item;
  const fontSize = getFontSize(get(item, "ui_style.fontsize"));
  const maxWidth = get(item, "max_width", 900);

  const [isCheck, setIsCheck] = useState(false);

  const width = image ? image.width : 900;
  const height = image ? image.height : 470;
  const source = image ? image.source : "";

  useEffect(() => {
    if (previewTab === CLEAR && view !== EDIT && isCheck) {
      saveAnswer([]);
    }
    if (previewTab === CHECK) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [previewTab]);

  const handleClick = i => () => {
    const newAnswer = cloneDeep(userAnswer);
    if (newAnswer.includes(i)) {
      newAnswer.splice(newAnswer.indexOf(i), 1);
    } else {
      newAnswer.push(i);
    }

    saveAnswer(multiple_responses ? (newAnswer.length > 0 ? newAnswer : userAnswer) : [i]);
  };

  const validAnswer = validation && validation.valid_response && validation.valid_response.value;
  const altAnswers = validation && validation.alt_responses;

  const validate = () => {
    let collection = cloneDeep(validAnswer);

    altAnswers.forEach(answer => {
      if (difference(answer.value, userAnswer).length !== answer.value.length) {
        collection = cloneDeep(answer.value);
      }
    });

    return collection;
  };

  const allValidAnswers = validate();

  return (
    <Paper style={{ fontSize }} padding={smallSize} boxShadow={smallSize ? "none" : ""}>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>
      {view === PREVIEW && !smallSize && <Stimulus dangerouslySetInnerHTML={{ __html: item.stimulus }} />}

      {!smallSize ? (
        <BlockContainer style={{ maxWidth }} justifyContent="center">
          <Svg width={+width} height={+height}>
            <image href={source} width={+width} height={+height} preserveAspectRatio="none" x={0} y={0} />
            {areas.map((area, i) => (
              <Polygon
                key={i}
                showAnswer={view !== EDIT && ((previewTab === CHECK && userAnswer.includes(i)) || previewTab === SHOW)}
                onClick={handleClick(i)}
                points={area.map(point => `${point.x},${point.y}`).join(" ")}
                selected={userAnswer.includes(i)}
                correct={view !== EDIT && allValidAnswers.includes(i)}
                fill={
                  area_attributes.local.find(attr => attr.area === i)
                    ? area_attributes.local.find(attr => attr.area === i).fill
                    : area_attributes.global.fill
                }
                stroke={
                  area_attributes.local.find(attr => attr.area === i)
                    ? area_attributes.local.find(attr => attr.area === i).stroke
                    : area_attributes.global.stroke
                }
              />
            ))}
          </Svg>
        </BlockContainer>
      ) : (
        <BlockContainer justifyContent="center">
          <Svg width={320} height={170}>
            <image href={source} width={320} height={170} preserveAspectRatio="none" x={0} y={0} />
            {previewAreas.map((areaPreviewPoints, i) => (
              <Polygon
                key={i}
                onClick={handleClick(i)}
                points={areaPreviewPoints.map(point => `${point.x},${point.y}`).join(" ")}
                fill={area_attributes.global.fill}
                stroke={area_attributes.global.stroke}
              />
            ))}
          </Svg>
        </BlockContainer>
      )}
    </Paper>
  );
};

HotspotPreview.propTypes = {
  smallSize: PropTypes.bool,
  item: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  saveAnswer: PropTypes.func.isRequired,
  previewTab: PropTypes.string,
  userAnswer: PropTypes.array
};

HotspotPreview.defaultProps = {
  previewTab: CLEAR,
  smallSize: false,
  userAnswer: []
};

export default withNamespaces("assessment")(HotspotPreview);
