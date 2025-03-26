import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const BackButton = () => {
  const { back } = useRouter();

  return (
    <Link
      href={document.referrer || '/'}
      className="text-[#1C160C] flex size-12 shrink-0 items-center cursor-pointer"
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
