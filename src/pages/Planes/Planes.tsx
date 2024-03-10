import ArrowIcon from '../../assets/arrow.svg';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { toggleGroupData } from '../../utils/constants';

function Planes() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-4 border-b border-b-[#D7DBF5] py-4">
        <img src={ArrowIcon} alt="Icono flecha atras" />
        <span className="whitespace-nowrap font-bold">PASO 1 DE 2</span>
        <div className="h-1.5 w-full rounded bg-[#D7DBF5]"></div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold">
          Rocio ¿Para quien deseas cotizar?
        </span>

        <span>Selecciona la opcion que se ajuste mas a tus necesidades.</span>
      </div>

      <div className="flex flex-col gap-6">
        <ToggleGroup type="single" className="flex flex-col">
          {toggleGroupData.map((item) => (
            <ToggleGroupItem
              value={item.value}
              aria-label={item.ariaLabel}
              className="group flex h-full w-full flex-col items-start rounded-3xl px-6 pb-10 pt-4 shadow-md data-[state=on]:border-2 data-[state=on]:border-black data-[state=on]:bg-transparent"
            >
              <div className="flex w-full justify-end">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 group-data-[state=on]:bg-green-500"></div>
              </div>

              <div className="flex items-center gap-2">
                <img src={item.iconSrc} alt={`${item.title} icon`} />
                <span className="text-xl font-bold">{item.title}</span>
              </div>
              <span className="text-left">{item.description}</span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
export default Planes;
