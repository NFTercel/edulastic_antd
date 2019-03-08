import React, { useState } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";
import { MathFormulaDisplay } from "@edulastic/common";

import { InstructorStimulus } from "./styled/InstructorStimulus";
import { Heading } from "./styled/Heading";

const ContentsTitle = Heading;

const PassageView = ({ item }) => {
  const [page, setPage] = useState(1);

  return (
    <div>
      <InstructorStimulus dangerouslySetInnerHTML={{ __html: item.instructor_stimulus }} />
      <Heading dangerouslySetInnerHTML={{ __html: item.heading }} />
      <ContentsTitle dangerouslySetInnerHTML={{ __html: item.contentsTitle }} />
      {!item.paginated_content && item.content && (
        <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: item.content }} />
      )}
      {item.paginated_content && item.pages && !!item.pages.length && (
        <div>
          <MathFormulaDisplay dangerouslySetInnerHTML={{ __html: item.pages[page - 1] }} />
          <Pagination
            pageSize={1}
            simple
            hideOnSinglePage
            onChange={setPage}
            current={page}
            total={item.pages.length}
          />
        </div>
      )}
    </div>
  );
};

PassageView.propTypes = {
  item: PropTypes.object.isRequired
};

export default PassageView;
