import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { Room } from '@/types';

export function CreateRoom() {
  const { data: roomsList, isLoading } = useQuery({
    queryKey: ['get-rooms'],
    queryFn: async () => {
      const res = await fetch('http://localhost:3001/rooms');
      return (await res.json()) as Room[];
    },
  });

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Existing Rooms</h2>
          <ul className="flex flex-col gap-1">
            {roomsList?.map(({ id, name }) => (
              <li key={id}>
                <Link to={`/room/${id}`}>
                  <Button variant="link">{name}</Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
