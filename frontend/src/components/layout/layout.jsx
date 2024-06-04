import { FooterWithSitemap } from '../footer/Footer';
import { NavbarWithSearch } from '../navBar/navbar';

const Layout = ({ children }) => {
  return (
    <>
      <NavbarWithSearch />
      <main>{children}</main>
      <FooterWithSitemap />
    </>
  );
};

export default Layout;
