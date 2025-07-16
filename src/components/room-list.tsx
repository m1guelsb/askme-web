import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@/lib/utils';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import type { Room } from '@/types';

export function RoomList() {
  const { data: roomsList, isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/rooms');
      return (await res.json()) as Room[];
    },
  });

  return (
    <>
      <Skeleton
        isLoading={isLoading}
        element={<div className="h-20 rounded-lg bg-muted animate-pulse" />}
      />

      {roomsList?.map(({ id, name, questionCount, createdAt }) => {
        return (
          <Link
            to={`/room/${id}`}
            key={id}
            className="flex items-center rounded-lg justify-between p-3 hover:bg-accent border"
          >
            <div className="flex-1 gap-1 flex flex-col truncate">
              <h3 className="text-lg font-medium truncate">{name}</h3>
              <div className="flex items-center gap-2">
                <Badge className="text-xs">{questionCount} questions</Badge>
                <Badge className="text-xs" variant={'outline'}>
                  {formatDate(createdAt)}
                </Badge>
              </div>
            </div>
            <span className="flex items-center justify-center gap-1 text-sm">
              <ArrowRight className="size-5" />
            </span>
          </Link>
        );
      })}
    </>
  );
}
