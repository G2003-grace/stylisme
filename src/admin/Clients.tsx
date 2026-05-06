import { useEffect, useState } from "react";
import { adminFetch } from "./api";

type Client = {
  idclient: number;
  nom: string;
  prenom: string;
  email: string;
  contact: string;
  orders_count: number;
};

const Clients = () => {

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    adminFetch("/clients")
      .then((res) => {
        if (!res.ok) throw new Error("Échec du chargement");
        return res.json();
      })
      .then((data: Client[]) => setClients(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="mb-10">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">Carnet</p>
        <h1 className="font-serif text-4xl text-[#1a1a1a]">Clients</h1>
      </div>

      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && clients.length === 0 && (
        <p className="text-gray-500">Aucun client pour le moment.</p>
      )}

      {!loading && !error && clients.length > 0 && (
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Nom</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Email</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Téléphone</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Commandes</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr key={client.idclient} className="border-b border-gray-100 hover:bg-[#FAF6F0]/50 transition">
                  <td className="px-6 py-5 font-serif">{client.prenom} {client.nom}</td>
                  <td className="px-6 py-5 text-gray-600">{client.email}</td>
                  <td className="px-6 py-5 text-gray-600">{client.contact}</td>
                  <td className="px-6 py-5 font-serif text-[#C8A165]">{client.orders_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Clients;
