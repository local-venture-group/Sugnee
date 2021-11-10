import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// Contexts
import { AuthProvider } from "../contexts/Auth";
import { AdminProvider } from "../contexts/Admin";
import { StaffProvider } from "../contexts/Staff";

// Components
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <StaffProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StaffProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default MyApp;
