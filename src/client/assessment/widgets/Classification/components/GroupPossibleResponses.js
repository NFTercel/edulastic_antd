import React from "react";
import { Checkbox, Row, Col } from "antd";
import PropTypes from "prop-types";

import { withNamespaces } from "@edulastic/localization";
import { EduButton } from "@edulastic/common";

import { Subtitle } from "../../../styled/Subtitle";
import withAddButton from "../../../components/HOC/withAddButton";
import QuillSortableList from "../../../components/QuillSortableList";

import Group from "./Group";

const List = withAddButton(QuillSortableList);

const GroupPossibleResponses = ({ checkboxChange, checkboxVal, items, t, firstFocus, onAdd, ...restProps }) =>
  checkboxVal ? (
    <div>
      <Checkbox style={{ marginTop: 29 }} defaultChecked={checkboxVal} onChange={checkboxChange}>
        {t("component.classification.groupPossibleRespTitle")}
      </Checkbox>
      <Row gutter={70}>
        {items.map((item, index) => (
          <Col data-cy={`group-container-${index}`} key={index} span={12}>
            <Group
              prefix={`group${index}`}
              item={item}
              firstFocus={firstFocus}
              index={index}
              groupHeadText={t("component.classification.titleOfGroupTitle")}
              headText={t("component.classification.titleOfGroupTitleLabel")}
              text={t("component.classification.possibleRespTitle")}
              {...restProps}
            />
          </Col>
        ))}
      </Row>
      <EduButton type="primary" onClick={onAdd}>
        {t("component.classification.addNewGroup")}
      </EduButton>
    </div>
  ) : (
    <Row gutter={70}>
      <Col span={12}>
        <Checkbox style={{ marginTop: 29 }} defaultChecked={checkboxVal} onChange={checkboxChange}>
          {t("component.classification.groupPossibleRespTitle")}
        </Checkbox>
        <Subtitle>{t("component.classification.possibleRespTitle")}</Subtitle>
        <List
          prefix="group"
          items={items}
          firstFocus={firstFocus}
          onAdd={onAdd}
          onSortEnd={restProps.onSortEnd}
          onChange={restProps.onChange}
          onRemove={restProps.onRemove}
          useDragHandle
          columns={1}
        />
      </Col>
    </Row>
  );

GroupPossibleResponses.propTypes = {
  checkboxChange: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  firstFocus: PropTypes.bool.isRequired,
  onSortEnd: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  checkboxVal: PropTypes.bool.isRequired,
  onTitleChange: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(GroupPossibleResponses);
