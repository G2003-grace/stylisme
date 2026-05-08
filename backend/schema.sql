-- =============================================================
-- Schéma SamStyle - à exécuter une seule fois sur la DB de prod
-- =============================================================

CREATE TABLE IF NOT EXISTS clients (
  idclient   INT AUTO_INCREMENT PRIMARY KEY,
  nom        VARCHAR(120) NOT NULL,
  prenom     VARCHAR(120) NOT NULL,
  email      VARCHAR(190) NOT NULL UNIQUE,
  contact    VARCHAR(40)  NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS commandes (
  idcommande     INT AUTO_INCREMENT PRIMARY KEY,
  idclient       INT NOT NULL,
  modele         VARCHAR(255) NOT NULL,
  tissu          VARCHAR(255) NOT NULL,
  mesures        JSON NULL,
  prix           INT NOT NULL DEFAULT 0,
  statut         VARCHAR(40) NOT NULL DEFAULT 'En cours',
  date_commande  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_livraison DATE NULL,
  CONSTRAINT fk_commandes_client
    FOREIGN KEY (idclient) REFERENCES clients(idclient)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_commandes_client ON commandes(idclient);
CREATE INDEX idx_commandes_statut ON commandes(statut);

CREATE TABLE IF NOT EXISTS inscriptions (
  idinscription    INT AUTO_INCREMENT PRIMARY KEY,
  prenom           VARCHAR(120) NOT NULL,
  nom              VARCHAR(120) NOT NULL,
  email            VARCHAR(190) NOT NULL,
  contact          VARCHAR(40)  NOT NULL,
  niveau           VARCHAR(40)  NOT NULL,
  motivation       TEXT NULL,
  session          VARCHAR(80)  NOT NULL DEFAULT 'Juin 2026',
  prix             INT NOT NULL DEFAULT 5000,
  statut           VARCHAR(40)  NOT NULL DEFAULT 'En attente',
  date_inscription TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE INDEX idx_inscriptions_statut  ON inscriptions(statut);
CREATE INDEX idx_inscriptions_session ON inscriptions(session);
