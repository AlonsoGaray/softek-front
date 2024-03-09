import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const Badge: FC<Props> = ({ children }) => {
  return (
    <span className="w-fit rounded bg-gradient-to-r from-teal-400 to-green-500 px-3 py-1 font-bold">
      {children}
    </span>
  );
};

export default Badge;
