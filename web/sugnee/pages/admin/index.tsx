import { useContext } from "react";
import { useRouter } from "next/router";

// Contexts
import { AdminContext } from "../../contexts/Admin";
import { AuthContext } from "../../contexts/Auth";

// Components
import Button from "../../components/Button";

// Types
import { NextPage } from "next";

const admin: NextPage = () => {
  const router = useRouter();
  const { admin, adminLogout } = useContext(AdminContext);
  const { user } = useContext(AuthContext);

  if (user) {
    router.push("/");
  } else if (!admin) return null;
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="mt-6 text-5xl font-bold text-gray-900">ADMIN</h1>
      <div className="my-10">
        <Button
          label={"管理者ログアウト"}
          primary={true}
          onClick={adminLogout}
        />
      </div>
    </div>
  );
};

export default admin;
