import React from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { arrayMove } from "react-sortable-hoc";
import { Col, Checkbox, Select } from "antd";
import { compose } from "redux";
import { withTheme } from "styled-components";

import { CustomQuillComponent } from "@edulastic/common";
import { withNamespaces } from "@edulastic/localization";

import withAddButton from "../../../components/HOC/withAddButton";
import QuillSortableList from "../../../components/QuillSortableList";
import { Label } from "../../../styled/WidgetOptions/Label";

import { StyledRow } from "../styled/StyledRow";
import { StyledInput } from "../styled/StyledInput";

const List = withAddButton(QuillSortableList);

const Opt = ({ setQuestionData, item, t, theme }) => {
  const handleChange = (prop, value) => {
    const newItem = cloneDeep(item);

    if (prop === "paginated_content" && value) {
      newItem.pages = [newItem.content];
      delete newItem.content;
    }

    if (prop === "paginated_content" && !value) {
      if (newItem.pages && newItem.pages.length) {
        newItem.content = newItem.pages.join("");
      }

      delete newItem.pages;
    }

    newItem[prop] = value;
    setQuestionData(newItem);
  };

  const handleSortPagesEnd = ({ oldIndex, newIndex }) => {
    const newItem = cloneDeep(item);
    newItem.pages = arrayMove(newItem.pages, oldIndex, newIndex);
    setQuestionData(newItem);
  };

  const handleRemovePage = index => {
    const newItem = cloneDeep(item);
    newItem.pages.splice(index, 1);
    setQuestionData(newItem);
  };

  const handleChangePage = (index, value) => {
    const newItem = cloneDeep(item);
    newItem.pages[index] = value;
    setQuestionData(newItem);
  };

  const handleAddPage = () => {
    const newItem = cloneDeep(item);
    newItem.pages.push("");
    setQuestionData(newItem);
  };

  const rendererOptions = [
    { value: "", label: t("component.passage.mathJax") },
    { value: "mathquill", label: t("component.passage.mathQuill") }
  ];

  return (
    <div>
      <StyledRow gutter={32}>
        <Col span={24}>
          <Label>{t("component.passage.heading")}</Label>
          <CustomQuillComponent
            toolbarId="heading"
            onChange={value => handleChange("heading", value)}
            showResponseBtn={false}
            value={item.heading || ""}
            style={{
              border: `1px solid ${theme.widgets.passage.quillBorderColor}`,
              height: "auto",
              padding: "6px 11px",
              borderRadius: 5
            }}
          />
        </Col>
      </StyledRow>
      <StyledRow gutter={32}>
        <Col span={24}>
          <Label>{t("component.passage.contentsTitle")}</Label>
          <CustomQuillComponent
            toolbarId="contentsTitle"
            onChange={value => handleChange("contentsTitle", value)}
            showResponseBtn={false}
            value={item.contentsTitle || ""}
            style={{
              border: `1px solid ${theme.widgets.passage.quillBorderColor}`,
              height: "auto",
              padding: "6px 11px",
              borderRadius: 5
            }}
          />
        </Col>
      </StyledRow>
      <StyledRow gutter={32}>
        {!item.paginated_content && (
          <Col span={24}>
            <Label>{t("component.passage.contents")}</Label>
            <CustomQuillComponent
              toolbarId="contents"
              placeholder={t("component.passage.enterPassageContentHere")}
              onChange={value => handleChange("content", value)}
              showResponseBtn={false}
              value={item.content}
            />
          </Col>
        )}
        {item.paginated_content && item.pages && !!item.pages.length && (
          <Col span={24}>
            <Label>{t("component.passage.contentPages")}</Label>
            <List
              items={item.pages}
              buttonText={t("component.passage.add")}
              onAdd={handleAddPage}
              onSortEnd={handleSortPagesEnd}
              useDragHandle
              onRemove={handleRemovePage}
              onChange={handleChangePage}
            />
          </Col>
        )}
      </StyledRow>

      <StyledRow gutter={32}>
        <Col span={12}>
          <Label>{t("component.passage.fleschKincaid")}</Label>
          <StyledInput
            size="large"
            value={item.flesch_kincaid || ""}
            onChange={e => handleChange("flesch_kincaid", e.target.value)}
          />
        </Col>
        <Col span={12}>
          <Label>{t("component.passage.lexile")}</Label>
          <StyledInput size="large" value={item.lexile || ""} onChange={e => handleChange("lexile", e.target.value)} />
        </Col>
      </StyledRow>

      <StyledRow gutter={32}>
        <Col span={12}>
          <Label>{t("component.passage.instructorStimulus")}</Label>
          <CustomQuillComponent
            toolbarId="instructorStimulus"
            onChange={value => handleChange("instructor_stimulus", value)}
            showResponseBtn={false}
            value={item.instructor_stimulus || ""}
            style={{
              border: `1px solid ${theme.widgets.passage.quillBorderColor}`,
              height: "auto",
              padding: "6px 11px",
              borderRadius: 5
            }}
          />
        </Col>
      </StyledRow>

      <StyledRow gutter={32}>
        <Col span={12}>
          <Checkbox checked={item.is_math} onChange={e => handleChange("is_math", e.target.checked)}>
            <b>{t("component.passage.containsMathematics")}</b>
          </Checkbox>
        </Col>
        <Col span={12}>
          <Checkbox
            checked={item.paginated_content}
            onChange={e => handleChange("paginated_content", e.target.checked)}
          >
            <b>{t("component.passage.enablePaginatedContent")}</b>
          </Checkbox>
        </Col>
      </StyledRow>

      <StyledRow gutter={32}>
        {item.is_math && (
          <Col span={12}>
            <Label>{t("component.passage.mathRenderer")}</Label>
            <Select
              size="large"
              value={item.math_renderer}
              style={{ width: "100%" }}
              onChange={value => handleChange("math_renderer", value)}
            >
              {rendererOptions.map(({ value: val, label }) => (
                <Select.Option key={val} value={val}>
                  {label}
                </Select.Option>
              ))}
            </Select>
          </Col>
        )}
      </StyledRow>
    </div>
  );
};

Opt.propTypes = {
  setQuestionData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  withTheme
);

export default enhance(Opt);
