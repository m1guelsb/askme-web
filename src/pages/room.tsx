import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuestionForm } from '@/components/question-form';
import { QuestionList } from '@/components/question-list';

export function Room() {
  const { roomId } = useParams();

  if (!roomId) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="h-screen flex flex-col mx-auto max-w-4xl px-4 py-4">
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <Link to={'/'}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 size-4" />
              Back to Home
            </Button>
          </Link>
          <Link to={`/room/${roomId}/audio`}>
            <Button className="flex items-center gap-2" variant="secondary">
              <Radio className="size-4" />
              Listen to Room
            </Button>
          </Link>
        </div>
        <h1 className="mb2 font-bold text-3xl text-foreground">
          Question Room
        </h1>
        <p className="text-muted-foreground">
          Here you can ask questions and get answers in real-time.
        </p>
      </div>

      <div className="mb-6">
        <QuestionForm roomId={roomId} />
      </div>

      <h2 className="text-2xl font-bold text-foreground mb-3">Questions</h2>
      <QuestionList roomId={roomId} />
    </div>
  );
}
