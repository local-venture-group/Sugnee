import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import "../styles/components.scss";

// Contexts
import { AuthProvider } from "../contexts/Auth";
import { AdminProvider } from "../contexts/Admin";
import { StaffProvider } from "../contexts/Staff";
import { SearchConditionProvider } from "../contexts/SearchCondition";

// Components
import Layout from "../components/Layout";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <AuthProvider>
      <AdminProvider>
        <StaffProvider>
          <SearchConditionProvider>
            <Layout>
              {pageLoading ? <Loading /> : <Component {...pageProps} />}
            </Layout>
          </SearchConditionProvider>
        </StaffProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default MyApp;
