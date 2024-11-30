'use client'
import Question from '../components/Question';
import type { Question as QuestionType } from '../utils/types';
import { Button } from '@mui/material';
import { useState } from 'react';

export default function QuestionPage({quiz}: {quiz : QuestionType[]}) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNextQuestion = () => {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    
  };
  return (
    <div>
      <div>
        <Question question={quiz[currentQuestionIndex]} />
      </div>
      <div className=" flex w-full justify-end py-6">
        <Button variant="contained" onClick={handleNextQuestion}> Next</Button>
      </div>
    </div>
  );
}

