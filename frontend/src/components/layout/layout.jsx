import PropTypes from 'prop-types';
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
