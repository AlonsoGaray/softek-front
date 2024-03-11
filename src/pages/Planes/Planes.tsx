/* eslint-disable @typescript-eslint/no-explicit-any */
import 'swiper/css';

import { differenceInYears, parse } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Arrow } from '@/assets/icons/arrow';
import GoBack from '@/components/GoBack';
import PlanSlide from '@/components/PlanSlide';
import Steps from '@/components/Steps';
import ToggleGroupItemWrapper from '@/components/ToggleGroupItemWrapper';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getPlans } from '@/services/plan';
import { getUser } from '@/services/user';
import { Plan, ToggleGroupItemType, User } from '@/types';
import { paths, toggleGroupData } from '@/utils/constants';

function Planes() {
  const navigate = useNavigate();

  const [user, setUser] = useLocalStorage('user', '');
  const [documentNumber] = useLocalStorage('documentNumber', '');

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

      <Steps
        color1="#4F4FFF"
        text1="Planes y coberturas"
        color2="#7981B2"
        text2="Resumen"
      />

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
            {toggleGroupData.map((item: ToggleGroupItemType, i) => (
              <ToggleGroupItemWrapper key={i} {...item} />
            ))}
          </ToggleGroup>
        </div>

        {selectedValue !== '' && (
          <Swiper
            spaceBetween={16}
            className="flex max-w-full flex-col items-center"
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
                  <PlanSlide
                    navigate={navigate}
                    plan={plan}
                    selectedValue={selectedValue}
                  />
                </SwiperSlide>
              ))}

            <div className="flex items-center justify-center gap-4 pt-6 lg:hidden">
              <div className="button-prev">
                <Arrow
                  color={firstPage ? '#A9AFD9' : '#4F4FFF'}
                  height="30"
                  width="30"
                  classProps={
                    firstPage ? 'cursor-not-allowed' : 'cursor-pointer'
                  }
                />
              </div>

              <div className="pagination"></div>

              <div className="button-next">
                <Arrow
                  height="30"
                  width="30"
                  rotate
                  color={lastPage ? '#A9AFD9' : '#4F4FFF'}
                  classProps={
                    lastPage ? 'cursor-not-allowed' : 'cursor-pointer'
                  }
                />
              </div>
            </div>
          </Swiper>
        )}
      </div>
    </div>
  );
}
export default Planes;
