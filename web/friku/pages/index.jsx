import { useContext } from "react";

// テスト用
import { AuthContext } from "../contexts/Auth";

export default function Home() {
  const { user, logout } = useContext(AuthContext);
  console.log("test", user);
  return (
    <div className="container mx-auto">
      <main className="w-full h-96 bg-gradient-to-b from-primary to-secondary">
        <h1>Fリク</h1>
        {user && (
          <button type="button" className="btn" onClick={logout}>
            ログアウト
          </button>
        )}
      </main>
    </div>
  );
}
