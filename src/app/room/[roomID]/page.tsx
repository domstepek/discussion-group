'use client';
import { useMemo } from 'react';

// Packages
import { useParams } from 'next/navigation';

// Components
import { BackButton } from '@/components';

export default function RoomPage() {
  const { roomID } = useParams();

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

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] justify-between group/design-root overflow-x-hidden">
      <div>
        <div className="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
          <BackButton />
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
        <h2 className="text-[#1C160C] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
          Speaking order
        </h2>
        <div className="flex items-center gap-4 bg-[#FFFFFF] px-4 min-h-14">
          <p className="text-[#1C160C] text-base font-normal leading-normal flex-1 truncate">
            Isabelle Rossi
          </p>
        </div>
        <div className="flex items-center gap-4 bg-[#FFFFFF] px-4 min-h-14">
          <p className="text-[#1C160C] text-base font-normal leading-normal flex-1 truncate">
            Maximilien Dubois
          </p>
        </div>
        <div className="flex items-center gap-4 bg-[#FFFFFF] px-4 min-h-14">
          <p className="text-[#1C160C] text-base font-normal leading-normal flex-1 truncate">
            Sophie Moreau
          </p>
        </div>
        <div className="flex items-center gap-4 bg-[#FFFFFF] px-4 min-h-14">
          <p className="text-[#1C160C] text-base font-normal leading-normal flex-1 truncate">
            Antoine Lambert
          </p>
        </div>
      </div>
      <div>
        <div className="flex justify-center">
          <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#019863] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em] grow">
              <span className="truncate">Add me to list</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#F4EFE6] text-[#1C160C] text-base font-bold leading-normal tracking-[0.015em] grow">
              <span className="truncate">Join</span>
            </button>
          </div>
        </div>
        <div className="h-5 bg-[#FFFFFF]"></div>
      </div>
    </div>
  );
}
