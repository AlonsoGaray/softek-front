import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Family } from '@/assets/icons/famili-icon';
import GoBack from '@/components/GoBack';
import Steps from '@/components/Steps';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { paths } from '@/utils/constants';

function Resumen() {
  const navigate = useNavigate();

  const [user] = useLocalStorage('user', '');
  const [documentNumber] = useLocalStorage('documentNumber', '');
  const [phoneNumber] = useLocalStorage('phoneNumber', '');
  const [selectedPlan] = useLocalStorage('selectedPlan', '');
  const [selectedOption] = useLocalStorage('selectedOption', '');

  useEffect(() => {
    if (!selectedPlan || !selectedOption || !user) {
      navigate(paths.PLANES);
    }
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <Steps
        color1="#7981B2"
        text1="Planes y coberturas"
        color2="#4F4FFF"
        text2="Resumen"
      />

      <div className="mt-10 flex w-full max-w-[336px] flex-col gap-8 md:max-w-[928px]">
        <GoBack
          onClick={() => {
            localStorage.removeItem('selectedOption');
            localStorage.removeItem('selectedPlan');
          }}
        />

        <h2 className="text-center text-3xl font-semibold md:text-left">
          Resumen del seguro
        </h2>

        <div className="mt-4 flex flex-col gap-4 rounded-3xl border px-8 py-6 shadow-lg shadow-slate-400">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold">
              PRECIOS CALCULADOS PARA:
            </span>
            <div className="flex gap-3">
              <Family />
              <span className="text-xl font-semibold">
                {user.name} {user.lastName}
              </span>
            </div>
          </div>

          <div className="w-full border border-[#D7DBF5] "></div>

          <div className="flex flex-col">
            <span className="text-base font-semibold">Responsable de pago</span>
            <span className="text-sm">DNI: {documentNumber}</span>
            <span className="text-sm">Celular: {phoneNumber}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-semibold">Plan elegido</span>
            <span className="text-sm">{selectedPlan.name}</span>
            <span className="text-sm">
              Costo del Plan: $
              {selectedOption === 'para-alguien'
                ? selectedPlan.price * 0.95
                : selectedPlan.price}{' '}
              al mes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Resumen;
