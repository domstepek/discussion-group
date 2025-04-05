import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Discussion Room',
  description: 'Create a discussion room to share your thoughts',
};

export default function CreateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
