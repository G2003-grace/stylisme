import { useEffect, useState } from "react";
import { adminFetch } from "./api";

type OrderStatus = "En cours" | "En préparation" | "Terminé" | "Livré";

type Order = {
  idcommande: number;
  idclient: number;
  client_nom: string;
  client_email: string;
  modele: string;
  tissu: string;
  prix: number;
  statut: OrderStatus;
  date_commande: string;
};

const Commandes = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Charge les commandes au montage du composant
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

  // Change le statut d'une commande : envoie au backend, puis met à jour l'état local
  const updateStatus = async (id: number, newStatus: OrderStatus) => {
    // Optimisme : on met à jour l'UI immédiatement, on roll back si erreur
    const previous = orders;
    setOrders((prev) =>
      prev.map((o) => (o.idcommande === id ? { ...o, statut: newStatus } : o))
    );

    try {
      const res = await adminFetch(`/orders/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ statut: newStatus }),
      });
      if (!res.ok) throw new Error("Échec de la mise à jour");
    } catch {
      setOrders(previous);
      alert("Impossible de changer le statut.");
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

  return (
    <>
      <div className="mb-10">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">Suivi</p>
        <h1 className="font-serif text-4xl text-[#1a1a1a]">Commandes</h1>
      </div>

      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-gray-500">Aucune commande pour le moment.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">N°</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Client</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Modèle</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Prix</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Statut</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.idcommande} className="border-b border-gray-100 hover:bg-[#FAF6F0]/50 transition">
                  <td className="px-6 py-5 font-serif">#{String(order.idcommande).padStart(4, "0")}</td>
                  <td className="px-6 py-5 font-serif">{order.client_nom}</td>
                  <td className="px-6 py-5">{order.modele}</td>
                  <td className="px-6 py-5 font-serif text-[#C8A165]">
                    {order.prix.toLocaleString("fr-FR")} FCFA
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <span className={`h-2 w-2 rounded-full ${statusDot(order.statut)}`}></span>
                      <span className="text-xs tracking-[0.2em] uppercase">{order.statut}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <select
                      value={order.statut}
                      onChange={(e) =>
                        updateStatus(order.idcommande, e.target.value as OrderStatus)
                      }
                      className="border border-gray-200 px-3 py-2 text-xs tracking-widest uppercase focus:outline-none focus:border-[#C8A165] transition"
                    >
                      <option>En cours</option>
                      <option>En préparation</option>
                      <option>Terminé</option>
                      <option>Livré</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Commandes;
