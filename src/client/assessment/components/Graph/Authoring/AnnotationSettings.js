import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { withNamespaces } from "@edulastic/localization";
import {
  MoreOptionsContainer,
  MoreOptionsColumn,
  MoreOptionsColumnContainer,
  MoreOptionsLabel,
  MoreOptionsRow,
  MoreOptionsSubHeading
} from "../common/styled_components";
import QuillInput from "../common/QuillInput";

class AnnotationSettings extends Component {
  handleInputChange = (name, value) => {
    const { annotation, setAnnotation } = this.props;
    if (value === "<p><br></p>") {
      value = "";
    }
    setAnnotation({ ...annotation, [name]: value });
  };

  render() {
    const { t, annotation } = this.props;
    const { title, labelTop, labelBottom, labelLeft, labelRight } = annotation;

    return (
      <Fragment>
        <MoreOptionsContainer>
          <MoreOptionsSubHeading>Annotation</MoreOptionsSubHeading>

          <MoreOptionsColumnContainer>
            <MoreOptionsColumn style={{ padding: "0 30px 0 0" }}>
              <MoreOptionsRow>
                <MoreOptionsLabel>Title</MoreOptionsLabel>

                <QuillInput
                  value={title}
                  onChange={value => this.handleInputChange("title", value)}
                  toolbarId="title"
                />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>Label left</MoreOptionsLabel>

                <QuillInput
                  value={labelLeft}
                  onChange={value => this.handleInputChange("labelLeft", value)}
                  toolbarId="labelLeft"
                />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>Label bottom</MoreOptionsLabel>

                <QuillInput
                  value={labelBottom}
                  onChange={value => this.handleInputChange("labelBottom", value)}
                  toolbarId="labelBottom"
                />
              </MoreOptionsRow>
            </MoreOptionsColumn>

            <MoreOptionsColumn style={{ padding: "0 0 0 30px" }}>
              <MoreOptionsRow>
                <MoreOptionsLabel>Label top</MoreOptionsLabel>

                <QuillInput
                  value={labelTop}
                  onChange={value => this.handleInputChange("labelTop", value)}
                  toolbarId="labelTop"
                />
              </MoreOptionsRow>

              <MoreOptionsRow>
                <MoreOptionsLabel>Label right</MoreOptionsLabel>

                <QuillInput
                  value={labelRight}
                  onChange={value => this.handleInputChange("labelRight", value)}
                  toolbarId="labelRight"
                />
              </MoreOptionsRow>
            </MoreOptionsColumn>
          </MoreOptionsColumnContainer>
        </MoreOptionsContainer>
      </Fragment>
    );
  }
}

AnnotationSettings.propTypes = {
  t: PropTypes.func.isRequired,
  annotation: PropTypes.object,
  setAnnotation: PropTypes.func.isRequired
};

AnnotationSettings.defaultProps = {
  annotation: {
    title: "",
    labelTop: "",
    labelBottom: "",
    labelLeft: "",
    labelRight: ""
  }
};

const enhance = compose(withNamespaces("assessment"));

export default enhance(AnnotationSettings);
