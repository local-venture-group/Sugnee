import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// Context
import { AuthProvider } from "../contexts/Auth";
import { AdminProvider } from "../contexts/Admin";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <Component {...pageProps} />
      </AdminProvider>
    </AuthProvider>
  );
}

export default MyApp;
