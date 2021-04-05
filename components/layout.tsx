import React, { ReactNode } from 'react';
import { Nav } from './nav';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="p-4">
      <Nav />
      {children}
    </div>
  );
};
