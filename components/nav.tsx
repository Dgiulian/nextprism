import React from 'react';
import Link from 'next/link';

interface Props {}

export const Nav = (props: Props) => {
  return (
    <ul className="flex grid grid-cols-4  ">
      <div className="col-span-1 flex justify-start">
        <li className="mr-6">
          <div className="inline-flex cursor-pointer">
            <img className="sm:h-10 h-8 pr-1" src="/logo.png" alt="Logo" />
            <Link href="/">
              <a className="p-2 text-center block hover:blue-700 sm:visible invisible">
                NewsPrism
              </a>
            </Link>
          </div>
        </li>
      </div>
      <div className="col-span-3 flex justify-end">
        <li className="sm:mr-6">
          <Link href="/saved-articles">
            <a className="p-2 text-center block hover:blue-700 text-bluee-500">
              Saved Articles
            </a>
          </Link>
        </li>
        <li className="sm:mr-6">
          <Link href="/bundles">
            <a className="p-2 text-center block hover:blue-700 text-bluee-500">
              Bundles
            </a>
          </Link>
        </li>
        <li className="sm:mr-6">
          <Link href="/feeds">
            <a className="p-2 text-center block hover:blue-700 text-bluee-500">
              Feeds
            </a>
          </Link>
        </li>
        <li className="sm:mr-6">
          <Link href="/login">
            {' '}
            <a className="p-2 text-center block hover:blue-700 text-bluee-500">
              Login
            </a>
          </Link>
        </li>
        <li className="sm:mr-6">
          <Link href="/logout">
            <a className="p-2 text-center block hover:blue-700 text-bluee-500">
              Logout
            </a>
          </Link>
        </li>
      </div>
    </ul>
  );
};
