/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import 'swiper/css';

import { differenceInYears, parse } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Arrow } from '@/assets/icons/arrow';
import { Check } from '@/assets/icons/check';
import PlanCasaIcon from '@/assets/icons/plan-casa.svg';
import PlanCasaClinicaIcon from '@/assets/icons/plan-casa-clinica.svg';
import Badge from '@/components/Badge';
import GoBack from '@/components/GoBack';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getPlans } from '@/services/plan';
import { getUser } from '@/services/user';
import { Plan, User } from '@/types';
import { paths, toggleGroupData } from '@/utils/constants';

function Planes() {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage('user', '');
  const [documentNumber] = useLocalStorage('documentNumber', '');
  const [selectedPlan, setSelectedPlan] = useLocalStorage('selectedPlan', '');
  const [selectedOption, setSelectedOption] = useLocalStorage(
    'selectedOption',
    '',
  );

  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [firstPage, setFirstPage] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState<boolean>(false);

  useEffect(() => {
    async function getUserFunc() {
      const response: User = await getUser();
      setUser(response);
    }

    if (documentNumber) {
      getUserFunc();
    }
  }, []);

  useEffect(() => {
    async function getPlansFunc() {
      const response = await getPlans();

      const age = differenceInYears(
        new Date(),
        parse(user.birthDay, 'MM-dd-yyyy', new Date()),
      );

      const filteredPlans = response.filter((plan) => plan.age >= age);
      setPlans(filteredPlans);
    }

    if (user) {
      getPlansFunc();
    }
  }, [user]);

  useEffect(() => {
    if (!documentNumber) {
      localStorage.clear();
      navigate(paths.HOME);
    }
  }, [documentNumber, navigate]);

  const handleSlideChange = (swiper: any) => {
    setFirstPage(swiper.isBeginning);
    setLastPage(swiper.isEnd);
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
        <Arrow
          color="#A9AFD9"
          height="30"
          width="30"
          onClick={() => {
            navigate(-1);
            localStorage.clear();
          }}
          classProps="cursor-pointer"
        />
        <span className="whitespace-nowrap font-bold">PASO 1 DE 2</span>
        <div className="h-1.5 w-full rounded bg-[#D7DBF5]"></div>
      </div>

      <div className="hidden w-full items-center justify-center gap-4 bg-[#EDEFFC] py-4 md:flex">
        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-neutral-500 bg-[#4F4FFF] text-white">
          1
        </div>
        <span className="font-semibold">Planes y coberturas</span>

        <div className="h-fit w-10 border-b-2 border-t-2 border-dashed border-[#4F4FFF]"></div>

        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-[#7981B2] text-[#7981B2]">
          2
        </div>
        <span className="font-semibold text-[#7981B2]">Resumen</span>
      </div>

      <div className="mx-auto flex w-full flex-col gap-5 lg:w-[928px] lg:max-w-[928px]">
        <GoBack onClick={() => localStorage.clear()} />
        <div className="mx-auto flex flex-col gap-4 text-center md:max-w-[544px]">
          <div className="flex flex-col gap-2 ">
            <span className="text-3xl font-bold md:text-4xl ">
              {user?.name} ¿Para quien deseas cotizar?
            </span>

            <span>
              Selecciona la opcion que se ajuste mas a tus necesidades.
            </span>
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
                <span className="text-pretty text-left">
                  {item.description}
                </span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <Swiper
          spaceBetween={16}
          className={`flex max-w-full flex-col items-center ${selectedValue === '' && 'hidden'}`}
          pagination={{
            el: '.pagination',
            type: 'fraction',
          }}
          navigation={{
            nextEl: '.button-next',
            prevEl: '.button-prev',
          }}
          modules={[Pagination, Navigation]}
          onSlideChange={handleSlideChange}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {plans.length > 0 &&
            plans?.map((plan) => (
              <SwiperSlide key={plan.name} className="flex flex-col lg:pb-4">
                <div className="flex h-[600px] flex-col gap-6 rounded-3xl border px-8 py-10 shadow-lg shadow-slate-400">
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
              </SwiperSlide>
            ))}

          <div className="flex items-center gap-4 pt-6 lg:hidden">
            <div className="button-prev">
              <Arrow
                color={firstPage ? '#A9AFD9' : '#4F4FFF'}
                height="30"
                width="30"
                classProps={firstPage ? 'cursor-not-allowed' : 'cursor-pointer'}
              />
            </div>

            <div className="pagination"></div>

            <div className="button-next">
              <Arrow
                height="30"
                width="30"
                rotate
                color={lastPage ? '#A9AFD9' : '#4F4FFF'}
                classProps={lastPage ? 'cursor-not-allowed' : 'cursor-pointer'}
              />
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
}
export default Planes;
