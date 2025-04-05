import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';

type DiscussionQueryResponse =
  | {
      messages: {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        discussionId: string | null;
        message: {
          type: string;
          content: string;
        };
      }[];
    } & {
      id: string;
      maxTime: number;
      participants: string[];
      createdAt: Date;
      updatedAt: Date;
    };

export const useDiscussionQuery = () => {
  const searchParams = useSearchParams();
  const { roomID } = useParams();
  const { push } = useRouter();

  const name = searchParams.get('name');

  const discussionQuery = useQuery({
    queryKey: ['discussion', roomID, name],
    queryFn: async () => {
      const { data, status } = await axios.get<DiscussionQueryResponse>(
        `/discussion`,
        { params: { discussionId: roomID, name }, validateStatus: () => true }
      );

      if (status === 404) {
        toast.error('Room not found');
        push('/');
      }

      return data;
    },
    enabled: !!name,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return discussionQuery;
};
