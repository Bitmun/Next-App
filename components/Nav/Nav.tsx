'use client';
import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

import logo from '@/assets/images/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { BuiltInProviderType } from 'next-auth/providers/index';
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  signOut,
} from 'next-auth/react';

export const Nav = () => {
  const isLogged = true;

  const [toggleDropdown, setToggleDropdown] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  const handleToggleDropdown = () => {
    setToggleDropdown((prev) => !prev);
  };

  const handleSignIn = async (id: LiteralUnion<BuiltInProviderType, string>) => {
    await signIn(id);
  };

  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    fetchProviders();
  }, []);

  return (
    <nav className={styles.navBar}>
      <Link href="/" className={styles.navLink}>
        <Image src={logo} alt="logo" width={40} height={40} />
        <span className={styles.logoText}>Promptopia</span>
      </Link>

      <div className={styles.desktopNav}>
        {isLogged ? (
          <div className={styles.isLoggedWrapper}>
            <Link href="/create/prompt" className={styles.blackBtn}>
              Create Post
            </Link>

            <button type="button" onClick={handleSignOut} className={styles.outlineBtn}>
              Sign out
            </button>
            <Link href="/profile">
              <Image src={logo} alt="profile image" className={styles.profilePic} />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    handleSignIn(provider.id);
                  }}
                  className={styles.blackBtn}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      <div className={styles.mobileNav}>
        {isLogged ? (
          <div className={styles.mobileIsLoggedWrapper}>
            <Image
              src={logo}
              alt="profile image"
              className={styles.profilePic}
              onClick={() => {
                handleToggleDropdown();
              }}
            />

            {toggleDropdown && (
              <div className={styles.dropdownMenu}>
                <Link
                  href="/profile"
                  className={styles.dropdownLink}
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  My Profile
                </Link>
                <Link
                  href="/create/prompt"
                  className={styles.dropdownLink}
                  onClick={() => {
                    setToggleDropdown(false);
                  }}
                >
                  CreatePrompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className={styles.blackBtn}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => {
                    handleSignIn(provider.id);
                  }}
                  className={styles.blackBtn}
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
