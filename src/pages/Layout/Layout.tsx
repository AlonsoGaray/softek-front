import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function Layout() {
  return (
    <div>
      <div className="px-8">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
export default Layout;
