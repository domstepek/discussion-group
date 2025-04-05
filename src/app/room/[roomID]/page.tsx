'use server';

import { RoomPageContent } from './components';

export async function generateMetadata({
  params,
}: {
  params: { roomID: string };
}) {
  const { roomID } = await params;

  return {
    title: `Discussion Room: ${roomID}`,
    description: 'Join a discussion room to share your thoughts',
  };
}

export default async function RoomPage() {
  return <RoomPageContent />;
}
