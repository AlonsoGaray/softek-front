import { Check } from '@/assets/icons/check';
import { ToggleGroupItemType } from '@/types';

import { ToggleGroupItem } from './ui/toggle-group';

const ToggleGroupItemWrapper = (item: ToggleGroupItemType) => {
  return (
    <ToggleGroupItem
      value={item.value}
      aria-label={item.ariaLabel}
      className="group flex min-h-52 w-full flex-col items-start rounded-3xl px-6 pb-10 pt-4 shadow-md hover:bg-transparent hover:text-black data-[state=on]:border-2 data-[state=on]:border-black data-[state=on]:bg-transparent"
    >
      <div className="flex w-full justify-end">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 group-data-[state=on]:bg-green-500">
          <Check />
        </div>
      </div>

      <div className="flex items-center gap-2 md:flex-col md:items-start">
        <img src={item.iconSrc} alt={`${item.title} icon`} />
        <span className="text-xl font-bold">{item.title}</span>
      </div>
      <span className="text-pretty text-left">{item.description}</span>
    </ToggleGroupItem>
  );
};

export default ToggleGroupItemWrapper;
