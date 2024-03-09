import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col ">
      <div className="flex-grow px-8">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
