import React, { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import QuizQuestion from "./API";
import { questionState } from "./API";
import styled from "styled-components";

export default function App() {
  const answerObject = {
    question: "",
    answer: "",
    correct: false,
    correctAnswer: "",
  };

  const TOTAL_QUESTIONS = 5;

  const [startTime, setStartTime] = useState("");
  const [diff, setDiff] = useState("");

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([questionState]);
  const [userAnswers, setUserAnswers] = useState([answerObject]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await QuizQuestion();

    const start = new Date();
    setStartTime(start);

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e) => {
    if (!gameOver) {
      // 사용자 답변
      const answer = e.currentTarget.value;

      // 답변과 정답 비교
      const correct = questions[number].correct_answer === answer;

      // 맞으면 1점 추가
      if (correct) setScore((prev) => prev + 1);

      // 맞은 정답 배열에 저장
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // 마지막 질문이 아니라면 다음 질문으로 넘어가기
    const nextQ = number + 1;

    if (nextQ === TOTAL_QUESTIONS) {
      setGameOver(true);

      const now = new Date();
      const timeDiff = Math.floor(
        (now.getTime() - startTime.getTime()) / 1000 / 24 / 60 / 60
      );
      setDiff(timeDiff);
    } else {
      setNumber(nextQ);
    }
  };

  return (
    <Section>
      <Title>Quiz App</Title>

      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNr={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!loading &&
      !gameOver &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <NextBtn className="next" onClick={nextQuestion}>
          Next Question
        </NextBtn>
      ) : null}

      <Result>
        {userAnswers.length === TOTAL_QUESTIONS ? (
          <Score>정답: {score}개 </Score>
        ) : null}
        {userAnswers.length === TOTAL_QUESTIONS ? (
          <WrongAns>오답: {5 - score}개 </WrongAns>
        ) : null}

        {userAnswers.length === TOTAL_QUESTIONS ? console.log(diff) : null}
      </Result>

      {userAnswers.length === TOTAL_QUESTIONS ? (
        <Skill>
          <SkillDescription>
            <span>정답 {score * 20}%</span>
            <span>오답 {(5 - score) * 20}%</span>
          </SkillDescription>
          <SkillProgressbar>
            <He score={score} className="skillvalue"></He>
          </SkillProgressbar>
        </Skill>
      ) : null}

      {gameOver ? (
        <StartBtn onClick={startTrivia}>Start</StartBtn>
      ) : (
        <StartBtn onClick={startTrivia}>ReStart</StartBtn>
      )}
    </Section>
  );
}

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 600px;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 24px;
  color: black;
`;

const NextBtn = styled.button`
  border: none;
  margin-top: 20px;
  font-size: 16px;
  background-color: #fff;
  cursor: pointer;
`;

const Result = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-evenly;
`;

const Score = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
`;

const WrongAns = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
`;

const StartBtn = styled.button`
  border: none;
  margin-top: 20px;
  font-size: 32px;
  background-color: #fff;
  cursor: pointer;
`;

const Skill = styled.div`
  width: 100%;
  margin-bottom: 32px;
`;

const SkillDescription = styled.div`
  display: flex;
  justify-content: space-between;
`;

const SkillProgressbar = styled.div`
  border-radius: 5px;
  height: 25px;
  background-color: #616161;
  width: 100%;
`;

const He = styled.div`
  width: ${({ score }) => `${score * 20}%`};
  height: 25px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #feb546;
`;
