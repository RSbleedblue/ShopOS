import { FaFolder } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  const activeClass = "bg-gray-200 bg-opacity-10 text-white";

  return (
    <div className="h-screen border border-white border-opacity-10 flex flex-col items-center">
      <NavLink
        to="/products"
        className={({ isActive }) =>
          `flex flex-col p-2 items-center gap-2 m-2 rounded-lg transition-all cursor-pointer ${
            isActive
              ? activeClass
              : "text-gray-300 hover:bg-gray-200 hover:bg-opacity-10"
          }`
        }
      >
        <FaFolder className="text-sm" />
        <p className="text-xs">Products</p>
      </NavLink>

      <NavLink
        to="/generate"
        className={({ isActive }) =>
          `flex flex-col p-2 items-center gap-2 m-2 rounded-lg transition-all cursor-pointer ${
            isActive
              ? activeClass
              : "text-gray-300 hover:bg-gray-200 hover:bg-opacity-10"
          }`
        }
      >
        <TfiReload className="text-sm" />
        <p className="text-xs">Generate</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
