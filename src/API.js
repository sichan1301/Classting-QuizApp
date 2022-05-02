import axios from "axios";
import { shuffleArray } from "./utils";

const question = {
  category: "",
  correct_answer: "",
  difficulty: "",
  incorrect_answers: [""],
  question: "",
  tyle: "",
};

export const questionState = question & { answers: "" };

const QuizQuestion = async () => {
  const res = await axios.get(
    "https://opentdb.com/api.php?amount=10&type=multiple"
  );
  // console.log(res.data.results);
  return res.data.results.map((question) => ({
    ...question,
    answers: shuffleArray([
      ...question.incorrect_answers,
      question.correct_answer,
    ]),
  }));
};

export default QuizQuestion;
