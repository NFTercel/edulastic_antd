/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/alt-text */
import React, { Component, Fragment } from "react";

class DisplayScore extends Component {
  constructor() {
    super();
    this.state = {
      question: null
    };
  }

  getViewColor(value) {
    let color;
    if (value !== "-") {
      color = value !== "wrong" ? "green" : "red";
    } else {
      color = "yellow";
    }
    return color;
  }

  getScoreColor(value, maxScore) {
    let color;
    switch (value) {
      case 0:
        color = "red";
        break;
      case maxScore:
        color = "green";
        break;
      default:
        color = "yellow";
        break;
    }
    return color;
  }

  render() {
    const { question, response, viewType } = this.props;
    let studentScore;
    let studentResponse;
    if (response) {
      console.log(response.skiped);
      if (response.skiped) {
        studentScore = "0";
        studentResponse = "skiped";
      } else {
        studentScore = response.score !== undefined ? response.score : "-";
        studentResponse = response.correct ? "correct" : "wrong";
      }
    } else {
      studentScore = "-";
      studentResponse = "-";
    }
    const maxScore = question && question.maxScore ? question.maxScore : "-";

    return (
      <div style={{ cursor: "pointer" }}>
        {viewType === "view" && <span style={{ color: this.getViewColor(studentResponse) }}>{studentResponse}</span>}
        {viewType === "score" && (
          <span style={{ color: this.getScoreColor(studentScore, question.maxScore) }}>{studentScore}</span>
        )}
        {viewType === "response" && (
          <Fragment>
            <span style={{ color: this.getScoreColor(studentScore, question.maxScore) }}>{studentScore}%</span>(
            <span style={{ color: this.getScoreColor(studentScore, question.maxScore) }}>{studentScore}</span> /{" "}
            {maxScore})
          </Fragment>
        )}
      </div>
    );
  }
}

export default DisplayScore;
