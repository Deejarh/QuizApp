"use client";
import questionsData from '../data/questions.json';
import type { Question } from '../utils/types';
import CurrenQuestion from '../components/currentQuestion';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function Page() {
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(1);
  const questions: Question[] = questionsData.questions;
  const currentQuestion = questions[currentQuestionNumber - 1];
  const isLastQuestion = currentQuestionNumber === questions.length

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
  };
  return (
    <div>
      <div>
        <CurrenQuestion question={currentQuestion} />
      </div>
      <div className=" flex w-full justify-end py-6">
        <Button variant="contained" onClick={handleNextQuestion}>{ isLastQuestion? 'Submit' : 'Next'}</Button>
      </div>
    </div>
  );
}
