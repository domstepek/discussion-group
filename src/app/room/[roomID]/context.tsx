import { observable } from '@legendapp/state';
import { pusherClient } from '@/lib/pusher-client';

type PusherChannel = ReturnType<typeof pusherClient.subscribe>;

const RoomState$ = observable({
  channel: null as PusherChannel | null,
});

export default RoomState$;
