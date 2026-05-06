import { useEffect, useState } from "react";
import { adminFetch } from "./api";

type OrderStatus = "En cours" | "En préparation" | "Terminé" | "Livré";

type Order = {
  idcommande: number;
  statut: OrderStatus;
  prix: number;
};

const Dashboard = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch("/orders")
      .then((res) => {
        if (!res.ok) throw new Error("Échec du chargement");
        return res.json();
      })
      .then((data: Order[]) => setOrders(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total commandes", value: orders.length },
    { label: "En cours", value: orders.filter(o => o.statut === "En cours").length },
    { label: "En préparation", value: orders.filter(o => o.statut === "En préparation").length },
    { label: "Terminées", value: orders.filter(o => o.statut === "Terminé").length },
    { label: "Livrées", value: orders.filter(o => o.statut === "Livré").length },
  ];

  // Chiffre d'affaires : somme des prix des commandes terminées + livrées
  const revenue = orders
    .filter(o => o.statut === "Terminé" || o.statut === "Livré")
    .reduce((sum, o) => sum + o.prix, 0);

  return (
    <>
      <div className="mb-10">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">
          Vue d'ensemble sur la progression des commandes
        </p>
        <h1 className="font-serif text-4xl text-[#1a1a1a]">Dashboard</h1>
      </div>

      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-[#1a1a1a]/10 mb-10">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white p-8 text-center">
                <p className="font-serif text-4xl text-[#C8A165] mb-2">{stat.value}</p>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Chiffre d'affaires (réalisé) */}
          <div className="bg-[#1a1a1a] text-white p-10 text-center">
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-3">
              Chiffre d'affaires réalisé
            </p>
            <p className="font-serif text-5xl">
              {revenue.toLocaleString("fr-FR")} <span className="text-2xl text-[#C8A165]">FCFA</span>
            </p>
            <p className="text-gray-400 text-xs tracking-[0.2em] uppercase mt-3">
              Commandes terminées + livrées
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
