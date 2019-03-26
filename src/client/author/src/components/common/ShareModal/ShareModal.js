import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Radio, Spin, Button, Row, Col, Select, message, Typography } from "antd";

import { FlexContainer } from "@edulastic/common";
import { mainBlueColor } from "@edulastic/colors";
import { IconClose, IconCopy } from "@edulastic/icons";

import { getTestIdSelector, sendTestShareAction } from "../../../../TestPage/ducks";

import {
  getUsersListSelector,
  getFetchingSelector,
  fetchUsersListAction,
  updateUsersListAction
} from "../../../../sharedDucks/userDetails";
const permissions = {
  EDIT: "Can Edit, Add/Remove Items",
  VIEW: "Can View & Duplicate"
};

const permissionKeys = ["EDIT", "VIEW"];

const shareTypes = {
  PUBLIC: "Everyone",
  DISTRICT: "District",
  SCHOOL: "School",
  INDIVIDUAL: "Individuals"
};

const sharedKeysObj = {
  PUBLIC: "PUBLIC",
  DISTRICT: "DISTRICT",
  SCHOOL: "SCHOOL",
  INDIVIDUAL: "INDIVIDUAL"
};

const shareTypeKeys = ["PUBLIC", "DISTRICT", "SCHOOL", "INDIVIDUAL"];
class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shareType: sharedKeysObj.PUBLIC,
      peopleArray: [],
      currentUser: {},
      permission: "VIEW"
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  radioHandler = e => {
    this.setState({ shareType: e.target.value });
    if (e.target.value !== sharedKeysObj.INDIVIDUAL) {
      this.setState({
        peopleArray: [],
        permission: "VIEW"
      });
    }
  };

  removeHandler = index => {
    const { peopleArray } = this.state;
    const temp = peopleArray.slice();
    temp.splice(index, 1);
    this.setState({ peopleArray: temp, currentUser: {} });
  };

  permissionHandler = value => {
    this.setState({ permission: value });
  };

  doneHandler = () => {
    const { peopleArray, shareType, permission } = this.state;
    const { shareTest, testId } = this.props;
    let peoplesObject = {};
    const shapePeopleArray = peopleArray.map(item => ({
      userName: item.userName,
      _userId: item._userId
    }));
    if (shareType === sharedKeysObj.INDIVIDUAL) peoplesObject = { sharedWithUsers: shapePeopleArray };
    const data = {
      ...peoplesObject,
      shareType,
      viewType: permission
    };
    shareTest({ data, testId });
  };

  handleSearch(value) {
    const { getUsers, updateShareList } = this.props;
    const searchBody = {
      limit: 10,
      page: 1,
      type: "school",
      search: {
        role: "student",
        searchString: value
      }
    };
    if (value.length > 1) getUsers(searchBody);
    else updateShareList({ data: [] });
  }

  handleChange = value => {
    const { permission } = this.state;
    const [userName, email, _userId] = value.split("||");
    const newState = {
      userName,
      email,
      _userId,
      permission
    };
    this.setState({
      currentUser: newState
    });
  };

  handleShare = () => {
    const { currentUser, peopleArray, shareType, permission } = this.state;
    const isExisting = peopleArray.filter(item => item._userId === currentUser._userId);
    const { shareTest, testId } = this.props;
    let person = {};
    if (shareType === sharedKeysObj.INDIVIDUAL) {
      if (Object.keys(currentUser).length === 0) {
        message.error("Please select any user which are not in the shared list");
      } else if (isExisting.length > 0) {
        message.error("This is an existing user");
      } else {
        const { _userId, userName } = currentUser;
        person = { sharedWithUsers: { _userId, userName } };
        this.setState(prevState => ({
          peopleArray: [...prevState.peopleArray, currentUser],
          currentUser: {}
        }));
      }
    }
    const data = {
      ...person,
      shareType,
      viewType: permission
    };
    shareTest({ data, testId });
  };

  render() {
    const { shareType, peopleArray, permission } = this.state;
    const { isVisible, onClose, userList = [], fetching } = this.props;

    return (
      <Modal open={isVisible} onClose={onClose} center>
        <ModalContainer>
          <h2 style={{ fontWeight: "bold", fontSize: 20 }}>Share with others</h2>
          <ShareBlock>
            <span style={{ fontSize: 13, fontWeight: "600" }}>Share</span>
            <FlexContainer style={{ cursor: "pointer" }}>
              <ShareTitle>
                <Typography.Paragraph copyable>https://edulastic.com/assessment/76y8gyug-b8ug-8</Typography.Paragraph>
              </ShareTitle>
            </FlexContainer>
            {peopleArray.length !== 0 && (
              <ShareList>
                {peopleArray.map((data, index) => (
                  <Row
                    key={index}
                    style={{
                      paddingBottom: 5,
                      display: "flex",
                      alignItems: "center"
                    }}
                  >
                    <Col span={12}>
                      {data.userName && data.userName !== "null" ? data.userName : ""}
                      {`, ${data.email && data.email !== "null" ? data.email : ""}`}
                    </Col>
                    <Col span={11}>
                      <span>{data.permission === "EDIT" && "Can Edit, Add/Remove Items"}</span>
                      <span>{data.permission === "VIEW" && "Can View & Duplicate"}</span>
                    </Col>
                    <Col span={1}>
                      <a onClick={() => this.removeHandler(index)}>
                        <CloseIcon />
                      </a>
                    </Col>
                  </Row>
                ))}
              </ShareList>
            )}
          </ShareBlock>
          <PeopleBlock>
            <span style={{ fontSize: 13, fontWeight: "600" }}>People</span>
            <div style={{ margin: "10px 0px" }}>
              <Radio.Group value={shareType} onChange={e => this.radioHandler(e)}>
                {shareTypeKeys.map(item => (
                  <Radio value={item} key={item}>
                    {shareTypes[item]}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
            <FlexContainer style={{ marginTop: 5 }}>
              <Address
                showSearch
                placeholder={"Enter names or email addresses"}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={this.handleSearch}
                onChange={this.handleChange}
                disabled={shareType !== sharedKeysObj.INDIVIDUAL}
                notFoundContent={fetching ? <Spin size="small" /> : null}
              >
                {userList.map(item => (
                  <Select.Option
                    value={`${item._source.firstName}${"||"}${item._source.email}${"||"}${item._id}`}
                    key={item._id}
                  >
                    {item._source.firstName}
                    {", "}
                    {item._source.email}
                  </Select.Option>
                ))}
              </Address>
              <Select
                style={{ width: 650 }}
                onChange={this.permissionHandler}
                disabled={shareType !== sharedKeysObj.INDIVIDUAL}
                value={permission}
              >
                {permissionKeys.map(item => (
                  <Select.Option value={item} key={permissions[item]}>
                    {permissions[item]}
                  </Select.Option>
                ))}
              </Select>
              <ShareButton type="primary" onClick={this.handleShare}>
                SHARE
              </ShareButton>
            </FlexContainer>
            <FlexContainer flex={1} justifyContent="center" style={{ marginTop: 20 }}>
              <DoneButton type="primary" onClick={onClose}>
                DONE
              </DoneButton>
            </FlexContainer>
          </PeopleBlock>
        </ModalContainer>
      </Modal>
    );
  }
}

ShareModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  test: PropTypes.object
};

ShareModal.defaultProps = {
  test: null
};

const enhance = compose(
  connect(
    state => ({
      userList: getUsersListSelector(state),
      fetching: getFetchingSelector(state),
      testId: getTestIdSelector(state)
    }),
    {
      getUsers: fetchUsersListAction,
      updateShareList: updateUsersListAction,
      shareTest: sendTestShareAction
    }
  )
);

export default enhance(ShareModal);

const ModalContainer = styled.div`
  width: 600px;

  .anticon-down {
    svg {
      fill: ${mainBlueColor};
    }
  }
`;

const ShareBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  padding-bottom: 25px;
  border-bottom: 1px solid #d9d6d6;
`;

const ShareTitle = styled.div`
  height: 35px;
  background-color: #f5f5f5;
  margin-top: 10px;
  border-radius: 4px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  flex: 1;

  span {
    font-size: 13px;
    font-weight: 600;
  }
`;

const ShareList = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  max-height: 110px;
  overflow: auto;
`;

const PeopleBlock = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;

  .ant-radio {
    margin-right: 5px;
  }
`;

const Address = styled(Select)`
  min-height: 35px;
  height: auto;
  width: 100%;
  ::placeholder {
    font-size: 13px;
    font-style: italic;
  }
`;

const ShareButton = styled(Button)`
  height: 35px;
  width: 160px;
  background: ${mainBlueColor};
  border: none;
  span {
    font-size: 12px;
    font-weight: 600;
  }
`;

const DoneButton = styled(Button)`
  width: 200px;
  background: ${mainBlueColor};
  border: none;
  height: 35px;
  span {
    font-size: 11px;
    font-weight: 600;
  }
`;

const CloseIcon = styled(IconClose)`
  width: 11px;
  height: 16px;
  margin-top: 4px;
  fill: #4aac8b;
`;

const TitleCopy = styled.div`
  font-size: 11px;
  font-weight: 600;
  height: 30px;
  margin-top: 8px;
  color: ${mainBlueColor};
  display: flex;
  align-items: center;
`;

const CopyIcon = styled(IconCopy)`
  width: 16px;
  height: 16px;
  fill: ${mainBlueColor};
  margin-right: 8px;
  &:hover {
    fill: ${mainBlueColor};
  }
`;
