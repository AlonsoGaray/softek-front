import FamiliaMobil from '../../assets/familia-mobil.png';

function Seguro() {
  return (
    <div className="flex flex-col ">
      <div className="flex">
        <div className="flex flex-col">
          <h3 className="w-fit rounded bg-gradient-to-r from-teal-400 to-green-500 px-3 py-1 font-bold">
            Seguro Salud Flexible
          </h3>
          <h2 className="text-3xl font-bold leading-9">
            Creado para ti y tu familia
          </h2>
        </div>

        <div className="flex">
          <img
            src={FamiliaMobil}
            alt="Foto familia feliz"
            width={136}
            height={160}
          />
        </div>
      </div>

      <div className="w-full border border-[#2B304E] md:hidden"></div>
    </div>
  );
}
export default Seguro;
