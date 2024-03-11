import logo from '@/assets/icons/logo-footer.svg';

function Footer() {
  return (
    <footer className="mt-10 flex flex-col items-center justify-center gap-6 bg-[#03050F] px-5 py-8 md:flex-row md:justify-between">
      <img src={logo} alt="Logo Rimac" />
      <div className="w-full border border-[#2B304E] md:hidden"></div>
      <p className="text-xs text-white">© 2023 RIMAC Seguros y Reaseguros</p>
    </footer>
  );
}

export default Footer;
