import { useQuery } from '@tanstack/react-query';
import { QuestionItem } from './question-item';
import type { GetRoomQuestionsResponse } from '@/http/use-create-question';

export function QuestionList({ roomId }: { roomId: string }) {
  const { data: roomsList } = useQuery({
    queryKey: ['questions', roomId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3001/rooms/${roomId}/questions`
      );
      const result: GetRoomQuestionsResponse = await response.json();

      return result;
    },
  });

  return (
    <div className="flex-1 overflow-auto space-y-6">
      {roomsList?.length === 0 && (
        <p className="text-muted-foreground mx-auto">No questions yet.</p>
      )}
      {roomsList?.map((question) => (
        <QuestionItem key={question.id} question={question} />
      ))}
    </div>
  );
}
