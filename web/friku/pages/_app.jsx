import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// Contexts
import { AuthProvider } from "../contexts/Auth";
import { AdminProvider } from "../contexts/Admin";
import { StaffProvider } from "../contexts/Staff";
import { SearchConditionProvider } from "../contexts/SearchCondition";

// Components
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <StaffProvider>
          <SearchConditionProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SearchConditionProvider>
        </StaffProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default MyApp;
