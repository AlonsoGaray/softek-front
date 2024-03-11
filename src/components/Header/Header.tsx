import Logo from '@/assets/icons/logo-header.svg';
import Phone from '@/assets/icons/phone.svg';

function Header() {
  return (
    <header className="grid h-14 grid-cols-4 items-center md:grid-cols-12">
      <img className="col-span-2" src={Logo} alt="Logo Rimac" />
      <div className="col-span-2 flex w-full items-center justify-end gap-2 md:col-span-5 md:col-start-8">
        <p className="hidden text-xs md:flex">¡Compra por este medio!</p>
        <img src={Phone} alt="Logo Celular" />
        <h2 className="font-bold" aria-label="Numero telefonico de Rimac">
          (01) 411 6001
        </h2>
      </div>
    </header>
  );
}

export default Header;
