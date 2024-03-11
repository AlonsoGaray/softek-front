interface StepsProps {
  color1: string;
  text1: string;
  color2: string;
  text2: string;
}

const Steps = ({ color1, text1, color2, text2 }: StepsProps) => (
  <div className="hidden w-full items-center justify-center gap-4 bg-[#EDEFFC] py-4 md:flex">
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full border border-[${color1}] text-[${color1}]`}
    >
      1
    </div>
    <span className={`font-semibold text-[${color1}]`}>{text1}</span>
    <div
      className={`h-fit w-10 border-b-2 border-t-2 border-dashed border-[${color1}]`}
    ></div>
    <div
      className={`flex h-6 w-6 items-center justify-center rounded-full border border-[${color2}] text-[${color2}]`}
    >
      2
    </div>
    <span className={`font-semibold text-[${color2}]`}>{text2}</span>
  </div>
);

export default Steps;
