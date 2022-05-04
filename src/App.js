import React, { useEffect, useState } from "react";
import QuestionCard from "./components/QuestionCard";
import QuizQuestion from "./API";
import { questionState } from "./API";
import styled from "styled-components";

export default function App() {
  const TOTAL_QUESTIONS = 5;

  const [startTime, setStartTime] = useState("");
  const [timeDiff, setTimeDiff] = useState("");

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([questionState]);
  const [userAnswers, setUserAnswers] = useState([
    {
      question: "",
      answer: "",
      correct: false,
      correctAnswer: "",
    },
  ]);
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
    } else {
      setNumber(nextQ);
    }
  };

  const time = () => {
    const now = new Date();
    const timeSec = Math.floor((now - startTime) / 1000);
    setTimeDiff(timeSec);
  };

  useEffect(() => {
    time();
  }, [number]);

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
        <NextBtn onClick={nextQuestion}>Next Question</NextBtn>
      ) : null}

      {userAnswers.length === TOTAL_QUESTIONS ? (
        <Result>
          <Score>정답: {score}개 </Score>
          <WrongAns>오답: {5 - score}개 </WrongAns>
          <Timee>소요시간 : {timeDiff}초</Timee>
        </Result>
      ) : null}

      {userAnswers.length === TOTAL_QUESTIONS ? (
        <Chart>
          <ProgressBarTxt>
            <span>정답 {score * 20}%</span>
            <span>오답 {(5 - score) * 20}%</span>
          </ProgressBarTxt>
          <ProgressBar>
            <ScoreProgressBar score={score} />
          </ProgressBar>
        </Chart>
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
  color: black;
  font-size: 24px;
`;

const NextBtn = styled.button`
  margin-top: 20px;
  border: none;
  background-color: #fff;
  font-size: 16px;
  cursor: pointer;
`;

const Result = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 400px;
`;

const Score = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
`;

const WrongAns = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
`;

const Timee = styled.p`
  margin-bottom: 30px;
  font-size: 20px;
`;

const StartBtn = styled.button`
  margin-top: 30px;
  border: none;
  background-color: #fff;
  font-size: 32px;
  cursor: pointer;
`;

const Chart = styled.div`
  margin-bottom: 32px;
  width: 100%;
`;

const ProgressBarTxt = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 25px;
  border-radius: 5px;
  background-color: rgb(222, 93, 98);
`;

const ScoreProgressBar = styled.div`
  width: ${({ score }) => `${score * 20}%`};
  height: 25px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgb(74, 140, 255);
`;
