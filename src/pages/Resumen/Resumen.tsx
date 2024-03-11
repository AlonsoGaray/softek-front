import { Arrow } from '@/assets/icons/arrow';
import { Family } from '@/assets/icons/famili-icon';

function Resumen() {
  return (
    <div className="mt-8 flex w-full flex-col items-center">
      <div className="hidden w-full items-center justify-center gap-4 bg-[#EDEFFC] py-4 md:flex">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#7981B2] text-[#7981B2]">
          1
        </div>
        <span className="font-semibold text-[#7981B2]">
          Planes y coberturas
        </span>

        <div className="h-fit w-10 border-b-2 border-t-2 border-dashed border-[#7981B2]"></div>

        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 bg-[#4F4FFF] text-white">
          2
        </div>
        <span className="font-semibold">Resumen</span>
      </div>

      <div className="flex w-full max-w-[336px] flex-col gap-8 md:max-w-[928px]">
        <div className="hidden items-center gap-2 md:flex">
          <Arrow color="#4F4FFF" height="20" width="20" />
          <span className="text-lg font-semibold text-[#4F4FFF]">Volver</span>
        </div>

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
              <span className="text-xl font-semibold">Rocio Miranda Diaz</span>
            </div>
          </div>

          <div className="w-full border border-[#D7DBF5] "></div>

          <div className="flex flex-col">
            <span className="text-base font-semibold">Responsable de pago</span>
            <span className="text-sm">DNI: 12312312</span>
            <span className="text-sm">Celular: 412321423</span>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-semibold">Plan elegido</span>
            <span className="text-sm">Plan en Casa y Clinica</span>
            <span className="text-sm">Costo del Plan: $99 al mes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Resumen;
