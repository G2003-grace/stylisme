-- ============================================================
-- Base de données : stylisme
-- Schéma corrigé : clients, produits, commandes (InnoDB + FK)
-- ============================================================

-- Sécurité : on désactive les FK pendant le drop pour éviter
-- les erreurs de dépendance, puis on les réactive.
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS commandes;
DROP TABLE IF EXISTS produits;
DROP TABLE IF EXISTS clients;

SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------
-- 1) CLIENTS
-- ------------------------------------------------------------
CREATE TABLE clients (
  idclient    INT NOT NULL AUTO_INCREMENT,
  nom         VARCHAR(100) NOT NULL,
  prenom      VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  contact     VARCHAR(20)  NOT NULL,
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (idclient)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 2) PRODUITS (catalogue)
-- ------------------------------------------------------------
CREATE TABLE produits (
  idproduit   INT NOT NULL AUTO_INCREMENT,
  nom         VARCHAR(150) NOT NULL,
  description TEXT,
  prix        INT NOT NULL,
  stock       INT NOT NULL DEFAULT 0,
  image       VARCHAR(255),
  created_at  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (idproduit)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- 3) COMMANDES (relie clients et produits)
-- ------------------------------------------------------------
CREATE TABLE commandes (
  idcommande      INT NOT NULL AUTO_INCREMENT,
  idclient        INT NOT NULL,
  idproduit       INT NULL,
  modele          VARCHAR(150) NOT NULL,
  tissu           VARCHAR(100) NOT NULL,
  mesures         JSON NULL,
  prix            INT NOT NULL,
  statut          ENUM('En cours','En préparation','Terminé','Livré')
                  NOT NULL DEFAULT 'En cours',
  date_commande   DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  date_livraison  DATE NULL,
  PRIMARY KEY (idcommande),
  FOREIGN KEY (idclient)  REFERENCES clients(idclient)   ON DELETE RESTRICT,
  FOREIGN KEY (idproduit) REFERENCES produits(idproduit) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Données de démo
-- ============================================================

INSERT INTO clients (nom, prenom, email, contact) VALUES
  ('Dupont',  'Alice', 'alice.dupont@example.com',  '+229 97 11 22 33'),
  ('Kouassi', 'Jean',  'jean.kouassi@example.com',  '+229 96 44 55 66'),
  ('Adjovi',  'Marie', 'marie.adjovi@example.com',  '+229 95 77 88 99');

INSERT INTO produits (nom, description, prix, stock) VALUES
  ('Robe sirène en wax',          'Robe ajustée en tissu wax aux motifs traditionnels.',     85000,  5),
  ('Ensemble homme bleu nuit',    'Costume deux-pièces coupe moderne, finitions main.',      120000, 3),
  ('Tenue traditionnelle perlée', 'Tenue cérémonielle ornée de perles et broderies.',        150000, 2),
  ('Robe de soirée à volants',    'Robe longue à volants, tissu fluide.',                    95000,  4);

INSERT INTO commandes (idclient, idproduit, modele, tissu, prix, statut, date_livraison) VALUES
  (1, 1, 'Robe sirène en wax',          'Wax bleu',     85000,  'En cours',       NULL),
  (2, 2, 'Ensemble homme bleu nuit',    'Laine peignée',120000, 'En préparation', NULL),
  (3, 3, 'Tenue traditionnelle perlée', 'Soie ivoire',  150000, 'Terminé',        '2026-05-10'),
  (1, NULL, 'Caftan sur mesure',        'Velours noir', 175000, 'Livré',          '2026-04-20');
