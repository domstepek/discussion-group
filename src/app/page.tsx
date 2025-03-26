import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <main className="grow flex flex-col justify-center items-center gap-3">
        <div className="relative flex size-full min-h-screen flex-col bg-[#FFFFFF] justify-between group/design-root overflow-x-hidden">
          <div>
            <div className="flex items-center bg-[#FFFFFF] p-4 pb-2 justify-between">
              <h2 className="text-[#1C160C] text-lg font-bold leading-tight tracking-[-0.015em] flex-1">
                Παρατριάς
              </h2>
              <div className="flex w-12 items-center justify-end">
                <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 bg-transparent text-[#1C160C] gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                  <div
                    className="text-[#1C160C]"
                    data-icon="Plus"
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
                      <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center">
              <div className="flex flex-1 gap-3 flex-wrap px-4 py-3 max-w-[480px] justify-center">
                <Link
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#019863] text-[#FFFFFF] text-sm font-bold leading-normal tracking-[0.015em] grow"
                  href="/join"
                >
                  <span className="truncate">Join</span>
                </Link>
                <Link
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#F4EFE6] text-[#1C160C] text-sm font-bold leading-normal tracking-[0.015em] grow"
                  href="/create"
                >
                  <span className="truncate">Create</span>
                </Link>
              </div>
            </div>
            <div className="h-5 bg-[#FFFFFF]"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
