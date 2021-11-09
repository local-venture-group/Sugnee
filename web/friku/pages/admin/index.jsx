import { useContext } from "react";
import { useRouter } from "next/router";

// Contexts
import { AdminContext } from "../../contexts/Admin";

const admin = () => {
  const router = useRouter();
  const { admin, adminLogout } = useContext(AdminContext);

  return (
    <div>
      <h1>管理者ページ</h1>
      <button type="button" onClick={adminLogout}>
        管理者ログアウト
      </button>
    </div>
  );
};

export default admin;
