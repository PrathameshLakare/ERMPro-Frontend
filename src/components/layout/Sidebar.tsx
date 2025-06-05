import { ReactNode, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  ClipboardList,
  Users,
  Calendar,
  User,
  BarChart,
  Menu,
  X,
} from "lucide-react";

const sidebarItemsManager = [
  { name: "Team Overview", icon: Users, path: "/manager/team-overview" },
  {
    name: "Create Assignment",
    icon: ClipboardList,
    path: "/manager/create-assignment",
  },
  {
    name: "Project Management",
    icon: Home,
    path: "/manager/project-management",
  },
  { name: "All Assignments", icon: Calendar, path: "/assignments/all" },
  { name: "Analytics", icon: BarChart, path: "/manager/analytics" },
];

const sidebarItemsEngineer = [
  { name: "My Assignments", icon: Calendar, path: "/engineer/assignments" },
  { name: "Profile", icon: User, path: "/engineer/profile" },
];

type SidebarProps = {
  children: ReactNode;
};

const Sidebar = ({ children }: SidebarProps) => {
  const role = localStorage.getItem("role");
  const items = role === "manager" ? sidebarItemsManager : sidebarItemsEngineer;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <header className="flex justify-between items-center bg-gray-800 text-white px-4 py-3 md:hidden">
        <h2 className="text-xl font-semibold">Dashboard</h2>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      <div className="flex flex-1">
        <aside
          className={`fixed md:static z-30 bg-gray-800 text-white w-64 h-full transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-200 ease-in-out md:translate-x-0`}
        >
          <div className="p-4 border-b border-gray-700 hidden md:block">
            <h2 className="text-xl font-bold">Dashboard</h2>
          </div>
          <nav className="flex flex-col space-y-2 p-4">
            {items.map(({ name, icon: Icon, path }) => (
              <NavLink
                key={name}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 ${
                    isActive ? "bg-gray-600 font-semibold" : "text-gray-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                {name}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Sidebar;
