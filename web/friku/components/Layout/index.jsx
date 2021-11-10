import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <>
      <div className="bg-white">
        <Header />
        <div className="container-lg mx-auto">{children}</div>
        <Footer />
      </div>
    </>
  );
}
