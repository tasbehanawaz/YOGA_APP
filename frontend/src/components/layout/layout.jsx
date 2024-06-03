import { FooterWithSitemap } from '../footer/Footer';
import { StickyNavbar } from '../navBar/navbar';

const Layout = ({ children }) => {
  return (
    <>
      <StickyNavbar />
      <main>{children}</main>

      <FooterWithSitemap />
    </>
  );
};

export default Layout;
