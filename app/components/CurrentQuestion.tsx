'use client';

import type { Question } from '../utils/types';

export default function CurrenQuestion({ question }: { question: Question }) {
  return (
    <div>
      <h2> {question.question}</h2>
      <ul>
        {question.options.map((option, index) => (
          <li key={index}> {option}</li>
        ))}
      </ul>
    </div>
  );
}
