import { useEffect, useState, type FormEvent } from "react";
import { adminFetch } from "./api";

type Product = {
  idproduit: number;
  nom: string;
  prix: number;
  stock: number;
  image: string | null;
};

const emptyForm = { nom: "", prix: "", stock: "", image: "" };

const Produits = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    const res = await adminFetch("/products");
    if (!res.ok) throw new Error("Échec du chargement");
    return (await res.json()) as Product[];
  };

  const reload = async () => {
    setError("");
    try {
      setProducts(await fetchProducts());
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const startEdit = (p: Product) => {
    setEditingId(p.idproduit);
    setForm({
      nom: p.nom,
      prix: String(p.prix),
      stock: String(p.stock),
      image: p.image ?? "",
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    try {
      const path = editingId ? `/products/${editingId}` : "/products";
      const method = editingId ? "PUT" : "POST";
      const res = await adminFetch(path, {
        method,
        body: JSON.stringify({
          nom: form.nom,
          prix: Number(form.prix),
          stock: Number(form.stock || 0),
          image: form.image || null,
        }),
      });
      if (!res.ok) throw new Error("Échec de l'enregistrement");
      resetForm();
      await reload();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce produit ?")) return;
    try {
      const res = await adminFetch(`/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Échec de la suppression");
      await reload();
    } catch (err) {
      alert((err as Error).message);
    }
  };

  const stockColor = (stock: number) => {
    if (stock === 0) return "text-red-500";
    if (stock <= 2) return "text-amber-500";
    return "text-emerald-600";
  };

  const inputClass =
    "w-full bg-transparent border-b border-gray-300 py-2 focus:outline-none focus:border-[#C8A165] transition";

  return (
    <>
      <div className="mb-10">
        <p className="text-[#C8A165] text-xs tracking-[0.4em] uppercase mb-2">Catalogue</p>
        <h1 className="font-serif text-4xl text-[#1a1a1a]">Produits</h1>
      </div>

      {/* Formulaire ajout / édition */}
      <form onSubmit={handleSubmit} className="bg-white p-8 mb-10 grid grid-cols-1 md:grid-cols-5 gap-6 items-end">
        <div className="md:col-span-2">
          <label className="text-xs tracking-[0.3em] uppercase text-gray-500 block mb-2">Nom</label>
          <input
            type="text"
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] uppercase text-gray-500 block mb-2">Prix (FCFA)</label>
          <input
            type="number"
            min="0"
            value={form.prix}
            onChange={(e) => setForm({ ...form, prix: e.target.value })}
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.3em] uppercase text-gray-500 block mb-2">Stock</label>
          <input
            type="number"
            min="0"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: e.target.value })}
            className={inputClass}
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#C8A165] text-white px-6 py-3 tracking-[0.2em] uppercase text-xs hover:bg-[#b08e51] transition disabled:opacity-50"
          >
            {editingId ? "Modifier" : "Ajouter"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="border border-gray-300 px-4 py-3 tracking-[0.2em] uppercase text-xs hover:border-[#C8A165] transition"
            >
              Annuler
            </button>
          )}
        </div>
        <div className="md:col-span-5">
          <label className="text-xs tracking-[0.3em] uppercase text-gray-500 block mb-2">
            Image (chemin public, ex : /image1.jpeg) — facultatif
          </label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            placeholder="/mon-produit.jpeg"
            className={inputClass}
          />
        </div>
      </form>

      {loading && <p className="text-gray-500">Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-gray-500">Aucun produit pour le moment.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Nom</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Prix (FCFA)</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Stock</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Image</th>
                <th className="px-6 py-5 text-[#C8A165] text-xs tracking-[0.3em] uppercase font-normal">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.idproduit} className="border-b border-gray-100 hover:bg-[#FAF6F0]/50 transition">
                  <td className="px-6 py-5 font-serif">{product.nom}</td>
                  <td className="px-6 py-5 font-serif text-[#C8A165]">
                    {product.prix.toLocaleString("fr-FR")}
                  </td>
                  <td className={`px-6 py-5 font-medium ${stockColor(product.stock)}`}>
                    {product.stock}
                  </td>
                  <td className="px-6 py-5 text-xs text-gray-500">
                    {product.image ?? <span className="italic">—</span>}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="text-xs tracking-[0.2em] uppercase text-[#C8A165] hover:underline"
                      >
                        Éditer
                      </button>
                      <button
                        onClick={() => handleDelete(product.idproduit)}
                        className="text-xs tracking-[0.2em] uppercase text-red-500 hover:underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Produits;
