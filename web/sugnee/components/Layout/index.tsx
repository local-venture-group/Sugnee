import Header from "../Header";
import Footer from "../Footer";
import Seo from "../Seo";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Seo />
      <div className="bg-white">
        <Header />
        <div className="container-lg mx-auto">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
