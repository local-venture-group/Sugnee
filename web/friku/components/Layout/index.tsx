import Header from "../Header";
import Footer from "../Footer";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <div className="bg-white">
        <Header />
        <div className="container-lg mx-auto">{children}</div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
