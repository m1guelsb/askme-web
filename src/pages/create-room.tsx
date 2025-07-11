import { CreateRoomForm } from '@/components/create-room-form';
import { RoomList } from '@/components/room-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CreateRoom() {
  return (
    <div className="h-screen mx-auto p-4 max-w-4xl flex-1 grid gap-8 grid-cols-2 items-start">
      <CreateRoomForm />

      <div className="overflow-auto h-full">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Recent Rooms</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 truncate">
            <RoomList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
