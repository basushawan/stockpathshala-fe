import React from "react";
import { useNavigate } from "react-router-dom";
import { getUser, removeUser } from "../utils/storage";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const user = getUser();

  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  if (!user) return null;

  const handleLogout = () => {
    removeUser();
    navigate("/login");
    Swal.fire({
      icon: "success",
      iconColor: "green",
      color: "green",
      background: "lime",
      title: "Logout successfully",
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="flex flex-col items-center h-screen justify-center text-center">
      <p className="text-sm font-semibold mb-4 text-violet-900">
        Logged in as +91 {user}
      </p>
      <button
        className="px-6 py-2 bg-violet-700 text-white rounded-md hover:bg-violet-900 transition cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
