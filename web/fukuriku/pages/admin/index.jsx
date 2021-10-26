import { useContext } from "react";
import router, { useRouter } from "next/router";

// contexts
import { AdminContext } from "../../contexts/Admin";

// components
import Button from "../../components/Button";

const admin = () => {
  const router = useRouter();
  const { admin, adminLogout } = useContext(AdminContext);

  return (
    <div>
      <h1>管理者ページ</h1>
      <Button
        type={"button"}
        size={"md"}
        text={"管理者ログアウト"}
        event={adminLogout}
      />
    </div>
  );
};

export default admin;
