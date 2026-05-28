import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

type OrderStatus = "En cours" | "En préparation" | "Terminé" | "Livré";

type Order = {
  idcommande: number;
  modele: string;
  tissu: string;
  prix: number;
  statut: OrderStatus;
  date_commande: string;
  date_livraison: string | null;
  client_prenom: string;
  client_nom: string;
};

const Clients = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchedEmail, setSearchedEmail] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrders(null);
    try {
      const res = await fetch(
        `${API_URL}/orders/by-email/${encodeURIComponent(email.trim().toLowerCase())}`
      );
      if (!res.ok) throw new Error("Impossible de récupérer vos commandes");
      const data: Order[] = await res.json();
      setOrders(data);
      setSearchedEmail(email.trim());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const statusDot = (status: OrderStatus) => {
    switch (status) {
      case "En cours": return "bg-[#C8A165]";
      case "En préparation": return "bg-blue-400";
      case "Terminé": return "bg-emerald-500";
      case "Livré": return "bg-gray-400";
    }
  };

  const stats = orders
    ? [
        { value: orders.filter(o => o.statut === "En cours" || o.statut === "En préparation").length, label: "Commandes actives" },
        { value: orders.filter(o => o.statut === "Terminé").length, label: "Prêtes à retirer" },
        { value: orders.filter(o => o.statut === "Livré").length, label: "Livrées" },
        { value: orders.length, label: "Total" },
      ]
    : [];

  const reset = () => {
    setOrders(null);
    setEmail("");
    setSearchedEmail("");
    setError("");
  };

  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen">

      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#c8a165] text-xs tracking-[0.4em] uppercase mb-4">Espace privé</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
          Mon espace client
        </h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Saisissez l'email que vous avez utilisé lors de votre commande pour suivre son évolution.
        </p>
      </section>

      {/* Formulaire de lookup */}
      {orders === null && (
        <section className="px-10 max-w-xl mx-auto pb-12">
          <form onSubmit={handleSubmit} className="bg-white p-10">
            <label className="text-xs tracking-[0.3em] uppercase text-gray-600 block mb-3">Votre email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="vous@exemple.com"
              className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-[#C8A165] transition"
            />
            {error && (
              <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full bg-[#C8A165] text-white py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition disabled:opacity-50"
            >
              {loading ? "Recherche..." : "Voir mes commandes"}
            </button>
          </form>
        </section>
      )}

      {/* Résultats */}
      {orders !== null && (
        <>
          <section className="px-10 max-w-6xl mx-auto -mt-4 mb-6 text-center">
            <p className="text-sm text-gray-600 font-light">
              Commandes liées à <span className="text-[#1a1a1a]">{searchedEmail}</span>
              {" · "}
              <button onClick={reset} className="text-[#C8A165] hover:underline">
                changer d'email
              </button>
            </p>
          </section>

          {orders.length > 0 && (
            <section className="px-10 max-w-6xl mx-auto mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#1a1a1a]/10">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-8 text-center">
                    <p className="font-serif text-4xl text-[#C8A165] mb-2">{stat.value}</p>
                    <p className="text-xs tracking-[0.3em] uppercase text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="pb-24 px-10 max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">Historique</p>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold">
                  Vos commandes
                </h2>
              </div>
              <Link
                to="/catalogue"
                className="hidden md:inline-block border border-[#C8A165] text-[#C8A165] px-6 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
              >
                Nouvelle commande
              </Link>
            </div>

            {orders.length === 0 ? (
              <div className="bg-white p-12 text-center">
                <p className="text-gray-500 font-light mb-6">
                  Aucune commande trouvée pour cet email.
                </p>
                <Link
                  to="/catalogue"
                  className="inline-block bg-[#C8A165] text-white px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
                >
                  Découvrir le catalogue
                </Link>
              </div>
            ) : (
              <div className="bg-white overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">N°</th>
                      <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Modèle</th>
                      <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Date</th>
                      <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.idcommande} className="border-b border-gray-100 hover:bg-[#FAF6F0]/50 transition">
                        <td className="px-6 py-6 font-serif text-lg">#{String(order.idcommande).padStart(4, "0")}</td>
                        <td className="px-6 py-6 font-serif">{order.modele}</td>
                        <td className="px-6 py-6 text-sm text-gray-600 tracking-wide">
                          {new Date(order.date_commande).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-3">
                            <span className={`h-2 w-2 rounded-full ${statusDot(order.statut)}`}></span>
                            <span className="text-xs tracking-[0.2em] uppercase">{order.statut}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </>
      )}

      <section className="bg-[#2a2520] py-24 px-10 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Besoin d'une nouvelle tenue ?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
          Découvrez le catalogue ou faites façonner votre propre modèle.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/catalogue"
            className="bg-[#C8A165] text-white px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
          >
            Voir le catalogue
          </Link>
          <Link
            to="/contact"
            className="border border-[#C8A165] text-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
          >
            Me contacter
          </Link>
        </div>
      </section>

      <footer className="bg-[#1a1a1a] text-white py-16 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="md:max-w-xs">
            <div className="flex items-center gap-4">
              <img
                src="/WhatsApp%20Image%202026-04-28%20at%2012.02.27.jpeg"
                alt="SamStyle"
                className="h-16 w-16 object-cover rounded-full ring-2 ring-[#C8A165]"
              />
              <h3 className="font-serif text-xl">SamStyle</h3>
            </div>
            <p className="text-gray-400 text-sm mt-5 leading-relaxed font-light">
              Maison de couture spécialisée dans les créations sur mesure et l'élégance intemporelle.
            </p>
          </div>

          <div>
            <h4 className="text-[#C8A165] tracking-[0.3em] uppercase text-xs mb-5">Contact</h4>
            <p className="text-gray-400 text-sm mb-2">adandedjansamuel@gmail.com</p>
            <a href="tel:+2290197454142" className="block text-gray-400 text-sm mb-2 hover:text-[#C8A165] transition">+229 0197454142</a>
            <p className="text-gray-400 text-sm">Cotonou, Bénin</p>
          </div>

          <div>
            <h4 className="text-[#C8A165] tracking-[0.3em] uppercase text-xs mb-5">Suivez-nous</h4>
            <p className="text-gray-400 text-sm mb-2">Instagram</p>
            <p className="text-gray-400 text-sm mb-2">Facebook</p>
            <p className="text-gray-400 text-sm">WhatsApp</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-gray-500 text-xs tracking-[0.3em] uppercase">
          <span>© 2026 SamStyle — Tous droits réservés</span>
          <Link
            to="/admin"
            className="text-gray-600 hover:text-[#C8A165] transition"
          >
            Administration
          </Link>
        </div>
      </footer>

    </div>
  );
};

export default Clients;
