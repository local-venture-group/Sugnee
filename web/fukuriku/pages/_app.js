import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// Context
import { AuthProvider } from "../contexts/Auth";
import { AdminProvider } from "../contexts/Admin";
import { SearchConditionProvider } from "../contexts/SearchCondition";

// Component
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <SearchConditionProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SearchConditionProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default MyApp;
