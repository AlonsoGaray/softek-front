import ParaMiIcon from '../assets/para-mi.svg';
import ParaFamiliarIcon from '../assets/para-familiar.svg';

export const paths = {
  HOME: '/',
  PLANES: '/planes',
  RESUMEN: '/resumen',
};

export const toggleGroupData = [
  {
    value: 'para-mi',
    ariaLabel: 'Toggle para mi',
    iconSrc: ParaMiIcon,
    title: 'Para mi',
    description:
      'Cotiza tu seguro de salud y agrega familiares si así lo deseas.',
  },
  {
    value: 'para-familiar',
    ariaLabel: 'Toggle para familiar',
    iconSrc: ParaFamiliarIcon,
    title: 'Para familiar',
    description:
      'Realiza una cotización para uno de tus familiares o cualquier persona.',
  },
];
