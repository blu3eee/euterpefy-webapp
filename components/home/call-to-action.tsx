'use client';
import React from 'react';
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Skeleton } from '../ui/skeleton';
import { useRouter } from 'next/navigation';

const CallToAction = (): JSX.Element => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleButtonClick = (rerouteTo: string): void => {
    if (session) {
      router.push(rerouteTo);
    } else {
      // popupCenter('/spotify-signin', 'Spotify Sign In');
      signIn('spotify', { callbackUrl: rerouteTo }).catch(() => {
        toast.error('Failed to initiate log in with Spotify');
      });
    }
  };

  return (
    <>
      {status === 'loading' ? (
        <Skeleton className="rounded-lg w-24 h-10" />
      ) : (
        <div className="flex items-center gap-4">
          <Button
            className="rounded-[24px]"
            variant={'success'}
            onClick={() => {
              handleButtonClick('/generate');
            }}
          >
            Quick Generating
          </Button>
          <Button
            className="rounded-[24px]"
            variant={'warning'}
            onClick={() => {
              handleButtonClick('/advanced-generate');
            }}
          >
            Advanced Generating
          </Button>
        </div>
      )}
    </>
  );
};

export default CallToAction;
