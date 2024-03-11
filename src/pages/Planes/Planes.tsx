/* eslint-disable @typescript-eslint/no-explicit-any */
import 'swiper/css';

import { useEffect, useRef, useState } from 'react';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Badge from '@/components/Badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { getPlans } from '@/services/plan';
import { Plan } from '@/types';

import { Arrow } from '../../assets/icons/arrow';
import { Check } from '../../assets/icons/check';
import PlanCasaIcon from '../../assets/icons/plan-casa.svg';
import PlanCasaClinicaIcon from '../../assets/icons/plan-casa-clinica.svg';
import { toggleGroupData } from '../../utils/constants';

function Planes() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const swiperLeftRef: any = useRef(null);
  const swiperRightRef: any = useRef(null);
  const [selectedValue, setSelectedValue] = useState<string>('');

  useEffect(() => {
    async function getPlansFunc() {
      const response = await getPlans();
      setPlans(response);
    }
    getPlansFunc();
  }, []);

  const handleSlideChange = (swiper: any) => {
    setCurrentPage(swiper.realIndex + 1);
  };

  const isLeftDisabled = () => {
    if (swiperLeftRef?.current?.className.includes('swiper-button-disabled')) {
      return true;
    }
    return false;
  };

  const isRightDisabled = () => {
    if (swiperRightRef?.current?.className.includes('swiper-button-disabled')) {
      return true;
    }
    return false;
  };

  const isPlanClinica = (name: string) => {
    return name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes('clinica');
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-center gap-4 border-b border-b-[#D7DBF5] py-4 md:hidden">
        <Arrow color="#A9AFD9" height="30" width="30" />
        <span className="whitespace-nowrap font-bold">PASO 1 DE 2</span>
        <div className="h-1.5 w-full rounded bg-[#D7DBF5]"></div>
      </div>

      <div className="flex w-full items-center justify-center gap-4 bg-[#EDEFFC] py-4">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 bg-[#4F4FFF] text-white">
          1
        </div>
        <span>Planes y coberturas</span>

        <div className="h-fit w-10 border-b-2 border-t-2 border-dashed border-[#7981B2]"></div>

        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 bg-[#7981B2] text-white">
          2
        </div>
        <span>Resumen</span>
      </div>

      <div className="mx-auto flex flex-col gap-4 text-center md:max-w-[544px]">
        <div className="flex flex-col gap-2 ">
          <span className="text-3xl font-bold md:text-4xl ">
            Rocio ¿Para quien deseas cotizar?
          </span>

          <span>Selecciona la opcion que se ajuste mas a tus necesidades.</span>
        </div>

        <ToggleGroup
          type="single"
          className="flex flex-col gap-6 md:flex-row"
          onValueChange={(value) => setSelectedValue(value)}
        >
          {toggleGroupData.map((item, i) => (
            <ToggleGroupItem
              key={i}
              value={item.value}
              aria-label={item.ariaLabel}
              className="group flex h-full w-full flex-col items-start rounded-3xl px-6 pb-10 pt-4 shadow-md hover:bg-transparent hover:text-black data-[state=on]:border-2 data-[state=on]:border-black data-[state=on]:bg-transparent"
            >
              <div className="flex w-full justify-end">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 group-data-[state=on]:bg-green-500">
                  <Check />
                </div>
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

      {selectedValue !== '' && (
        <Swiper
          spaceBetween={16}
          className="flex max-w-full flex-col items-center lg:max-w-[928px]"
          pagination={{ el: '.swiper-pagination', clickable: true }}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[Pagination, Navigation]}
          onSlideChange={handleSlideChange}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            601: {
              slidesPerView: 2,
            },
            900: {
              slidesPerView: 3,
            },
          }}
        >
          {plans.length > 0 &&
            plans?.map((plan) => (
              <SwiperSlide key={plan.name} className="flex flex-col">
                <div className="flex h-[600px] flex-col gap-6 rounded-3xl border px-8 py-10">
                  <div className="flex flex-col">
                    {isPlanClinica(plan.name) && (
                      <Badge extraClass="text-xs">Plan recomendado</Badge>
                    )}
                    <div className="flex items-start justify-between">
                      <span className="text-2xl font-bold">{plan.name}</span>
                      <img
                        src={
                          isPlanClinica(plan.name)
                            ? PlanCasaClinicaIcon
                            : PlanCasaIcon
                        }
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

                  <button className="mt-auto rounded-full bg-[#FF1C44]   py-3.5 text-lg font-bold text-white">
                    Seleccionar plan
                  </button>
                </div>
              </SwiperSlide>
            ))}

          <div className="flex items-center gap-4 pt-6">
            <div className="swiper-button-prev" ref={swiperLeftRef}>
              <Arrow
                color={isLeftDisabled() ? '#A9AFD9' : '#4F4FFF'}
                height="30"
                width="30"
              />
            </div>

            <div>
              <span>{currentPage}</span>
              <span> / </span>
              <span>{plans.length}</span>
            </div>

            <div className="swiper-button-next" ref={swiperRightRef}>
              <Arrow
                height="30"
                width="30"
                rotate
                color={isRightDisabled() ? '#A9AFD9' : '#4F4FFF'}
              />
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      )}
    </div>
  );
}
export default Planes;
