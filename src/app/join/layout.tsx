import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join Discussion Room',
  description: 'Join a discussion room to share your thoughts',
};

export default function JoinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
