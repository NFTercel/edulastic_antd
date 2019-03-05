import React from "react";
import PropTypes from "prop-types";
import { FlexContainer } from "@edulastic/common";
import { Checkbox, Input } from "antd";
import { greenDark, blue } from "@edulastic/colors";
import { IconList, IconPreview } from "@edulastic/icons";

import { SortableContainer, SortableElement, SortableHandle } from "react-sortable-hoc";

import { TestItemWrapper, PreviewContainer } from "./styled";

import TestItemPreview from "../../../../../../assessment/components/TestItemPreview";
import MetaInfoCell from "../ReviewItemsTable/MetaInfoCell/MetaInfoCell";

const DragHandle = SortableHandle(() => (
  <IconList color={greenDark} style={{ cursor: "grab" }} width={16} height={16} />
));

const SortableItem = SortableElement(
  ({ indx, selected, item, onCheck, points, onChangePoints, metaInfoData, onPreview, questions }) => {
    return (
      <TestItemWrapper>
        <FlexContainer justifyContent="space-between">
          <FlexContainer>
            <DragHandle />
            <Checkbox checked={selected.includes(indx)} onChange={e => onCheck(indx, e.target.checked)}>
              Q{indx + 1}
            </Checkbox>
          </FlexContainer>

          <FlexContainer>
            <PreviewContainer onClick={() => onPreview(metaInfoData.id)}>
              <IconPreview color={blue} width={16} height={16} />{" "}
              <span
                style={{
                  textTransform: "uppercase",
                  fontSize: 11,
                  fontWeight: 600
                }}
              >
                Preview
              </span>
            </PreviewContainer>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Points</span>{" "}
            <Input
              size="large"
              type="number"
              value={points}
              onChange={e => onChangePoints(metaInfoData._id, +e.target.value)}
              style={{ width: 70, fontSize: 13, fontWeight: 600 }}
            />
          </FlexContainer>
        </FlexContainer>
        <TestItemPreview
          style={{ padding: 0, boxShadow: "none", display: "flex" }}
          cols={item}
          previewTab="clear"
          verticalDivider={item.verticalDivider}
          scrolling={item.scrolling}
          questions={questions}
        />
        <FlexContainer style={{ margin: "20px 0" }}>
          <MetaInfoCell data={metaInfoData} />
        </FlexContainer>
      </TestItemWrapper>
    );
  }
);

const List = SortableContainer(
  ({ rows, selected, setSelected, testItems, onChangePoints, types, standards, scoring, onPreview, questions }) => {
    const handleCheckboxChange = (index, checked) => {
      if (checked) {
        setSelected([...selected, index]);
      } else {
        const removeIndex = selected.findIndex(item => item === index);
        const newSelected = [...selected];

        newSelected.splice(removeIndex, 1);
        setSelected(newSelected);
      }
    };

    const getPoints = i => {
      let item = null;
      if (scoring.testItems && scoring.testItems.length) {
        item = scoring.testItems.find(({ id }) => id === testItems[i]._id);
      }

      return item && item.points ? item.points : 0;
    };

    return (
      <div>
        {rows.map((item, i) => (
          <SortableItem
            key={i}
            metaInfoData={{
              id: testItems[i]._id,
              by: "Kevin Hart",
              shared: "9578 (1)",
              likes: 9,
              types: types[testItems[i]._id],
              standards: standards[testItems[i]._id]
            }}
            index={i}
            indx={i}
            item={item}
            points={getPoints(i)}
            onCheck={handleCheckboxChange}
            onChangePoints={onChangePoints}
            onPreview={onPreview}
            selected={selected}
            questions={questions}
          />
        ))}
      </div>
    );
  }
);

List.propTypes = {
  rows: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
  onChangePoints: PropTypes.func.isRequired,
  onPreview: PropTypes.func.isRequired,
  testItems: PropTypes.array.isRequired,
  types: PropTypes.any.isRequired,
  standards: PropTypes.object.isRequired,
  scoring: PropTypes.object.isRequired,
  questions: PropTypes.object.isRequired
};

export default List;
