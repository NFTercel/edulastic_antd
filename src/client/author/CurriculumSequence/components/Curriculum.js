import React, { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import DropContainer from "../../../assessment/components/DropContainer";
import CurriculumModuleRow from "./CurriculumModuleRow";
import { theme } from "../theme";

/**
 * @typedef CurriculumProps
 * @property {import('./CurriculumSequence').CurriculumSequenceType} curriculum
 * @property {function} onCollapseExpand
 * @property {string[]} expandedModules
 */

/** @extends Component<CurriculumProps> */
class Curriculum extends Component {
  onDrop = toModule => {
    const { onDrop } = this.props;
    onDrop(toModule);
  };

  render() {
    const {
      curriculum: { modules }
    } = this.props;
    const { expandedModules, onCollapseExpand, padding } = this.props;

    return (
      <ModuleWrapper>
        {modules.map((moduleItem, index) => (
          <DropContainer theme={theme} key={`drop-${index}-${moduleItem.id}`} drop={() => this.onDrop(moduleItem)}>
            <CurriculumModuleRow
              collapsed={expandedModules.indexOf(moduleItem.id) === -1}
              onCollapseExpand={onCollapseExpand}
              key={moduleItem.id}
              module={moduleItem}
              padding={padding}
            />
          </DropContainer>
        ))}
      </ModuleWrapper>
    );
  }
}

Curriculum.propTypes = {
  onDrop: PropTypes.func.isRequired,
  curriculum: PropTypes.object.isRequired,
  expandedModules: PropTypes.array.isRequired,
  padding: PropTypes.bool.isRequired,
  onCollapseExpand: PropTypes.func.isRequired
};

const ModuleWrapper = styled.div`
  flex-grow: 1;
  width: 60%;
  z-index: 1;
  margin-top: -1px;
`;
ModuleWrapper.displayName = "ModuleWrapper";

export default Curriculum;
