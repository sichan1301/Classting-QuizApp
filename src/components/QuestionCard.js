import React from "react";
import styled from "styled-components";

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
  margin: 20px;
  font-size: 48px;
  @media only screen and (max-width: 768px) {
    font-size: 32px;
  }
`;

const Question = styled.p`
  width: 480px;
  font-size: 18px;
  text-align: center;
  @media only screen and (max-width: 768px) {
    width: 240px;
    font-size: 15px;
  }
`;

const Select = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionBtn = styled.button`
  margin-top: 10px;
  width: 480px;
  height: 50px;
  outline: none;
  border: ${({ correct, userClicked }) =>
    correct
      ? "2px solid rgb(0, 41, 135)"
      : !correct && userClicked
      ? `2px solid rgb(204, 0, 20)`
      : `1px solid black`};
  background: none;
  font-size: 16px;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
    transition: 0.2s ease-in-out;
  }
  @media only screen and (max-width: 768px) {
    width: 240px;
  }
`;
