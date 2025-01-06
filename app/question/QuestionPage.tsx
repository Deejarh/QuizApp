"use client";
import Question from '../components/Question';
import type { Question as QuestionType } from '../utils/types';
import { Button } from '@mui/material';
import { useReducer } from 'react';
import Timer from '../components/Timer';
import FinishScreen from '../components/FinishScreen';
import Progress from '../components/Progress';



interface StateType {
  questions: QuestionType[];
  status: "loading" | "active" | "finish";
  index: number;
  answer: number | null;
  points: number;
  secondsRemaining: number;
}

type ActionType =
  | { type: "newAnswer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "tick" }
  | { type: "finish" };

function initialState (quiz: QuestionType[]): StateType {
  return {
    questions: quiz,
    status: 'active',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaining: 10,
  }   
}

function reducer(state: StateType , action: ActionType): StateType {
  switch (action.type) {
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion?.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondsRemaining: 10,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case "finish":
      return {
        ...state,
        status: "finish",
      };
    default:
      throw new Error("Action unkown");
  }
}

export default function QuestionPage({quiz}: {quiz : QuestionType[]}) {
  const [state, dispatch] = useReducer(reducer, quiz, initialState)
  const { status, questions, index, answer, points, secondsRemaining } = state;
  const totalQuestion = questions.length
  const maxPoint = questions.reduce((prev: number, curr: { points: number }) => prev + curr.points, 0)

  const handleNextQuestion = () => {
    if (index === questions.length - 1) {
      dispatch({ type: 'finish' });
    } else {
      dispatch({ type: 'nextQuestion' });
    }
  };
  return (
    <main className='w-full lg:w-[700px] grid h-screen p-8   justify-center'>
      {status === "active" && (
        <>
          <div>

         <Progress totalQuestion={totalQuestion} index={index} answer={answer} />
            <Timer
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}
              index={index}
              totalQuestion={totalQuestion}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              secondsRemaining={secondsRemaining}
            />
          </div>
          <div className=" flex w-full justify-end max-h-10 ">   
              <Button variant="contained" disabled={answer === null} onClick={handleNextQuestion}
              sx={{"&.Mui-disabled": {
                backgroundColor: "gray",
                color: "white"
              }}}
              >
                {index === questions.length - 1 ? "Finish" : "Next"}
              </Button>
          </div>
        </>
      )}

      {status === "finish" && (
        <FinishScreen points={points} maxPoint={maxPoint} />
      )}
    </main>
  );
}

