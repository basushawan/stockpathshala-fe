import { LogIn, Video } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const navItems = [
    { to: "/classes", icon: <Video size={18} />, label: "Classes" },
    { to: "/", icon: <LogIn size={18} />, label: "Login/Register" },
  ];
  const Wrapper = ({ children, className }) => (
    <div
      className={`w-full py-2 text-center border-gray-200 bg-white z-50 ${className}`}
    >
      <div className="flex flex-col items-center">
        <div className="font-bold text-lg text-purple-700">
          Stock PathShala Clone
        </div>
        <nav className="flex gap-6 mt-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-1 text-sm ${
                pathname === item.to
                  ? "text-violet-700 font-medium"
                  : "text-purple-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Header for Desktop  */}
      <div className="hidden md:block fixed top-0 left-0 right-0">
        <Wrapper className="shadow-sm" />
      </div>
      {/* Footer for Mobile  */}
      <div className="md:hidden fixed bottom-0 left-0 right-0">
        <Wrapper className="border-t" />
      </div>
    </>
  );
};

export default Navbar;
