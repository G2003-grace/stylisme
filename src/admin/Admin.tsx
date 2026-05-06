import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { adminFetch } from "./api";

const Admin = () => {
  const navigate = useNavigate();

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-3 rounded transition tracking-[0.15em] uppercase text-xs ${
      isActive
        ? "bg-[#C8A165]/15 text-[#C8A165] border-l-2 border-[#C8A165]"
        : "text-gray-300 hover:text-white hover:bg-white/5"
    }`;

  const handleLogout = async () => {
    // On essaie d'invalider côté serveur, mais on déconnecte localement quoi qu'il arrive
    try {
      await adminFetch("/admin/logout", { method: "POST" });
    } catch {
      // ignore : on déconnecte de toute façon
    }
    localStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="flex min-h-screen bg-[#FAF6F0]">

      <aside className="w-64 bg-[#1a1a1a] text-white p-6 border-r border-[#C8A165]/20 flex flex-col">
        <div className="mb-12">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-1">
            SamStyle
          </p>
          <h2 className="font-serif text-2xl">Administration</h2>
        </div>

        <nav className="space-y-1 flex-1">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/commandes" className={linkClass}>
            Commandes
          </NavLink>
          <NavLink to="/admin/clients" className={linkClass}>
            Clients
          </NavLink>
          <NavLink to="/admin/produits" className={linkClass}>
            Produits
          </NavLink>
        </nav>

        {/* Pied de sidebar : déconnexion */}
        <button
          onClick={handleLogout}
          className="mt-8 px-4 py-3 text-xs tracking-[0.15em] uppercase text-gray-400 hover:text-[#C8A165] hover:bg-white/5 rounded transition text-left"
        >
          Déconnexion
        </button>
      </aside>

      <main className="flex-1 p-10">
        <Outlet />
      </main>

    </div>
  );
};

export default Admin;
