import { useContext } from "react";

// Contexts
import { StaffContext } from "../../contexts/Staff";

const staff = () => {
  const { staff, staffLogout } = useContext(StaffContext);
  return (
    <div>
      {staff && (
        <div>
          <p>{staff.username}</p>
          <p>{staff.email}</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={staffLogout}
          >
            企業ログアウト
          </button>
        </div>
      )}
    </div>
  );
};

export default staff;
