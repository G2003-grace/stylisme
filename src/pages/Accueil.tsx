import { Link } from 'react-router-dom'

const Accueil = () => {

  const products = [
    {
      name: "Robe sirène en wax",
      price: "45 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.21.17.jpeg",
    },
    {
      name: "Robe de soirée à volants",
      price: "50 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.21.17%20(1).jpeg",
    },
    {
      name: "Ensemble homme rouge",
      price: "35 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.22.04%20(1).jpeg",
    },
    {
      name: "Ensemble homme bleu nuit",
      price: "30 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.24.43%20(1).jpeg",
    },
  ];

  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a]">

      
      <section className="relative h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
        <img
          src="/WhatsApp%20Image%202026-04-28%20at%2012.02.27.jpeg"
          alt="SamStyle"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 px-6 max-w-3xl">
          <p className="text-[#C8A165] text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            Maison de couture
          </p>
          <h1 className="font-serif text-5xl md:text-7xl font-semibold leading-tight mb-6">
            L'élégance au fil<br />de vos envies
          </h1>
          <p className="text-base md:text-lg max-w-xl mx-auto text-gray-200 font-light">
            Créations sur mesure, pièces uniques façonnées pour vous.
          </p>

          <div className="mt-10 flex gap-4 justify-center flex-wrap">
            <Link
              to="/catalogue"
              className="bg-[#C8A165] text-white px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
            >
              Voir le catalogue
            </Link>
            <Link
              to="/catalogue"
              className="border border-[#C8A165] text-[#C8A165] px-8 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
            >
              Commander
            </Link>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Collection</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Nos dernières créations
          </h2>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index: number) => (
            <div key={index} className="group">
              <div className="overflow-hidden bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-96 w-full object-contain bg-[#FAF6F0] group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="pt-5 text-center">
                <h3 className="font-serif text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-[#C8A165] tracking-[0.2em]">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-[#2a2520] py-24 px-10 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Notre engagement</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Pourquoi me choisir ?
          </h2>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">01</p>
              <h3 className="font-serif text-xl mb-3">Qualité premium</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Tissus soigneusement sélectionnés pour des finitions impeccables.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">02</p>
              <h3 className="font-serif text-xl mb-3">Sur mesure</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Chaque pièce est conçue à vos mesures, pour votre style unique.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">03</p>
              <h3 className="font-serif text-xl mb-3">Savoir-faire</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Des années d'expérience au service de votre élégance.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <Link
              to="/experiences"
              className="inline-block border border-[#C8A165] text-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition"
            >
              Voir mes expériences
            </Link>
          </div>
        </div>
      </section>


      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-8">Ils témoignent</p>
        <p className="font-serif italic text-2xl md:text-3xl leading-relaxed text-[#1a1a1a]">
          « Avec SamStyle, j'ai été très satisfait de mes commandes. Vous pouvez lui faire confiance ! »
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <div className="w-12 h-px bg-[#C8A165]"></div>
          <p className="text-xs tracking-[0.3em] uppercase text-[#C8A165]">Cliente</p>
          <div className="w-12 h-px bg-[#C8A165]"></div>
        </div>
      </section>

      {/* FORMATION JUIN */}
      <section className="bg-[#F5EBD8] py-24 px-10 border-t border-b border-[#C8A165]/30">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <p className="inline-block bg-[#C8A165] text-white text-xs tracking-[0.4em] uppercase px-4 py-2 mb-6">
              Nouveau · Session de juin
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4 text-[#1a1a1a]">
              Apprenez la couture <br className="hidden md:block" />avec SamStyle
            </h2>
            <div className="w-16 h-px bg-[#C8A165] mx-auto mb-6"></div>
            <p className="text-gray-700 max-w-2xl mx-auto font-light leading-relaxed">
              Une formation pratique pour découvrir les bases de la couture moderne et traditionnelle :
              prise de mesures, coupe, assemblage et finitions. Petits groupes, accompagnement personnalisé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            <div className="bg-white p-8 text-center border border-[#C8A165]/20">
              <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-3">Période</p>
              <p className="font-serif text-2xl text-[#1a1a1a] mb-1">Juin 2026</p>
              <p className="text-sm text-gray-600 font-light">Du lundi au vendredi</p>
            </div>

            <div className="bg-white p-8 text-center border border-[#C8A165]/20">
              <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-3">Lieu</p>
              <p className="font-serif text-2xl text-[#1a1a1a] mb-1">Atelier SamStyle</p>
              <p className="text-sm text-gray-600 font-light">Cotonou, Bénin</p>
            </div>

            <div className="bg-white p-8 text-center border border-[#C8A165]/20">
              <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-3">Places</p>
              <p className="font-serif text-2xl text-[#1a1a1a] mb-1">Limitées</p>
              <p className="text-sm text-gray-600 font-light">Inscription requise</p>
            </div>

          </div>

          <div className="bg-white p-10 md:p-12 border border-[#C8A165]/20">
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-6 text-center">Au programme</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5 max-w-3xl mx-auto">
              <div className="flex gap-3">
                <span className="text-[#C8A165] font-serif">01</span>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Initiation à la machine à coudre et entretien
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C8A165] font-serif">02</span>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Prise de mesures et lecture de patrons
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C8A165] font-serif">03</span>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Coupe sur tissu wax, soie et coton
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C8A165] font-serif">04</span>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Assemblage, ourlets et finitions
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C8A165] font-serif">05</span>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Réalisation d'une pièce complète
                </p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#C8A165] font-serif">06</span>
                <p className="text-gray-700 font-light text-sm leading-relaxed">
                  Conseils pour lancer son activité
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/inscription"
              className="inline-block bg-[#1a1a1a] text-white px-12 py-4 tracking-[0.25em] uppercase text-xs hover:bg-[#C8A165] transition mr-3 mb-3"
            >
              Je m'inscris · 5 000 FCFA
            </Link>
            <a
              href="tel:+22997454142"
              className="inline-block border border-[#C8A165] text-[#C8A165] px-12 py-4 tracking-[0.25em] uppercase text-xs hover:bg-[#C8A165] hover:text-white transition mb-3"
            >
              Plus d'infos · Appeler
            </a>
          </div>

        </div>
      </section>

  
      <section className="bg-[#2a2520] py-24 px-10 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Prêt à créer votre tenue ?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
          Donnons vie à votre vision ensemble.
        </p>
        <Link
          to="/catalogue"
          className="inline-block bg-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
        >
          Commander maintenant
        </Link>
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
            <a href="tel:+22997454142" className="block text-gray-400 text-sm mb-2 hover:text-[#C8A165] transition">+229 97454142</a>
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

export default Accueil;
