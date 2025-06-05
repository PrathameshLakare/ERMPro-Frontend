import { useLocation, useNavigate, Link } from "react-router-dom";
import { useProfile } from "@/context/ProfileContext";
import { LogOut } from "lucide-react";

const MainLayout = () => {
  const location = useLocation();
  const { user, setToken } = useProfile();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setToken(null);
    navigate("/");
  };

  const role = localStorage.getItem("role") || "";

  return (
    <div className="bg-gray-800 px-4 py-3 flex flex-wrap justify-between items-center border-b border-gray-700">
      <Link
        to={
          role === "manager"
            ? "/manager/team-overview"
            : "/engineer/assignments"
        }
        className="text-lg md:text-xl font-semibold text-white"
      >
        ERMPro
      </Link>

      <div className="flex items-center gap-3 mt-2 md:mt-0">
        <span className="text-sm text-gray-300 whitespace-nowrap truncate max-w-[120px]">
          Hello, {user?.name || "User"}
        </span>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-1 rounded-md text-red-400 hover:bg-gray-700 hover:text-red-500"
        >
          <LogOut className="w-5 h-5" />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MainLayout;
