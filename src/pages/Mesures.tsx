import { useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams, Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

const Mesures = () => {
  const [searchParams] = useSearchParams();
  const modele = searchParams.get("modele") ?? "";
  const prixCatalogue = searchParams.get("prix") ?? "";

  // Toutes les valeurs du formulaire dans un seul state
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    contact: "",
    tissu: "",
    budget: prixCatalogue,
    poitrine: "",
    taille: "",
    hanches: "",
    longueur: "",
    epaules: "",
    bras_long: "",
    bras_tour: "",
    cou: "",
    notes: "",
  });

  // État de la soumission : null = pas envoyé, "loading" = en cours, "success" / "error"
  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderId, setOrderId] = useState<number | null>(null);

  // Handler générique : met à jour le champ correspondant
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Convertit "45 000 FCFA" → 45000 (entier)
  const parsePrix = (s: string): number => {
    const digits = s.replace(/\D/g, "");
    return digits ? parseInt(digits, 10) : 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/orders/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: form.nom,
          prenom: form.prenom,
          email: form.email,
          contact: form.contact,
          modele: modele || "Sur mesure",
          tissu: form.tissu,
          prix: parsePrix(form.budget),
          mesures: {
            poitrine: form.poitrine,
            taille: form.taille,
            hanches: form.hanches,
            longueur: form.longueur,
            epaules: form.epaules,
            bras_long: form.bras_long,
            bras_tour: form.bras_tour,
            cou: form.cou,
            notes: form.notes,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Erreur lors de l'envoi");
      }

      setOrderId(data.idcommande);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  
  if (status === "success") {
    return (
      <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen flex items-center justify-center px-10">
        <div className="text-center max-w-2xl">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Confirmée</p>
          <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
            Commande enregistrée
          </h1>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg font-light leading-relaxed mb-2">
            Merci {form.prenom} ! Votre commande #{String(orderId).padStart(4, "0")} a bien été reçue.
          </p>
          <p className="text-gray-600 font-light mb-10">
            Nous vous contacterons à l'adresse <span className="text-[#1a1a1a]">{form.email}</span> sous 48 h.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/clients"
              className="bg-[#C8A165] text-white px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
            >
              Voir mon espace
            </Link>
            <Link
              to="/catalogue"
              className="border border-[#C8A165] text-[#C8A165] px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
            >
              Retour catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  
  const inputClass = "w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-[#C8A165] transition placeholder:text-gray-400";
  const labelClass = "text-xs tracking-[0.3em] uppercase text-gray-600 block mb-2";

  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen">

      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Confection sur mesure</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">Vos mesures</h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Renseignez vos mesures avec précision pour une coupe parfaite, à votre image.
        </p>

        {modele && (
          <div className="mt-10 inline-block border border-[#C8A165]/40 px-8 py-4">
            <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-1">Modèle sélectionné</p>
            <p className="font-serif text-xl">{modele}</p>
            {prixCatalogue && <p className="text-sm text-gray-600 mt-1">{prixCatalogue}</p>}
          </div>
        )}
      </section>

      <section className="pb-24 px-10 max-w-4xl mx-auto">
        <div className="bg-white p-10 md:p-14">
          <form className="space-y-10" onSubmit={handleSubmit}>

            
            <div>
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6">Vos coordonnées</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Prénom</label>
                  <input type="text" name="prenom" value={form.prenom} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nom</label>
                  <input type="text" name="nom" value={form.nom} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Téléphone</label>
                  <input type="tel" name="contact" value={form.contact} onChange={handleChange} required className={inputClass} />
                </div>
              </div>
            </div>

          
            <div>
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6">Tissu et budget</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Tissu souhaité</label>
                  <input type="text" name="tissu" value={form.tissu} onChange={handleChange} required placeholder="Ex : Wax bleu, soie ivoire..." className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Budget (FCFA)</label>
                  <input type="text" name="budget" value={form.budget} onChange={handleChange} required placeholder="Ex : 45 000" className={inputClass} />
                </div>
              </div>
            </div>

            
            <div>
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6">Mesures principales</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Tour de poitrine (cm)</label>
                  <input type="number" name="poitrine" value={form.poitrine} onChange={handleChange} placeholder="Ex : 90" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tour de taille (cm)</label>
                  <input type="number" name="taille" value={form.taille} onChange={handleChange} placeholder="Ex : 70" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tour de hanches (cm)</label>
                  <input type="number" name="hanches" value={form.hanches} onChange={handleChange} placeholder="Ex : 95" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Longueur totale (cm)</label>
                  <input type="number" name="longueur" value={form.longueur} onChange={handleChange} placeholder="Ex : 120" className={inputClass} />
                </div>
              </div>
            </div>

        
            <div>
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6">Mesures complémentaires</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Tour d'épaules (cm)</label>
                  <input type="number" name="epaules" value={form.epaules} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Longueur de bras (cm)</label>
                  <input type="number" name="bras_long" value={form.bras_long} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tour de bras (cm)</label>
                  <input type="number" name="bras_tour" value={form.bras_tour} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Tour de cou (cm)</label>
                  <input type="number" name="cou" value={form.cou} onChange={handleChange} className={inputClass} />
                </div>
              </div>
            </div>

            
            <div>
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6">Précisions</p>
              <div>
                <label className={labelClass}>Remarques particulières</label>
                <textarea
                  name="notes"
                  rows={4}
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Préférences de coupe, ajustements, occasion..."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            {/* MESSAGE D'ERREUR */}
            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 text-sm">
                {errorMsg || "Une erreur est survenue. Veuillez réessayer."}
              </div>
            )}

            {/* BOUTON */}
            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#C8A165] text-white px-12 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Envoi en cours..." : "Valider ma commande"}
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* GUIDE */}
      <section className="bg-[#2a2520] py-24 px-10 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Guide pratique</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">Comment bien se mesurer</h2>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">01</p>
              <h3 className="font-serif text-xl mb-3">Tenue adaptée</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Mesurez-vous en sous-vêtements ou avec une tenue ajustée pour plus de précision.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">02</p>
              <h3 className="font-serif text-xl mb-3">Mètre ruban</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Tenez le mètre bien horizontal, ni trop serré, ni trop lâche contre votre corps.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">03</p>
              <h3 className="font-serif text-xl mb-3">Aide bienvenue</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Demandez l'aide d'un proche pour les zones difficiles à atteindre seul(e).
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              to="/contact"
              className="inline-block border border-[#C8A165] text-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
            >
              Besoin d'aide ? Contactez-nous
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
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
            <p className="text-gray-400 text-sm mb-2">+229 97454142</p>
            <p className="text-gray-400 text-sm">Cotonou, Bénin</p>
          </div>

          <div>
            <h4 className="text-[#C8A165] tracking-[0.3em] uppercase text-xs mb-5">Suivez-nous</h4>
            <p className="text-gray-400 text-sm mb-2">Instagram</p>
            <p className="text-gray-400 text-sm mb-2">Facebook</p>
            <p className="text-gray-400 text-sm">WhatsApp</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
          © 2026 SamStyle — Tous droits réservés
        </div>
      </footer>

    </div>
  );
};

export default Mesures;
