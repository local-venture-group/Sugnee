import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// Contexts
import { AuthProvider } from "../contexts/Auth";
import { AdminProvider } from "../contexts/Admin";
import { StaffProvider } from "../contexts/Staff";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <StaffProvider>
          <Component {...pageProps} />
        </StaffProvider>
      </AdminProvider>
    </AuthProvider>
  );
}

export default MyApp;
