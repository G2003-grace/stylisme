import { Link } from "react-router-dom";

const Experiences = () => {

  const experiences = [
    {
      year: "2018",
      title: "Création de tenues d'événements",
      description:
        "Réalisation de tenues sur mesure pour mariages, soirées de gala et grandes cérémonies. Chaque pièce est conçue pour sublimer le porteur lors des moments les plus précieux.",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.22.04.jpeg",
    },
    {
      year: "2021",
      title: "Collaboration avec des marques locales",
      description:
        "Participation à des projets communs avec des stylistes et marques émergentes au Bénin et au-delà. Une démarche collective pour faire rayonner la mode africaine contemporaine.",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.24.24.jpeg",
    },
    {
      year: "2023",
      title: "Collections personnalisées",
      description:
        "Conception de capsules sur mesure pour une clientèle exigeante : pièces uniques, finitions soignées, et un dialogue constant entre tradition textile et coupe moderne.",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.21.17.jpeg",
    },
  ];

  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen">

      
      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Notre savoir-faire</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
          Mes expériences
        </h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Quelques projets et réalisations qui témoignent d'un parcours
          construit avec passion et rigueur.
        </p>
      </section>

      
      <section className="bg-[#2a2520] py-20 px-10 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <p className="font-serif text-5xl md:text-6xl text-[#C8A165] mb-3">8+</p>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400">Années d'expérience</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-[#C8A165] mb-3">200+</p>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400">Créations livrées</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-[#C8A165] mb-3">150+</p>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400">Clients satisfaits</p>
          </div>
          <div>
            <p className="font-serif text-5xl md:text-6xl text-[#C8A165] mb-3">15+</p>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400">Événements habillés</p>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Parcours</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Étapes marquantes
          </h2>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mt-6"></div>
        </div>

        <div className="space-y-24">
          {experiences.map((exp, index: number) => {
            const reversed = index % 2 === 1;
            return (
              <div
                key={index}
                className={`flex flex-col ${reversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16`}
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full md:w-1/2 h-[500px] object-cover"
                />
                <div className="md:w-1/2">
                  <p className="font-serif text-5xl text-[#C8A165] mb-4">{exp.year}</p>
                  <h3 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
                    {exp.title}
                  </h3>
                  <div className="w-12 h-px bg-[#C8A165] mb-6"></div>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {exp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      
      <section className="bg-[#2a2520] py-24 px-10 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Envie de travailler ensemble ?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
          Confiez-moi votre projet et donnons-lui vie avec élégance.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/contact"
            className="bg-[#C8A165] text-white px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
          >
            Me contacter
          </Link>
          <Link
            to="/catalogue"
            className="border border-[#C8A165] text-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
          >
            Voir le catalogue
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

        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
          © 2026 SamStyle — Tous droits réservés
        </div>
      </footer>

    </div>
  );
};

export default Experiences;
