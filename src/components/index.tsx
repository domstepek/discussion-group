import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Link
      href={document.referrer || '/'}
      className="text-[#1C160C] flex size-10 shrink-0 items-center cursor-pointer"
      data-icon="ArrowLeft"
      data-size="24px"
      data-weight="regular"
      onClick={(e) => {
        e.preventDefault();
        back();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
      </svg>
    </Link>
  );
};

export const HomeButton = () => (
  <Link
    className="text-[#1C160C] flex size-10 shrink-0 items-center"
    data-icon="House"
    data-size="24px"
    data-weight="regular"
    href="/"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      fill="currentColor"
      viewBox="0 0 256 256"
    >
      <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
    </svg>
  </Link>
);

export const NavigationButtons = () => (
  <div className="flex items-center">
    <BackButton />
    <HomeButton />
  </div>
);
