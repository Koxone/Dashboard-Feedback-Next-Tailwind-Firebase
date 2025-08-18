'use client';

import React from 'react';
import Logo from './Components/Logo/Logo';
import Avatar from './Components/Avatar/Avatar';
import SidebarMenu from './Components/Menu/SidebarMenu';
import { useMobileMenu } from '@/Stores/useMobileMenu';
import MobileSidebarToggleButton from './Components/MobileSidebarToggleButton/MobileSidebarToggleButton';

// Clerk
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';

function SideBar() {
  const { isOpen } = useMobileMenu();
  const { user } = useUser();

  const githubUsername =
    user?.externalAccounts?.find((a) => a.provider === 'oauth_github')
      ?.username || null;

  return (
    <div
      id="mobile-menu"
      className={[
        'bg-bg-main pointer-events-auto absolute z-50 hidden h-full max-h-[790px] w-fit scale-100 opacity-100 md:hidden md:max-h-full lg:relative lg:flex',
        'flex grid-cols-1 grid-rows-[auto_auto_1fr] flex-col gap-6 md:grid',
        'rounded-tl-lg rounded-bl-lg p-8',
        'before:absolute before:top-[20px] before:right-0 before:bottom-[20px] before:w-px before:bg-gray-400/40',
        'transition-all duration-200 ease-out',
        'md:pointer-events-auto md:scale-100 md:opacity-100',
      ].join(' ')}
    >
      <div className="grid w-full grid-cols-[auto_1fr] items-center gap-4">
        <MobileSidebarToggleButton />
        <Logo />
      </div>

      {/* Clerk SignedOut */}
      <SignedOut>
        <SignInButton mode="modal">
          <button className="cursor-pointer rounded-md bg-[#354f7c] px-3 py-2 text-sm text-white hover:bg-[#2a3f61]">
            Iniciar sesión
          </button>
        </SignInButton>
      </SignedOut>

      {/* Clerk SignedIn */}
      <SignedIn>
        <div className="flex flex-col items-center gap-3">
          <UserButton />
          <div>
            <h3
              title="Username"
              className="text-center text-base font-medium text-white capitalize"
            >
              {user?.externalAccounts?.[0]?.username || 'Not available'}
            </h3>
            <p title="User Email Address" className="text-xs text-neutral-400">
              {user?.primaryEmailAddress?.emailAddress || ''}
            </p>
          </div>
        </div>
      </SignedIn>

      {/* Sidebar Menu */}
      <SidebarMenu />
    </div>
  );
}

export default SideBar;
