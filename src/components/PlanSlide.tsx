import PlanCasaIcon from '@/assets/icons/plan-casa.svg';
import PlanCasaClinicaIcon from '@/assets/icons/plan-casa-clinica.svg';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { paths } from '@/utils/constants';

import Badge from './Badge';

interface PlanSlideProps {
  plan: {
    name: string;
    price: number;
    description?: string[];
  };
  selectedValue: string;
  navigate: (path: string) => void;
}

const PlanSlide = ({ plan, selectedValue, navigate }: PlanSlideProps) => {
  const [_selectedPlan, setSelectedPlan] = useLocalStorage('selectedPlan', '');
  const [_selectedOption, setSelectedOption] = useLocalStorage(
    'selectedOption',
    '',
  );

  const isPlanClinica = (name: string) => {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes('clinica');
  };
  return (
    <div className="flex h-[600px] flex-col gap-6 rounded-3xl border px-8 py-10 shadow-lg shadow-slate-400">
      <div className="flex flex-col">
        {isPlanClinica(plan.name) && (
          <Badge extraClass="text-xs">Plan recomendado</Badge>
        )}
        <div className="flex items-start justify-between">
          <span className="text-2xl font-bold">{plan.name}</span>
          <img
            src={isPlanClinica(plan.name) ? PlanCasaClinicaIcon : PlanCasaIcon}
            alt={`Icono ${plan.name}`}
          />
        </div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-[#7981B2]">
            COSTO DEL PLAN
          </span>
          <span
            className={`text-xl font-bold ${selectedValue === 'para-alguien' && 'text-xs text-[#7981B2] line-through'}`}
          >
            ${plan.price}{' '}
            {selectedValue === 'para-alguien' ? 'antes' : 'al mes'}
          </span>
          {selectedValue === 'para-alguien' && (
            <span className="text-xl font-bold">
              ${plan.price * 0.95} al mes
            </span>
          )}
        </div>
      </div>

      <div className="w-full border border-[#D7DBF5] md:hidden"></div>

      <ul className="flex list-disc flex-col gap-6 pl-5">
        {plan.description?.map((desc, i) => (
          <li key={i} className="text-pretty">
            {desc}
          </li>
        ))}
      </ul>

      <button
        onClick={() => {
          setSelectedPlan(plan);
          setSelectedOption(selectedValue);
          navigate(paths.RESUMEN);
        }}
        className="mt-auto rounded-full bg-[#FF1C44] py-3.5 text-lg font-bold text-white"
      >
        Seleccionar plan
      </button>
    </div>
  );
};

export default PlanSlide;
