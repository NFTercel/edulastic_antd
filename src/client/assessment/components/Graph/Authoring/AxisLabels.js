import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { PaddingDiv, Button } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";
import { arrayMove } from "react-sortable-hoc";
import { cloneDeep, clone } from "lodash";
import { Subtitle, Label, ContainerStart, LineParameter, LineInput, TitleTextInput } from "../common/styled_components";
import { setQuestionDataAction } from "../../../../author/QuestionEditor/ducks";
import QuestionTextArea from "../../QuestionTextArea";
import QuillSortableList from "../../QuillSortableList";
import { QuestionSection } from "./";

class GraphAxisLabels extends Component {
  onChangeQuestion = stimulus => {
    const { graphData, setQuestionData } = this.props;
    setQuestionData({ ...graphData, stimulus });
  };

  onSortOrderListEnd = ({ oldIndex, newIndex }) => {
    const { graphData, setQuestionData } = this.props;

    setQuestionData({
      ...graphData,
      list: arrayMove(graphData.list, oldIndex, newIndex)
    });
  };

  handleQuestionsChange = (index, value) => {
    const { setQuestionData, graphData } = this.props;
    const labels = clone(graphData.list);

    labels[index].text = value;
    setQuestionData({ ...graphData, list: labels });
  };

  handleDeleteQuestion = index => {
    const { setQuestionData, graphData } = this.props;
    const filteredItems = clone(graphData.list).filter((q, i) => i !== index);

    setQuestionData({ ...graphData, list: filteredItems });
  };

  handleAddQuestion = () => {
    const { setQuestionData, graphData } = this.props;
    const newItem = cloneDeep(graphData);

    newItem.list = newItem.list.concat({
      text: "New Option",
      id: `list-item-${Math.random()
        .toString(36)
        .substr(2, 9)}`
    });

    setQuestionData({ ...graphData, list: newItem.list });
  };

  handleCanvasChange = event => {
    const { value, name } = event.target;
    const { graphData, setQuestionData } = this.props;
    const { canvas } = graphData;

    canvas[name] = value;
    setQuestionData({ ...graphData, canvas });
  };

  render() {
    const { t, graphData, cleanSections, fillSections } = this.props;
    const { canvas, stimulus } = graphData;

    return (
      <div>
        <QuestionSection
          section="main"
          label="COMPOSE QUESTION"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <Subtitle>{t("component.graphing.question.composequestion")}</Subtitle>
          <QuestionTextArea
            placeholder={t("component.graphing.question.enteryourquestion")}
            onChange={this.onChangeQuestion}
            value={stimulus}
          />
        </QuestionSection>

        <QuestionSection section="main" label="LINE" cleanSections={cleanSections} fillSections={fillSections}>
          <Subtitle>{t("component.graphing.graphline")}</Subtitle>
          <ContainerStart>
            <LineParameter>
              <Label>Minimum value</Label>
              <LineInput
                type="number"
                value={canvas.x_min}
                name="x_min"
                onChange={this.handleCanvasChange}
                step={1}
                disabled={false}
              />
            </LineParameter>
            <LineParameter>
              <Label>Maximum value</Label>
              <LineInput
                type="number"
                value={canvas.x_max}
                name="x_max"
                onChange={this.handleCanvasChange}
                step={1}
                disabled={false}
              />
            </LineParameter>
          </ContainerStart>
        </QuestionSection>

        <QuestionSection section="main" label="TITLE" cleanSections={cleanSections} fillSections={fillSections}>
          <PaddingDiv bottom={30}>
            <Subtitle>{t("component.graphing.title")}</Subtitle>
            <TitleTextInput type="text" name="title" value={canvas.title} onChange={this.handleCanvasChange} />
          </PaddingDiv>
        </QuestionSection>

        <QuestionSection
          section="main"
          label="POSSIBLE RESPONSES"
          cleanSections={cleanSections}
          fillSections={fillSections}
        >
          <PaddingDiv bottom={30}>
            <Subtitle>{t("component.graphing.possibleresponses")}</Subtitle>
            <QuillSortableList
              items={graphData.list.map(o => o.text)}
              onSortEnd={this.onSortOrderListEnd}
              useDragHandle
              onRemove={this.handleDeleteQuestion}
              onChange={this.handleQuestionsChange}
            />
            <Button
              style={{ minWidth: 130, marginTop: 10 }}
              onClick={this.handleAddQuestion}
              variant="extendedFab"
              outlined
              type="button"
              color="primary"
            >
              {t("component.graphing.addnewpossibleresponsebtn")}
            </Button>
          </PaddingDiv>
        </QuestionSection>
      </div>
    );
  }
}

GraphAxisLabels.propTypes = {
  t: PropTypes.func.isRequired,
  cleanSections: PropTypes.func.isRequired,
  fillSections: PropTypes.func.isRequired,
  graphData: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    null,
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(GraphAxisLabels);
