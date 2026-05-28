import { useState, type ChangeEvent, type FormEvent } from "react";

const Contact = () => {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Contact SamStyle — ${form.nom || "Sans nom"}`;
    const body = `${form.message}\n\n—\n${form.nom}\n${form.email}`;
    window.location.href = `mailto:adandedjansamuel@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen">

      
      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Restons en contact</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
          Contact
        </h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Une idée, un projet sur mesure ? Échangeons ensemble pour donner vie à votre style.
        </p>
      </section>

      
      <section className="pb-24 px-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

          
          <div>
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Coordonnées</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              Nous trouver
            </h2>
            <div className="w-12 h-px bg-[#C8A165] mb-10"></div>

            <div className="space-y-8">
              <div>
                <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Email</p>
                <p className="text-gray-700">adandedjansamuel@gmail.com</p>
              </div>
              <div>
                <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Téléphone</p>
                <a href="tel:+2290197454142" className="text-gray-700 hover:text-[#C8A165] transition">+229 0197454142</a>
              </div>
              <div>
                <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Atelier</p>
                <p className="text-gray-700">Cotonou, Bénin</p>
              </div>
              <div>
                <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">Horaires</p>
                <p className="text-gray-700">Lun – Sam : 9h – 19h</p>
              </div>
            </div>
          </div>

          
          <div>
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Message</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-8">
              Écrivez-nous
            </h2>
            <div className="w-12 h-px bg-[#C8A165] mb-10"></div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="text-xs tracking-[0.3em] uppercase text-gray-600 block mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={form.nom}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-[#C8A165] transition"
                />
              </div>

              <div>
                <label className="text-xs tracking-[0.3em] uppercase text-gray-600 block mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-[#C8A165] transition"
                />
              </div>

              <div>
                <label className="text-xs tracking-[0.3em] uppercase text-gray-600 block mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-transparent border-b border-gray-400 py-2 focus:outline-none focus:border-[#C8A165] transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="bg-[#C8A165] text-white px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition mt-4"
              >
                Envoyer
              </button>
            </form>
          </div>
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

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
          © 2026 SamStyle — Tous droits réservés
        </div>
      </footer>

    </div>
  );
};

export default Contact;
