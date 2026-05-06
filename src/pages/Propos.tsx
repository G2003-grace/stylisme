const Propos = () => {
  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a]">

    
      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Notre histoire</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
          À propos
        </h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Styliste passionné, je conçois des tenues uniques alliant créativité,
          précision et élégance.
        </p>
      </section>

      
      <section className="py-20 px-10 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <img
            src="/WhatsApp%20Image%202026-04-28%20at%2012.21.17.jpeg"
            alt="styliste"
            className="w-full md:w-1/2 h-[500px] object-cover"
          />

          <div className="md:w-1/2">
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Mon parcours</p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-6">
              Une passion devenue métier
            </h2>
            <div className="w-12 h-px bg-[#C8A165] mb-6"></div>
            <p className="text-gray-600 leading-relaxed font-light mb-4">
              Avec plusieurs années d'expérience dans la mode, je réalise des créations
              sur mesure adaptées à chaque client.
            </p>
            <p className="text-gray-600 leading-relaxed font-light">
              Chaque pièce est pensée avec soin, dans le respect des traditions textiles
              et avec une vision résolument moderne.
            </p>
          </div>
        </div>
      </section>

      
      <section className="bg-[#2a2520] py-24 px-10 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Mes valeurs</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
            Ce qui me guide
          </h2>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mb-16"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">01</p>
              <h3 className="font-serif text-xl mb-3">Créativité</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Repousser les limites du style pour créer des pièces uniques.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">02</p>
              <h3 className="font-serif text-xl mb-3">Qualité</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Des matières premium et des finitions soignées dans le moindre détail.
              </p>
            </div>
            <div>
              <p className="font-serif text-3xl text-[#C8A165] mb-4">03</p>
              <h3 className="font-serif text-xl mb-3">Satisfaction</h3>
              <p className="text-gray-400 text-sm leading-relaxed font-light">
                Vous accompagner avec écoute jusqu'à votre tenue parfaite.
              </p>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-24 px-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Portfolio</p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold">
            Quelques réalisations
          </h2>
          <div className="w-16 h-px bg-[#C8A165] mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img
            src="/image1.jpeg"
            alt="realisation-1"
            className="w-full h-[450px] object-cover"
          />
          <img
            src="/image 2.jpeg"
            alt="realisation-2"
            className="w-full h-[450px] object-cover"
          />
          <img
            src="/image4.jpeg"
            alt="realisation-3"
            className="w-full h-[450px] object-cover"
            
          />
          <img
            src="/image3.jpeg"
            alt="realisation-4"
            className="w-full h-[450px] object-cover"
          />
          <img
            src="/image6.jpeg"
            alt="realisation-5"
            className="w-full h-[450px] object-cover"
          />
          <img
            src="/image7.jpeg"
            alt="realisation-6"
            className="w-full h-[450px] object-cover"
          />
        </div>
      </section>

      
      <section className="bg-[#2a2520] py-24 px-10 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Prêt à travailler avec moi ?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
          Discutons de votre projet sur mesure.
        </p>
        <button className="bg-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition">
          Me contacter
        </button>
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

export default Propos;
