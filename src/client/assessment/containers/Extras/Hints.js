import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Col } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import { withNamespaces } from "react-i18next";
import { get } from "lodash";
import { setQuestionDataAction, getQuestionDataSelector } from "../../../author/QuestionEditor/ducks";

import withAddButton from "../../components/HOC/withAddButton";
import { change, remove, add, sort } from "./helpers";
import { StyledRow } from "./styled/StyledRow";
import QuillSortableList from "../../components/QuillSortableList";

const SortableListWithAddButton = withAddButton(QuillSortableList);

const Hints = ({ t, item, setQuestionData }) => {
  const prop = "hints";

  const _change = change({ item, setQuestionData, prop });
  const _remove = remove({ item, setQuestionData, prop });
  const _add = add({ item, setQuestionData, prop });
  const _sort = sort({ item, setQuestionData, prop });

  return (
    <Fragment>
      <StyledRow gutter={36}>
        <Col md={24}>{t("component.options.hint")}</Col>
      </StyledRow>
      <StyledRow gutter={36}>
        <Col data-cy="hintsList" md={24}>
          <SortableListWithAddButton
            buttonText={t("component.options.add")}
            useDragHandle
            items={get(item, `metadata.${prop}`, [])}
            onSortEnd={_sort}
            prefix="hints"
            onAdd={_add}
            onRemove={_remove}
            onChange={(index, value) => _change(`metadata.${prop}[${index}]`, value)}
          />
        </Col>
      </StyledRow>
    </Fragment>
  );
};

Hints.propTypes = {
  t: PropTypes.func.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
};

const enhance = compose(
  withNamespaces("assessment"),
  connect(
    state => ({
      item: getQuestionDataSelector(state)
    }),
    {
      setQuestionData: setQuestionDataAction
    }
  )
);

export default enhance(Hints);
