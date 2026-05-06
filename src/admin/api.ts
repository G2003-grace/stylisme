// Helper fetch dédié à l'admin :
// - ajoute automatiquement le token Bearer
// - si le serveur renvoie 401 (token expiré ou invalide),
//   on vide le localStorage et on renvoie l'utilisateur sur /admin/login

const API_URL = "http://localhost:5000";

export const adminFetch = async (path: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("adminToken");

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  }

  return res;
};

export { API_URL };
