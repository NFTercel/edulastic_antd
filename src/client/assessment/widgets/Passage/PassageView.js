import React, { useState } from "react";
import PropTypes from "prop-types";
import { Pagination } from "antd";

import { InstructorStimulus } from "./styled/InstructorStimulus";
import { Heading } from "./styled/Heading";

const PassageView = ({ item }) => {
  const [page, setPage] = useState(1);

  return (
    <div>
      <InstructorStimulus>{item.instructor_stimulus}</InstructorStimulus>

      <Heading>{item.heading}</Heading>
      {!item.paginated_content && item.content && <div dangerouslySetInnerHTML={{ __html: item.content }} />}
      {item.paginated_content && item.pages && !!item.pages.length && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: item.pages[page - 1] }} />
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
