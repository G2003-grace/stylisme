import { Fragment, useEffect, useState } from "react";
import { adminFetch } from "./api";

type InscriptionStatus = "En attente" | "Payée" | "Confirmée" | "Annulée";

type Inscription = {
  idinscription: number;
  prenom: string;
  nom: string;
  email: string;
  contact: string;
  niveau: string;
  motivation: string | null;
  session: string;
  prix: number;
  statut: InscriptionStatus;
  date_inscription: string;
};

const Inscriptions = () => {

  const [list, setList] = useState<Inscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    adminFetch("/inscriptions")
      .then((res) => {
        if (!res.ok) throw new Error("Échec du chargement");
        return res.json();
      })
      .then((data: Inscription[]) => setList(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: number, newStatus: InscriptionStatus) => {
    const previous = list;
    setList((prev) =>
      prev.map((i) =>
        i.idinscription === id ? { ...i, statut: newStatus } : i
      )
    );

    try {
      const res = await adminFetch(`/inscriptions/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ statut: newStatus }),
      });
      if (!res.ok) throw new Error("Échec de la mise à jour");
    } catch {
      setList(previous);
      alert("Impossible de changer le statut.");
    }
  };

  const statusDot = (status: InscriptionStatus) => {
    switch (status) {
      case "En attente": return "bg-[#C8A165]";
      case "Payée": return "bg-blue-400";
      case "Confirmée": return "bg-emerald-500";
      case "Annulée": return "bg-red-400";
    }
  };

  // Statistiques rapides
  const stats = {
    total: list.length,
    enAttente: list.filter((i) => i.statut === "En attente").length,
    payees: list.filter((i) => i.statut === "Payée" || i.statut === "Confirmée").length,
    revenu: list
      .filter((i) => i.statut === "Payée" || i.statut === "Confirmée")
      .reduce((sum, i) => sum + i.prix, 0),
  };

  return (
    <>
      <div className="mb-10">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">Formation</p>
        <h1 className="font-serif text-4xl text-[#1a1a1a]">Inscriptions</h1>
      </div>

      {/* Stats */}
      {!loading && !error && list.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white p-6 border-l-2 border-[#C8A165]">
            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Total</p>
            <p className="font-serif text-3xl">{stats.total}</p>
          </div>
          <div className="bg-white p-6 border-l-2 border-[#C8A165]">
            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">En attente</p>
            <p className="font-serif text-3xl">{stats.enAttente}</p>
          </div>
          <div className="bg-white p-6 border-l-2 border-emerald-500">
            <p className="text-emerald-600 text-xs tracking-[0.3em] uppercase mb-2">Payées</p>
            <p className="font-serif text-3xl">{stats.payees}</p>
          </div>
          <div className="bg-white p-6 border-l-2 border-[#C8A165]">
            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Revenu</p>
            <p className="font-serif text-2xl text-[#C8A165]">
              {stats.revenu.toLocaleString("fr-FR")} FCFA
            </p>
          </div>
        </div>
      )}

      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && list.length === 0 && (
        <p className="text-gray-500">Aucune inscription pour le moment.</p>
      )}

      {!loading && !error && list.length > 0 && (
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">N°</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Inscrit</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Contact</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Niveau</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Session</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Prix</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Statut</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Action</th>
              </tr>
            </thead>

            <tbody>
              {list.map((insc) => (
                <Fragment key={insc.idinscription}>
                  <tr
                    onClick={() =>
                      setExpanded(expanded === insc.idinscription ? null : insc.idinscription)
                    }
                    className="border-b border-gray-100 hover:bg-[#FAF6F0]/50 transition cursor-pointer"
                  >
                    <td className="px-6 py-5 font-serif">
                      #{String(insc.idinscription).padStart(4, "0")}
                    </td>
                    <td className="px-6 py-5">
                      <p className="font-serif">{insc.prenom} {insc.nom}</p>
                      <p className="text-xs text-gray-500 mt-1">{insc.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <a
                        href={`tel:${insc.contact.replace(/\s/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-[#1a1a1a] hover:text-[#C8A165] transition"
                      >
                        {insc.contact}
                      </a>
                    </td>
                    <td className="px-6 py-5 text-sm">{insc.niveau}</td>
                    <td className="px-6 py-5 text-sm">{insc.session}</td>
                    <td className="px-6 py-5 font-serif text-[#C8A165]">
                      {insc.prix.toLocaleString("fr-FR")} FCFA
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${statusDot(insc.statut)}`}></span>
                        <span className="text-xs tracking-[0.2em] uppercase">{insc.statut}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={insc.statut}
                        onChange={(e) =>
                          updateStatus(insc.idinscription, e.target.value as InscriptionStatus)
                        }
                        className="border border-gray-200 px-3 py-2 text-xs tracking-widest uppercase focus:outline-none focus:border-[#C8A165] transition"
                      >
                        <option>En attente</option>
                        <option>Payée</option>
                        <option>Confirmée</option>
                        <option>Annulée</option>
                      </select>
                    </td>
                  </tr>

                  {/* Ligne déployée : motivation */}
                  {expanded === insc.idinscription && (
                    <tr className="bg-[#FAF6F0]/40 border-b border-gray-100">
                      <td colSpan={8} className="px-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Motivation</p>
                            <p className="text-sm text-gray-700 font-light leading-relaxed whitespace-pre-line">
                              {insc.motivation || <span className="italic text-gray-400">Aucune motivation indiquée.</span>}
                            </p>
                          </div>
                          <div>
                            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Date d'inscription</p>
                            <p className="text-sm text-gray-700 font-light">
                              {new Date(insc.date_inscription).toLocaleString("fr-FR", {
                                dateStyle: "long",
                                timeStyle: "short",
                              })}
                            </p>
                            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mt-4 mb-2">Référence paiement</p>
                            <p className="text-sm font-serif text-[#1a1a1a]">
                              FORM-{String(insc.idinscription).padStart(4, "0")}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Inscriptions;
