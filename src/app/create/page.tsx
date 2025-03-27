'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';

// Components
import { NavigationButtons } from '@/components';

// Utilities
import { createRecords } from './actions';

export default function CreatePage() {
  const [name, setName] = useState('');
  const [time, setTime] = useState('');

  const { push } = useRouter();

  const onSubmit = async () => {
    const timeNumber = parseInt(time, 10);
    const discussion = await createRecords(timeNumber);
    push(`/room/${discussion.id}?name=${name}`);
  };

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] justify-between group/design-root overflow-x-hidden">
      <div>
        <div className="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
          <NavigationButtons />
          <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            New Group
          </h2>
        </div>
        <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-2 pt-4">
          Organizer Name
        </h2>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
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
        <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] px-4 text-left pb-2 pt-4">
          Talking Time
        </h2>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#1C160C] text-base font-medium leading-normal pb-2">
              Time per Speaker
            </p>
            <input
              placeholder="e.g. 5 mins"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#1C160C] focus:outline-0 focus:ring-0 border border-[#E9DFCE] bg-[#FFFFFF] focus:border-[#E9DFCE] h-14 placeholder:text-[#A18249] p-[15px] text-base font-normal leading-normal"
              type="number"
              value={time}
              onInput={(e) => setTime(e.currentTarget.value)}
            />
          </label>
        </div>
        <p className="text-[#A18249] text-sm font-normal leading-normal pb-3 pt-1 px-4">
          Participants will each have the allotted time to speak. The discussion
          leader can manage turns and time.
        </p>
      </div>
      <div>
        <div className="flex px-4 py-3">
          <button
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em]
            disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onSubmit}
            disabled={!name.trim() || !time.trim()}
          >
            <span className="truncate">Create Group</span>
          </button>
        </div>
        <div className="h-5 bg-[#FFFFFF]"></div>
      </div>
    </div>
  );
}
