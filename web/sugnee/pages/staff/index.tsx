import { useContext } from "react";
import { useRouter } from "next/router";

// Contexts
import { StaffContext } from "../../contexts/Staff";
import { AuthContext } from "../../contexts/Auth";

// Components
import Button from "../../components/Button";

// Types
import { NextPage } from "next";

const staff: NextPage = () => {
  const router = useRouter();
  const { staff, staffLogout } = useContext(StaffContext);
  const { user } = useContext(AuthContext);

  console.log(staff);

  if (user) {
    router.push("/");
  } else if (!staff) return null;
  return (
    <div className="container mx-auto text-center py-8">
      {staff && (
        <div>
          <h1 className="mt-6 text-5xl font-bold text-gray-900">COMPANY</h1>
          <p>{staff.username}</p>
          <p>{staff.email}</p>
          <div className="my-10">
            <Button
              label={"企業ログアウト"}
              primary={true}
              onClick={staffLogout}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default staff;
