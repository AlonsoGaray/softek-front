import ParaFamiliarIcon from '@/assets/para-familiar.svg';
import ParaMiIcon from '@/assets/para-mi.svg';
import { ToggleGroupItemType } from '@/types';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

export const paths = {
  HOME: '/',
  PLANES: '/planes',
  RESUMEN: '/resumen',
};

export const toggleGroupData: ToggleGroupItemType[] = [
  {
    value: 'para-mi',
    ariaLabel: 'Toggle para mi',
    iconSrc: ParaMiIcon,
    title: 'Para mi',
    description:
      'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
  },
  {
    value: 'para-alguien',
    ariaLabel: 'Toggle para alguien mas',
    iconSrc: ParaFamiliarIcon,
    title: 'Para alguien mas',
    description:
      'Realiza una cotización para uno de tus familiares o cualquier persona.',
  },
];
