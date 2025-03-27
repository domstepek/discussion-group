'use client';
import { useState } from 'react';

// Pacakages
import Link from 'next/link';

// Components
import { NavigationButtons } from '@/components';

// Utilities
import { validateRoomID } from './actions';

export default function JoinPage() {
  const [roomID, setRoomID] = useState('');
  const [name, setName] = useState('');
  const [invalidRoomID, setInvalidRoomID] = useState(false);
  const [isValidating, setIsValidating] = useState(false);

  const onJoin = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    setIsValidating(true);
    const isValid = await validateRoomID(roomID);
    setIsValidating(false);

    e.defaultPrevented = !isValid;

    setInvalidRoomID(!isValid);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] justify-between group/design-root overflow-x-hidden">
      <div>
        <div className="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
          <NavigationButtons />
          <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Join Discussion Room
          </h2>
        </div>
        <div className="flex flex-col max-w-[480px] flex-wrap gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#1C160C] text-base font-medium leading-normal pb-2">
              Room ID
            </p>
            <input
              placeholder="Enter ID"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1C160C] focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-14 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
              value={roomID}
              onInput={(e) => setRoomID(e.currentTarget.value)}
            />
          </label>
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#1C160C] text-base font-medium leading-normal pb-2">
              Your Name
            </p>
            <input
              placeholder="e.g. Sophia"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1C160C] focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-14 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
              value={name}
              onInput={(e) => setName(e.currentTarget.value)}
            />
          </label>
        </div>
        <p className="text-[#1C160C] text-base font-normal leading-normal pb-3 pt-1 px-4">
          Can't find the Room ID? Ask your discussion leader.
        </p>
      </div>
      <div>
        <div className="flex px-4 py-3">
          <Link
            className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em] cursor-pointer aria-disabled:opacity-50 aria-disabled:cursor-not-allowed"
            href={`/room/${roomID}?name=${name}`}
            aria-disabled={!roomID || isValidating}
            onClick={onJoin}
          >
            <span className="truncate flex items-center relative">Join</span>
          </Link>
        </div>
        {invalidRoomID && (
          <p className="text-[#A18249] text-sm font-normal leading-normal pb-3 pt-1 px-4 text-center">
            The room code is incorrect. Please ensure the code is valid and try
            again.
          </p>
        )}
        <div className="h-5 bg-[#FFFFFF]"></div>
      </div>
    </div>
  );
}
