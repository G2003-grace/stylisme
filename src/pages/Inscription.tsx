import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000";
const PRIX_FORMATION = 5000; // FCFA

const Inscription = () => {

  const [form, setForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    contact: "",
    niveau: "Débutant",
    motivation: "",
  });

  const [status, setStatus] = useState<null | "loading" | "success" | "error">(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [inscriptionId, setInscriptionId] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const paymentMethods = [
    { name: "MTN Mobile Money", number: "+229 0197454142", tel: "+2290197454142", copy: "0197454142", color: "#FFCC00" },
    { name: "Moov Money", number: "+229 0197454142", tel: "+2290197454142", copy: "0197454142", color: "#0066B3" },
    { name: "Celtiis Cash", number: "+229 0197454142", tel: "+2290197454142", copy: "0197454142", color: "#E30613" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleCopy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* ignore */
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API_URL}/inscriptions/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prenom: form.prenom,
          nom: form.nom,
          email: form.email,
          contact: form.contact,
          niveau: form.niveau,
          motivation: form.motivation,
          session: "Juin 2026",
          prix: PRIX_FORMATION,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur lors de l'envoi");

      setInscriptionId(data.idinscription);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg((err as Error).message);
    }
  };

  // ÉCRAN DE CONFIRMATION
  if (status === "success") {
    return (
      <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen py-20 px-6">
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Inscription enregistrée</p>
            <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
              Bienvenue {form.prenom} !
            </h1>
            <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
            <p className="text-gray-600 text-lg font-light leading-relaxed mb-2">
              Votre inscription #{String(inscriptionId).padStart(4, "0")} à la formation est enregistrée.
            </p>
            <p className="text-gray-600 font-light">
              Pour confirmer votre place, finalisez le paiement ci-dessous.
            </p>
          </div>

          {/* PAIEMENT */}
          <div className="bg-white border border-[#C8A165]/30 p-8 md:p-12">
            <div className="text-center mb-10">
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Paiement</p>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-3">
                Frais d'inscription
              </h2>
              <div className="w-12 h-px bg-[#C8A165] mx-auto mb-6"></div>
              <p className="text-gray-700 text-sm">
                Montant à envoyer&nbsp;:{" "}
                <span className="font-serif text-3xl text-[#C8A165] tracking-wide">
                  5 000 FCFA
                </span>
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Référence&nbsp;: <span className="text-[#1a1a1a] tracking-wider">FORM-{String(inscriptionId).padStart(4, "0")}</span>
              </p>
            </div>

            <div className="space-y-4">
              {paymentMethods.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between gap-4 border border-gray-200 hover:border-[#C8A165] transition px-5 py-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: m.color }}></span>
                    <div className="min-w-0">
                      <p className="text-xs tracking-[0.25em] uppercase text-gray-500 mb-1">{m.name}</p>
                      <a href={`tel:${m.tel}`} className="font-serif text-lg md:text-xl text-[#1a1a1a] hover:text-[#C8A165] transition truncate block">
                        {m.number}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <a href={`tel:${m.tel}`} className="hidden sm:inline-block text-[10px] tracking-[0.2em] uppercase border border-[#C8A165] text-[#C8A165] px-4 py-2 hover:bg-[#C8A165] hover:text-white transition">
                      Appeler
                    </a>
                    <button type="button" onClick={() => handleCopy(m.copy, m.name)} className="text-[10px] tracking-[0.2em] uppercase bg-[#1a1a1a] text-white px-4 py-2 hover:bg-[#C8A165] transition">
                      {copied === m.name ? "Copié ✓" : "Copier"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#FAF6F0] p-6 border-l-2 border-[#C8A165]">
              <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-3">Procédure</p>
              <ol className="text-sm text-gray-700 font-light leading-relaxed space-y-2 list-decimal list-inside">
                <li>Ouvrez votre application Mobile Money.</li>
                <li>Choisissez « Transfert d'argent » et entrez le numéro.</li>
                <li>Saisissez <span className="text-[#1a1a1a]">5 000 FCFA</span>, indiquez la référence <span className="text-[#1a1a1a]">FORM-{String(inscriptionId).padStart(4, "0")}</span> en motif.</li>
                <li>Validez. Vous recevrez un SMS de confirmation.</li>
                <li>Votre place sera confirmée par email sous 24 h.</li>
              </ol>
              <p className="text-xs text-gray-500 mt-4 italic">
                Une question ? Appelez le <a href="tel:+2290197454142" className="text-[#C8A165] hover:underline">+229 0197454142</a>.
              </p>
            </div>
          </div>

          <div className="mt-12 flex gap-4 justify-center flex-wrap">
            <Link to="/" className="bg-[#C8A165] text-white px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition">
              Retour accueil
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

      {/* HERO */}
      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Session de Juin 2026</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">Inscription</h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Réservez votre place pour la formation couture SamStyle. Petits groupes, accompagnement personnalisé.
        </p>

        <div className="mt-10 inline-block border border-[#C8A165]/40 px-8 py-4">
          <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-1">Frais d'inscription</p>
          <p className="font-serif text-3xl text-[#1a1a1a]">5 000 FCFA</p>
          <p className="text-xs text-gray-500 mt-1 font-light">Paiement par Mobile Money</p>
        </div>
      </section>

      {/* FORMULAIRE */}
      <section className="pb-24 px-10 max-w-3xl mx-auto">
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
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6">Votre profil</p>
              <div className="grid grid-cols-1 gap-8">
                <div>
                  <label className={labelClass}>Niveau en couture</label>
                  <select name="niveau" value={form.niveau} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
                    <option>Débutant</option>
                    <option>Quelques notions</option>
                    <option>Intermédiaire</option>
                    <option>Avancé</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Pourquoi cette formation ? (facultatif)</label>
                  <textarea
                    name="motivation"
                    rows={4}
                    value={form.motivation}
                    onChange={handleChange}
                    placeholder="Apprendre par passion, lancer une activité, perfectionner ma pratique..."
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* INFO PAIEMENT */}
            <div className="bg-[#FAF6F0] border-l-2 border-[#C8A165] p-6">
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-3">Paiement de l'inscription</p>
              <p className="text-sm text-gray-700 font-light leading-relaxed mb-3">
                Les frais d'inscription s'élèvent à <span className="font-serif text-lg text-[#1a1a1a]">5 000 FCFA</span>,
                à régler par <span className="text-[#1a1a1a]">MTN MoMo</span>,{" "}
                <span className="text-[#1a1a1a]">Moov Money</span> ou{" "}
                <span className="text-[#1a1a1a]">Celtiis Cash</span> sur le numéro&nbsp;:
              </p>
              <a href="tel:+2290197454142" className="font-serif text-xl text-[#1a1a1a] hover:text-[#C8A165] transition">
                +229 0197454142
              </a>
              <p className="text-xs text-gray-500 mt-3 italic font-light">
                Les instructions complètes vous seront affichées juste après la validation du formulaire.
              </p>
            </div>

            {status === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 text-sm">
                {errorMsg || "Une erreur est survenue. Veuillez réessayer."}
              </div>
            )}

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#C8A165] text-white px-12 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? "Envoi en cours..." : "Valider mon inscription"}
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* RAPPEL FORMATION */}
      <section className="bg-[#2a2520] py-24 px-10 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Au programme</p>
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">Ce que vous apprendrez</h2>
          <div className="w-12 h-px bg-[#C8A165] mx-auto mb-12"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div>
              <p className="font-serif text-2xl text-[#C8A165] mb-3">01</p>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                Initiation à la machine à coudre, entretien et matériel.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#C8A165] mb-3">02</p>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                Prise de mesures et lecture de patrons.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#C8A165] mb-3">03</p>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                Coupe sur tissu wax, soie et coton.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#C8A165] mb-3">04</p>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                Assemblage, ourlets et finitions soignées.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#C8A165] mb-3">05</p>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                Réalisation guidée d'une pièce complète.
              </p>
            </div>
            <div>
              <p className="font-serif text-2xl text-[#C8A165] mb-3">06</p>
              <p className="text-gray-300 font-light text-sm leading-relaxed">
                Conseils pour lancer son activité de couturier(ère).
              </p>
            </div>
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

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
          © 2026 SamStyle — Tous droits réservés
        </div>
      </footer>

    </div>
  );
};

export default Inscription;
