import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import GlassSurface from "../components/GlassSurface";
import Selector from "../components/Selector";

export default function InitialPage({
  cursor,
  setCursor,
}: {
  cursor: any;
  setCursor: any;
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [nav, setNav] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { id: 1, label: "Início", icon: "🏠", path: "/page" },
    { id: 2, label: "Sobre", icon: "👤", path: "/page/sobre" },
    { id: 3, label: "Habilidades", icon: "⚡", path: "/page/habilidades" },
    { id: 4, label: "Projetos", icon: "💼", path: "/page/projetos" },
    { id: 5, label: "Contato", icon: "💬", path: "/page/contato" }
  ];

  
  useEffect(() => {
    const currentItem = menuItems.find(item => item.path === location.pathname);
    if (currentItem) {
      setNav(currentItem.id);
    } else {
      setNav(null);
    }
  }, [location.pathname]);

  const handleNavClick = (id: number) => {
    const item = menuItems.find(i => i.id === id);
    if (item) {
      navigate(item.path);
      setMenuOpen(false);
    }
  };

  return (
    <div className="h-full px-6 pt-6 lg:pb-6 grid grid-rows-[auto_1fr]">
      {/* ================= HEADER ================= */}
      <header className="flex justify-center items-center z-40 relative">
        {/* ----- Desktop Navbar ----- */}
        <GlassSurface
          borderRadius={50}
          width="80%"
          className="hidden lg:block w-full"
          contentClassName="grid grid-cols-3 px-10 py-4 items-center"
        >
          <div className="flex justify-start items-center">
            <span
              className="logo text-4xl font-bold cursor-pointer select-none transition-transform duration-[800ms] hover:rotate-[360deg]"
              onClick={() => handleNavClick(1)}
            >
              HB
            </span>
          </div>

          <nav className="flex justify-center items-center">
            <ul className="flex space-x-8 text-lg">
              {menuItems.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`nav-link cursor-pointer ${
                    nav === item.id
                      ? "text-white active"
                      : "text-white/70 "
                  }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex justify-end items-center">
            <Selector cursor={cursor} setCursor={setCursor} />
          </div>
        </GlassSurface>

        {/* ----- Mobile Navbar ----- */}
        <GlassSurface
          borderRadius={25}
          width="100%"
          className="w-full lg:hidden"
          contentClassName="flex justify-between items-center px-6 py-4"
        >
          <span
            onClick={() => handleNavClick(1)}
            className="text-3xl font-bold text-white select-none cursor-pointer"
          >
            HB
          </span>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="relative flex flex-col justify-between w-8 h-6 focus:outline-none z-50 group"
            aria-label="Abrir menu"
          >
            <span
              className={`block w-full h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[7px]" : "group-hover:scale-x-110"
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "opacity-0 scale-x-0" : "group-hover:scale-x-90"
              }`}
            />
            <span
              className={`block w-full h-0.5 bg-white rounded transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[7px]" : "group-hover:scale-x-110"
              }`}
            />
          </button>
        </GlassSurface>

        {/* MENU MOBILE */}
        <div
          className={`fixed top-[90px] left-4 right-4 z-40 transform transition-all duration-500 ${
            menuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div
            className="
            rounded-2xl 
            bg-white/10 
            backdrop-blur-md 
            border border-white/20 
            shadow-lg
            transition-all 
            duration-500
            py-2
            "
          >
            <ul className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <li
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-6 py-4 cursor-pointer flex items-center gap-3 transition-all w-[95%] mx-auto rounded-2xl duration-300 ${
                    index !== menuItems.length - 1 ? "border-b border-white/10" : ""
                  } ${
                    nav === item.id
                      ? "text-white font-semibold bg-white/20"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-lg">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </header>

      {/* ================= CONTENT ================= */}
      <main className="overflow-x-hidden hide-scroll">
        <Outlet />
      </main>
    </div>
  );
}