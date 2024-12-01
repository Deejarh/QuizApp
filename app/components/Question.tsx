import type { Question } from "../utils/types";
import Button from "@mui/material/Button";

interface QuestionProps {
  question: Question;
  dispatch: React.Dispatch<any>;
  answer: number | null;
  secondsRemaining: number;
}

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  const hasAnswer = answer !== null;
  return (
    <div>
      <h4> {question.question}</h4>
      <div className=" grid grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            variant="contained"
            className=" cursor-pointer"
            key={index}
            disabled={hasAnswer}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {" "}
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
}
