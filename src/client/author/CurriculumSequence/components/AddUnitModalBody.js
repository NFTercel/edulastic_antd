import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button, Input, Cascader } from "antd";
import { desktopWidth } from "@edulastic/colors";

/**
 * @typedef {object} Module
 * @property {String} customized
 * @property {ModuleData[]} data
 * @property {String} id
 * @property {String} name
 * @property {boolean} assigned
 * @property {boolean=} completed
 */

/**
 * @typedef {object} CurriculumSequenceType
 * @property {CreatedBy} createdBy
 * @property {String} createdDate
 * @property {Object} derivedFrom
 * @property {String} description
 * @property {String} id
 * @property {String} _id
 * @property {Module[]} modules
 * @property {String} status
 * @property {String} thumbnail
 * @property {String} title
 * @property {String} type
 * @property {String} updatedDate
 */

/**
 * @typedef {object} AddUnitModalBodyProps
 * @property {CurriculumSequenceType} destinationCurriculumSequence
 * @property {function} addNewUnitToDestination
 * @property {function} handleAddUnit
 * @property {Module | {}} newUnit
 */

class AddUnitModalBody extends React.Component {
  state = {
    /** @type {Module | {}} */
    newUnit: {}
  };

  componentWillMount() {
    const { newUnit } = this.props;
    this.setState({ newUnit });
  }

  onNewUnitNameChange = evt => {
    evt.preventDefault();

    const { newUnit } = { ...this.state };
    newUnit.name = evt.target.value;
    this.setState({ newUnit });
  };

  onUnitAfterIdChange = id => {
    const { newUnit } = { ...this.state };
    const [afterUnitId] = id;
    newUnit.afterUnitId = afterUnitId;
    this.setState({ newUnit });
  };

  addNewUnitToDestination = () => {
    const { newUnit } = { ...this.state };
    const { addNewUnitToDestination } = this.props;
    if (addNewUnitToDestination) {
      addNewUnitToDestination(newUnit);
      this.setState({ newUnit: {} });
    }
  };

  render() {
    const { destinationCurriculumSequence, handleAddUnit } = this.props;
    const { newUnit } = this.state;
    const { onNewUnitNameChange, onUnitAfterIdChange } = this;
    // Options for add unit
    const options1 = destinationCurriculumSequence.modules.map(module => ({ value: module.id, label: module.name }));

    return (
      <div>
        <AddUnitModalBodyContaner>
          <label>Unit Name</label>
          <Input data-cy="addNewUnitInputName" value={newUnit.name || ""} onChange={onNewUnitNameChange} />
          <label>Add After</label>
          <Input.Group compact>
            <Cascader
              onChange={onUnitAfterIdChange}
              defaultValue={[options1[0].value]}
              style={{ width: "100%" }}
              options={options1}
            />
          </Input.Group>
        </AddUnitModalBodyContaner>
        <ModalFooter>
          <Button data-cy="addUnitCancel" type="primary" ghost key="back" onClick={handleAddUnit}>
            CANCEL
          </Button>
          ,
          <Button data-cy="addUnitSave" key="submit" type="primary" onClick={this.addNewUnitToDestination}>
            SAVE
          </Button>
        </ModalFooter>
      </div>
    );
  }
}
AddUnitModalBody.propTypes = {
  destinationCurriculumSequence: PropTypes.object.isRequired,
  addNewUnitToDestination: PropTypes.func.isRequired,
  handleAddUnit: PropTypes.func.isRequired,
  newUnit: PropTypes.object.isRequired
};

export default AddUnitModalBody;

const AddUnitModalBodyContaner = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  .ant-input:not(.ant-cascader-input) {
    margin-bottom: 20px;
  }
  .ant-input-group {
    width: 100%;
  }
  label {
    font-weight: 600;
    margin-bottom: 10px;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  .ant-btn {
    font-size: 10px;
    font-weight: 600;
    min-width: 100px;
    padding-left: 70px;
    padding-right: 70px;
    margin-left: 5px;
    margin-right: 5px;
    @media only screen and (max-width: ${desktopWidth}) {
      padding-left: 0px;
      padding-right: 0px;
    }
  }
`;
