import "../styles/globals.css";
import "tailwindcss/tailwind.css";

// Context
import { AuthProvider } from "../contexts/Auth";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
