import type { ReactNode } from 'react';

const Layout = ({
  children,
}: {
  children: ReactNode;
}): ReactNode => {
  return <div className="w-full bg-black">{children}</div>;
};

export default Layout;
