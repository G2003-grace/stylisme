type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const Produits = () => {

  const products: Product[] = [
    { id: 1, name: "Robe sirène en wax", price: 85000, stock: 5 },
    { id: 2, name: "Ensemble homme bleu nuit", price: 120000, stock: 3 },
    { id: 3, name: "Tenue traditionnelle perlée", price: 150000, stock: 2 },
  ];

  const stockColor = (stock: number) => {
    if (stock === 0) return "text-red-500";
    if (stock <= 2) return "text-amber-500";
    return "text-emerald-600";
  };

  return (
    <>
      <div className="mb-10">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">
          Catalogues
        </p>
        <h1 className="font-serif text-4xl text-[#1a1a1a]">Produits</h1>
      </div>

      <div className="bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Nom</th>
              <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Prix (FCFA)</th>
              <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-[#FAF6F0]/50 transition">
                <td className="px-6 py-5 font-serif">{product.name}</td>
                <td className="px-6 py-5 font-serif text-[#C8A165]">
                  {product.price.toLocaleString("fr-FR")}
                </td>
                <td className={`px-6 py-5 font-medium ${stockColor(product.stock)}`}>
                  {product.stock}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Produits;
