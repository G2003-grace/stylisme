import React, { useState } from "react";
import { Link } from "react-router-dom";

const Catalogue = () => {
  const collection = [
    {
      name: "Robe sirène en wax",
      category: "Femme",
      price: "45 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.21.17.jpeg",
    },
    {
      name: "Robe de soirée à volants",
      category: "Femme",
      price: "50 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.21.17%20(1).jpeg",
    },
     {
      name: "Robe de soirée sequinée",
      category: "Femme",
      price: "35 000 FCFA",
      image: "/image5.jpeg",
    },
    {
      name: "Tenue traditionnelle perlée",
      category: "Couple",
      price: "85 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.22.04.jpeg",
    },
   
    {
      name: "Ensemble homme rouge",
      category: "Homme",
      price: "35 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.22.04%20(1).jpeg",
    },
    {
      name: "Ensemble homme broderie or",
      category: "Homme",
      price: "55 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.24.24.jpeg",
    },
    {
      name: "Ensemble homme bleu nuit",
      category: "Homme",
      price: "30 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.24.43%20(1).jpeg",
    },
    {
      name: "Ensemble homme noir signature",
      category: "Homme",
      price: "45 000 FCFA",
      image: "/WhatsApp%20Image%202026-04-28%20at%2012.24.43.jpeg",
    },
  ];

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const resetUpload = () => {
    setPreviewImage(null);
    setFileName("");
  };

  return (
    <div className="bg-[#FAF6F0] text-[#1a1a1a] min-h-screen">

      
      <section className="py-24 px-10 text-center max-w-3xl mx-auto">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Notre collection</p>
        <h1 className="font-serif text-5xl md:text-6xl font-semibold mb-6">
          Catalogue
        </h1>
        <div className="w-16 h-px bg-[#C8A165] mx-auto mb-8"></div>
        <p className="text-gray-600 text-lg font-light leading-relaxed">
          Découvrez l'ensemble de nos créations sur mesure, alliant tradition et modernité.
        </p>
      </section>

      
      <section className="pb-24 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collection.map((item, index: number) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-96 w-full object-contain bg-[#FAF6F0] group-hover:scale-105 transition-transform duration-500"
                />
                <Link
                  to={`/mesures?modele=${encodeURIComponent(item.name)}&prix=${encodeURIComponent(item.price)}`}
                  className="absolute inset-x-0 bottom-0 bg-[#1a1a1a]/90 text-white text-center py-3 tracking-[0.2em] uppercase text-xs translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[#C8A165]"
                >
                  Choisir ce modèle
                </Link>
              </div>
              <div className="pt-5 text-center">
                <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">
                  {item.category}
                </p>
                <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                <p className="text-sm text-[#C8A165] tracking-[0.2em]">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      
      <section className="bg-white py-24 px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Sur mesure</p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
              Vous avez un modèle en tête ?
            </h2>
            <div className="w-16 h-px bg-[#C8A165] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Importez une photo de votre inspiration et nous la recréons à vos mesures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            
            <div>
              <label
                htmlFor="model-upload"
                className="block border-2 border-dashed border-[#C8A165]/40 hover:border-[#C8A165] transition cursor-pointer aspect-[3/4] bg-[#FAF6F0] overflow-hidden"
              >
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Aperçu de votre modèle"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="font-serif text-5xl text-[#C8A165] mb-4">+</p>
                    <p className="text-[#C8A165] text-xs tracking-[0.3em] uppercase mb-2">
                      Cliquez pour importer
                    </p>
                    <p className="text-gray-500 text-sm font-light">
                      JPG, PNG · 5 Mo max
                    </p>
                  </div>
                )}
              </label>
              <input
                id="model-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {fileName && (
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="text-gray-600 truncate">{fileName}</span>
                  <button
                    type="button"
                    onClick={resetUpload}
                    className="text-[#C8A165] tracking-[0.2em] uppercase hover:underline"
                  >
                    Retirer
                  </button>
                </div>
              )}
            </div>

            
            <div className="flex flex-col justify-center h-full">
              <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-4">Étapes</p>
              <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-6">
                Trois étapes simples
              </h3>
              <div className="w-12 h-px bg-[#C8A165] mb-8"></div>

              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <p className="font-serif text-2xl text-[#C8A165] leading-none">01</p>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Importez la photo de votre modèle d'inspiration.
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="font-serif text-2xl text-[#C8A165] leading-none">02</p>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Renseignez vos mesures précises pour une coupe parfaite.
                  </p>
                </div>
                <div className="flex gap-4">
                  <p className="font-serif text-2xl text-[#C8A165] leading-none">03</p>
                  <p className="text-gray-600 font-light leading-relaxed">
                    Recevez votre création unique, façonnée pour vous.
                  </p>
                </div>
              </div>

              {previewImage ? (
                <Link
                  to="/mesures?modele=Sur+mesure"
                  className="inline-block bg-[#C8A165] text-white text-center px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
                >
                  Continuer vers les mesures
                </Link>
              ) : (
                <button
                  type="button"
                  disabled
                  className="bg-[#C8A165] text-white px-10 py-4 tracking-[0.2em] uppercase text-xs opacity-40 cursor-not-allowed"
                >
                  Importez d'abord votre modèle
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-[#2a2520] py-24 px-10 text-center text-white">
        <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4">
          Une création sur mesure ?
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-10 font-light">
          Confiez-moi votre vision, je la fais vivre.
        </p>
        <Link
          to="/contact"
          className="inline-block bg-[#C8A165] px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition"
        >
          Me contacter
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

export default Catalogue;
