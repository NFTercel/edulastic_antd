import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import Modal from "react-responsive-modal";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Radio, Spin, Button, Row, Col, Select, message, Typography } from "antd";

import { FlexContainer } from "@edulastic/common";
import { mainBlueColor, whiteSmoke, greenDark, fadedGrey, white } from "@edulastic/colors";
import { IconClose, IconShare } from "@edulastic/icons";

import { getTestIdSelector, sendTestShareAction } from "../../../../TestPage/ducks";

import {
  getUsersListSelector,
  getFetchingSelector,
  fetchUsersListAction,
  updateUsersListAction
} from "../../../../sharedDucks/userDetails";

const { Paragraph } = Typography;

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
        return;
      } else if (isExisting.length > 0) {
        message.error("This is an existing user");
        return;
      } else {
        const { _userId, userName } = currentUser;
        person = { sharedWithUsers: { _userId, userName } };
        this.setState(prevState => ({
          peopleArray: [...prevState.peopleArray, currentUser],
          currentUser: {}
        }));
      }
    } else {
      const isTypeExisting = peopleArray.filter(item => item.userName === shareTypes[shareType]).length > 0;
      if (isTypeExisting) {
        message.error(`You have shared with ${shareTypes[shareType]} try other option`);
        return;
      } else {
        this.setState(prevState => ({
          peopleArray: [...prevState.peopleArray, { userName: shareTypes[shareType], email: null, permission: "VIEW" }],
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
      <Modal open={isVisible} onClose={onClose} center styles={{ modal: { borderRadius: 5 } }}>
        <ModalContainer>
          <h2 style={{ fontWeight: "bold", fontSize: 20 }}>Share with others</h2>
          <ShareBlock>
            <ShareLabel>Share</ShareLabel>
            <FlexContainer>
              <ShareTitle>https://edulastic.com/assessment/76y8gyug-b8ug-8</ShareTitle>
              <CopyWrapper>
                <TitleCopy copyable={{ text: "https://edulastic.com/assessment/76y8gyug-b8ug-8" }} />
                <span>COPY</span>
              </CopyWrapper>
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
                      {` ${data.email && data.email !== "null" ? `, ${data.email}` : ""}`}
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
            <PeopleLabel>People</PeopleLabel>
            <RadioBtnWrapper>
              <Radio.Group value={shareType} onChange={e => this.radioHandler(e)}>
                {shareTypeKeys.map(item => (
                  <Radio value={item} key={item}>
                    {shareTypes[item]}
                  </Radio>
                ))}
              </Radio.Group>
            </RadioBtnWrapper>
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
                <IconShare color={white} /> SHARE
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
  width: 100%;
  padding: 20px 30px;
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
  border-bottom: 1px solid ${fadedGrey};
`;

const ShareLabel = styled.span`
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 10px;
`;
const ShareTitle = styled.div`
  background-color: ${whiteSmoke};
  border-radius: 4px;
  display: flex;
  padding: 10px;
  border: 1px solid ${fadedGrey};
  width: 100%;
`;

const ShareList = styled.div`
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  max-height: 110px;
  overflow: auto;
  width: 88%;
  margin-top: 10px;
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
  display: flex;
  align-items: center;
  span {
    font-size: 12px;
    font-weight: 600;
    margin-left: 30px;
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
const RadioBtnWrapper = styled.div`
  font-weight: 600;
  margin: 10px 0px;
`;
const PeopleLabel = styled.span`
  font-size: 13;
  font-weight: 600;
`;
const CloseIcon = styled(IconClose)`
  width: 11px;
  height: 16px;
  margin-top: 4px;
  fill: ${greenDark};
`;

const CopyWrapper = styled.div`
  display: flex;
  color: ${mainBlueColor};
  font-weight: 600;
  align-items: center;
  font-size: 12px;
`;
const TitleCopy = styled(Paragraph)`
  &.ant-typography {
    margin: 0;
  }
  button {
    margin-right: 10px;
  }
  svg {
    width: 20px;
    height: 20px;
    color: ${mainBlueColor};
  }
`;
