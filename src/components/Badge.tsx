import { FC } from 'react';

interface Props {
  children: React.ReactNode;
  extraClass?: string;
}

const Badge: FC<Props> = ({ children, extraClass }: Props) => {
  return (
    <span
      className={`w-fit rounded bg-gradient-to-r from-teal-400 to-green-500 px-3 py-1 font-bold ${extraClass}`}
    >
      {children}
    </span>
  );
};

export default Badge;
