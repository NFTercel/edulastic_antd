import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import Dropzone from "react-dropzone";

import { withNamespaces } from "@edulastic/localization";
import { Paper, Image } from "@edulastic/common";
import { fileApi } from "@edulastic/api";

import { Subtitle } from "../../../styled/Subtitle";
import QuestionTextArea from "../../QuestionTextArea";
import DropZoneToolbar from "../../DropZoneToolbar";
import StyledDropZone from "../../StyledDropZone";
import { SOURCE } from "../../../constants/constantsForQuestions";

const DrawingEdit = ({ item, setQuestionData, t }) => {
  const { image } = item;

  const [loading, setLoading] = useState(false);

  const width = image ? image.width : 900;
  const height = image ? image.height : 470;
  const altText = image ? image.altText : "";
  const file = image ? image.source : "";

  const handleItemChangeChange = (prop, uiStyle) => {
    const newItem = cloneDeep(item);

    newItem[prop] = uiStyle;
    setQuestionData(newItem);
  };

  const handleImageToolbarChange = prop => val => {
    const newItem = cloneDeep(item);

    newItem.image[prop] = val;
    setQuestionData(newItem);
  };

  const onDrop = ([files]) => {
    if (files) {
      setLoading(true);
      fileApi
        .upload({ file: files })
        .then(({ fileUri }) => {
          handleImageToolbarChange(SOURCE)(fileUri);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const thumb = file && <Image width={width} height={height} src={file} alt={altText} />;

  return (
    <Fragment>
      <Paper style={{ marginBottom: 30 }}>
        <Subtitle>{t("component.sortList.composeQuestion")}</Subtitle>
        <QuestionTextArea
          placeholder="Enter question"
          onChange={stimulus => handleItemChangeChange("stimulus", stimulus)}
          value={item.stimulus}
        />

        <DropZoneToolbar
          width={+width}
          height={+height}
          maxWidth={1097}
          altText={altText}
          handleChange={handleImageToolbarChange}
        />

        <Dropzone
          onDrop={onDrop}
          maxSize={1000000}
          accept="image/*"
          className="dropzone"
          activeClassName="active-dropzone"
          multiple={false}
        >
          {({ getRootProps, getInputProps, isDragActive }) => (
            <div {...getRootProps()} className={`dropzone ${isDragActive ? "dropzone--isActive" : ""}`}>
              <input {...getInputProps()} />

              <StyledDropZone loading={loading} isDragActive={isDragActive} thumb={thumb} />
            </div>
          )}
        </Dropzone>
      </Paper>
    </Fragment>
  );
};

DrawingEdit.propTypes = {
  item: PropTypes.object.isRequired,
  setQuestionData: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default withNamespaces("assessment")(DrawingEdit);
