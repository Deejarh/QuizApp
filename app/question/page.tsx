'use client';
import { useReducer, useEffect, useState } from 'react';
import Question from '../components/Question';
import Timer from '../components/Timer';
import FinishScreen from '../components/FinishScreen';
import Progress from '../components/Progress';
import type { Question as QuestionType } from '../utils/types';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';
interface StateType {
  questions: QuestionType[];
  status: 'loading' | 'active' | 'finish';
  index: number;
  answer: number | null;
  points: number;
  secondsRemaining: number;
}

type ActionType =
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'tick' }
  | { type: 'initialize'; payload: QuestionType[] }
  | { type: 'finish' };

function initialState(quiz: QuestionType[]): StateType {
  return {
    questions: quiz,
    status: 'active',
    index: 0,
    answer: null,
    points: 0,
    secondsRemaining: 10,
  };
}

function reducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case 'initialize':
      return {
        ...state,
        questions: action.payload,
      };

    case 'newAnswer': {
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion?.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    }
    case 'nextQuestion':
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        secondsRemaining: 10,
      };
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    case 'finish':
      return {
        ...state,
        status: 'finish',
      };
    default:
      throw new Error('Action unkown');
  }
}

export default function QuestionPage() {
  let category: string | null = null;
  let difficulty: string | null = 'easy';
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    category = params.get('category');
    difficulty = params.get('difficulty');
  }

  const [quiz, setQuiz] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, quiz, initialState);
  const { status, questions, index, answer, points, secondsRemaining } = state;
  const totalQuestion = questions.length;
  const maxPoint = questions.reduce(
    (prev: number, curr: { points: number }) => prev + curr.points,
    0
  );

  useEffect(() => {
    async function fetchQuestion() {
      try {
        const res = await fetch(
          `/api/openai?category=${encodeURIComponent(
            category || ''
          )}&difficulty=${encodeURIComponent(difficulty || 'easy')}`
        );
        if (!res.ok) return;
        const data = await res.json();
        setQuiz(data.questions);
        dispatch({ type: 'initialize', payload: data.questions });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (category && difficulty) {
      fetchQuestion();
    } else {
      setLoading(false);
    }
  }, [category, difficulty]);

  const handleNextQuestion = () => {
    if (index === questions.length - 1) {
      dispatch({ type: 'finish' });
    } else {
      dispatch({ type: 'nextQuestion' });
    }
  };
  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (!quiz || quiz.length === 0) {
    return (
      <div className="error">Failed to load questions. Please try again.</div>
    );
  }
  return (
    <main className="w-full lg:w-[700px] grid h-screen p-8   justify-center">
      {status === 'active' && (
        <>
          <div>
            <Progress
              totalQuestion={totalQuestion}
              index={index}
              answer={answer}
            />
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
            <Button
              variant="contained"
              disabled={answer === null}
              onClick={handleNextQuestion}
              sx={{
                '&.Mui-disabled': {
                  backgroundColor: 'gray',
                  color: 'white',
                },
              }}
            >
              {index === questions.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </>
      )}

      {status === 'finish' && (
        <FinishScreen points={points} maxPoint={maxPoint} />
      )}
    </main>
  );
}
