import { useNavigate } from 'react-router-dom';

import { Arrow } from '@/assets/icons/arrow';

interface Props {
  onClick?: () => void;
}

const GoBack = ({ onClick }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className="hidden w-fit items-center gap-2 hover:cursor-pointer md:flex"
      onClick={() => {
        navigate(-1);

        if (onClick) {
          onClick();
        }
      }}
    >
      <Arrow color="#4F4FFF" height="20" width="20" />
      <span className="text-lg font-semibold text-[#4F4FFF]">Volver</span>
    </div>
  );
};

export default GoBack;
