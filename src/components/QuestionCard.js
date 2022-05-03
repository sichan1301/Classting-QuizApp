import React from "react";
import styled, { css } from "styled-components";

export default function QuestionCard({
  question,
  answers,
  callback,
  userAnswer,
  questionNr,
  totalQuestions,
}) {
  return (
    <>
      <QuestionNr>
        Question: {questionNr}/{totalQuestions}
      </QuestionNr>
      <Question dangerouslySetInnerHTML={{ __html: question }}></Question>
      <>
        {answers.map((answer) => (
          <Select key={answer}>
            <QuestionBtn
              correct={userAnswer?.correctAnswer === answer}
              userClicked={userAnswer?.answer === answer}
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={callback}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </QuestionBtn>
          </Select>
        ))}
      </>
    </>
  );
}

const QuestionNr = styled.p`
  font-size: 48px;
`;

const Question = styled.p`
  font-size: 18px;
  text-align: center;
  width: 480px;
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionBtn = styled.button`
  font-size: 16px;
  outline: none;
  background-color: #fff;
  background: none;
  margin-top: 10px;
  width: 480px;
  height: 50px;
  text-align: center;
  border: ${({ correct, userClicked }) =>
    correct
      ? "2px solid blue"
      : !correct && userClicked
      ? `2px solid red`
      : `1px solid black`};
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
  /* background: ${({ correct, userClicked }) =>
    correct
      ? "linear-gradient(90deg, #56ffa4, #59bc86)"
      : !correct && userClicked
      ? `linear-gradient(90deg, #ff5656, #c16868)`
      : `linear-gradient(90deg, #56ccff, #6eafb4)`}; */
`;
