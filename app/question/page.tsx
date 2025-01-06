import QuestionPage from './QuestionPage'; // Client Component
import type { Question as QuestionType } from '../utils/types';
import { fetchQuestionsFromOpenAI } from '../lib/openai';
import { Suspense } from 'react';

function Loading() {
  return <div className="loading">Loading questions...</div>;
}

// Server Component
export default async function Page() {
  const quiz: QuestionType[] = await fetchQuestionsFromOpenAI();
  return (
    <Suspense fallback={<Loading />}>
      <QuestionPage quiz={quiz} />;
    </Suspense>
  );
}
