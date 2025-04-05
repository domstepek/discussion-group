'use client';

import { useEffect, useMemo, useState } from 'react';

// Packages
import axios from 'axios';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { use$ } from '@legendapp/state/react';
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

// Components
import { NavigationButtons } from '@/components';

// Context
import RoomState$ from './context';

// Hooks
import { DiscussionQueryResponse, useDiscussionQuery } from './hooks';

// Utilities
import { pusherClient } from '@/lib/pusher-client';

export const SpeakingOrder = () => {
  const [messages, setMessages] = useState<DiscussionQueryResponse['messages']>(
    []
  );
  const discussionQuery = useDiscussionQuery();

  useEffect(() => {
    setMessages(discussionQuery.data?.messages || []);
  }, [discussionQuery.dataUpdatedAt]);

  use$(() => {
    const channel = RoomState$.channel.get();
    if (!channel) return;
    channel.unbind('message');

    channel.bind(
      'message',
      (message: DiscussionQueryResponse['messages'][number]) => {
        setMessages((prev) => [message, ...prev]);
      }
    );

    return () => {
      channel.unbind('message');
    };
  });

  return (
    <>
      {messages.map((message) => {
        if (!message.message.content) {
          debugger;
        }

        return (
          <div
            className="flex items-center gap-4 bg-[#FFFFFF] px-4 min-h-14"
            key={message.id}
          >
            <p className="text-[#1C160C] text-base font-normal leading-normal flex-1 truncate">
              {message.message.content}
            </p>
          </div>
        );
      })}
    </>
  );
};

export const Participants = () => {
  const [participants, setParticipants] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const discussionQuery = useDiscussionQuery();

  useEffect(() => {
    setParticipants(discussionQuery.data?.participants || []);
  }, [discussionQuery.dataUpdatedAt]);

  useEffect(() => {
    function leaveDiscussion() {
      fetch('/discussion/leave', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          discussionId: discussionQuery.data?.id,
        }),
        keepalive: true,
      });
    }

    window.onbeforeunload = leaveDiscussion;
  }, []);

  use$(() => {
    const channel = RoomState$.channel.get();
    if (channel === undefined || channel === null) return;
    channel.unbind('join');
    channel.unbind('leave');

    channel.bind('join', (participant: string) => {
      setParticipants((prev) => [...prev, participant]);
    });
    channel.bind('leave', (participant: string) => {
      setParticipants((prev) => prev.filter((p) => p !== participant));
    });

    return () => {
      channel.unbind('join');
      channel.unbind('leave');
    };
  });

  return (
    <>
      {participants.map((participant) => (
        <div
          className="flex items-center gap-4 bg-[#FFFFFF] px-4 min-h-14"
          key={participant}
        >
          <p className="text-[#1C160C] text-base font-normal leading-normal flex-1 truncate">
            {participant}
          </p>
        </div>
      ))}
    </>
  );
};

export const SetNameDialog = () => {
  const [inputName, setInputName] = useState('');
  const searchParams = useSearchParams();
  const name = searchParams.get('name');

  const { push } = useRouter();

  return (
    <Dialog open={!name} onClose={() => {}} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center justify-center bg-black/50">
        <DialogPanel className="max-w-lg w-full rounded-xl bg-[#FFFFFF] p-6 shadow-lg">
          <DialogTitle className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em]">
            Set Your Name
          </DialogTitle>
          <Description className="text-[#A18249] text-sm font-normal leading-normal mt-2">
            Please enter your name to join the room.
          </Description>
          <div className="mt-4">
            <label className="block text-[#1C160C] text-base font-medium leading-normal mb-2">
              Your Name
            </label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              className="form-input w-full rounded-xl border border-[#E9DFCE] bg-[#FFFFFF] text-[#1C160C] h-12 px-4 text-base font-normal leading-normal focus:outline-none focus:ring-0 focus:border-[#A18249] placeholder:text-[#A18249]"
              value={inputName}
              onInput={(e) => setInputName(e.currentTarget.value)}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                // Add logic to handle setting the name and adding to the queue
                push(`?name=${inputName}`);
              }}
              className="flex-1 h-12 rounded-xl bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#017A4F] transition cursor-pointer"
            >
              Join Room
            </button>
            <Link
              href="/"
              className="flex flex-1 h-12 rounded-xl border border-[#019863] bg-transparent text-[#019863] text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#E9DFCE] hover:text-[#1C160C] transition cursor-pointer text-center items-center justify-center"
            >
              Go Home
            </Link>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export const RoomPageContent = () => {
  const { roomID } = useParams();
  const searchParams = useSearchParams();

  const name = searchParams.get('name');

  const discussionQuery = useDiscussionQuery();

  const onAddToQueue = async () => {
    await axios.put('/discussion', {
      name,
      discussionId: roomID,
    });
  };

  const shareData: ShareData = useMemo(
    () => ({
      text: `Join my discussion room: ${window.location.href}`,
      url: window.location.href,
    }),
    []
  );

  const canShare = useMemo(() => {
    if (!navigator.share || !navigator.canShare) {
      return false;
    }

    return navigator.canShare(shareData);
  }, [shareData]);

  useEffect(() => {
    const roomIDValidated = discussionQuery.data?.id;

    if (roomIDValidated) {
      const channel = pusherClient.subscribe(roomIDValidated);
      RoomState$.set({ channel });

      return () => {
        console.log('Unsubscribing from channel');
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [discussionQuery.data?.id]);

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] justify-between group/design-root overflow-x-hidden">
      <div>
        <div className="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
          <NavigationButtons />
          <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">
            Room ID: {roomID!.toString().toUpperCase()}
          </h2>
          {canShare && (
            <div className="flex w-12 items-center justify-end">
              <button
                className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#1C160C] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0"
                onClick={() => navigator.share(shareData)}
              >
                <div
                  className="text-[#1C160C]"
                  data-icon="Share"
                  data-size="24px"
                  data-weight="regular"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,109.66l-48,48a8,8,0,0,1-11.32-11.32L204.69,112H165a88,88,0,0,0-85.23,66,8,8,0,0,1-15.5-4A103.94,103.94,0,0,1,165,96h39.71L170.34,61.66a8,8,0,0,1,11.32-11.32l48,48A8,8,0,0,1,229.66,109.66ZM192,208H40V88a8,8,0,0,0-16,0V208a16,16,0,0,0,16,16H192a8,8,0,0,0,0-16Z"></path>
                  </svg>
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col overflow-auto">
          {!!roomID && !!name && !discussionQuery.isLoading ? (
            <>
              <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Speaking order
              </h2>
              <SpeakingOrder />
              <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
                Participants
              </h2>
              <Participants />
            </>
          ) : (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-6 w-6 text-[#A18249]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span className="text-[#1C160C] text-base font-medium leading-normal">
                  Loading discussion...
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em] grow"
              onClick={onAddToQueue}
            >
              <span className="truncate">Add me to list</span>
            </button>
          </div>
        </div>
        <div className="h-5 bg-[#FFFFFF]"></div>
      </div>
      <SetNameDialog />
    </div>
  );
};
