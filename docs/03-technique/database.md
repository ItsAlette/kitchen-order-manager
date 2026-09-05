# Structure de la base de données

## 1. Objectif

La base de données permet de centraliser les utilisateurs, fournisseurs, produits, commandes, factures, menus et historiques de prix.

La base utilise PostgreSQL via Supabase.

---

## 2. Tables principales

### users

Stocke les utilisateurs de l'application.

| Champ      | Type      | Description        |
| ---------- | --------- | ------------------ |
| id         | UUID      | Identifiant unique |
| first_name | TEXT      | Prénom             |
| last_name  | TEXT      | Nom                |
| email      | TEXT      | Email              |
| role       | TEXT      | Rôle utilisateur   |
| created_at | TIMESTAMP | Date de création   |

Rôles possibles :

* purchase_manager
* accountant
* director

---

### suppliers

Stocke les fournisseurs.

| Champ      | Type      | Description        |
| ---------- | --------- | ------------------ |
| id         | UUID      | Identifiant unique |
| first_name | TEXT      | Prénom             |
| last_name  | TEXT      | Nom                |
| phone      | TEXT      | Téléphone          |
| email      | TEXT      | Email              |
| address    | TEXT      | Adresse            |
| created_at | TIMESTAMP | Date de création   |

---

### products

Stocke les produits alimentaires.

| Champ         | Type      | Description          |
| ------------- | --------- | -------------------- |
| id            | UUID      | Identifiant unique   |
| name          | TEXT      | Nom du produit       |
| category      | TEXT      | Catégorie            |
| unit          | TEXT      | Unité                |
| current_price | DECIMAL   | Prix actuel          |
| supplier_id   | UUID      | Fournisseur habituel |
| created_at    | TIMESTAMP | Date de création     |

---

### orders

Stocke les commandes.

| Champ                 | Type      | Description                        |
| --------------------- | --------- | ---------------------------------- |
| id                    | UUID      | Identifiant unique                 |
| order_number          | TEXT      | Numéro de commande                 |
| supplier_id           | UUID      | Fournisseur                        |
| order_date            | DATE      | Date de commande                   |
| order_time            | TIME      | Heure de commande                  |
| planned_delivery_date | DATE      | Livraison prévue                   |
| reception_date        | DATE      | Date de réception                  |
| status                | TEXT      | Statut                             |
| created_by            | UUID      | Utilisateur ayant créé la commande |
| created_at            | TIMESTAMP | Date de création                   |

Statuts possibles :

* draft
* ordered
* in_delivery
* received
* cancelled

---

### order_products

Cette table permet d'associer plusieurs produits à une commande.

| Champ       | Type    | Description        |
| ----------- | ------- | ------------------ |
| id          | UUID    | Identifiant unique |
| order_id    | UUID    | Commande           |
| product_id  | UUID    | Produit            |
| quantity    | DECIMAL | Quantité           |
| unit_price  | DECIMAL | Prix unitaire      |
| total_price | DECIMAL | Prix total         |

Le prix total d'une ligne est :

```text
quantity × unit_price
```

Le montant total de la commande est calculé à partir des lignes de commande.

---

### invoices

Stocke les informations des factures.

| Champ          | Type      | Description          |
| -------------- | --------- | -------------------- |
| id             | UUID      | Identifiant unique   |
| order_id       | UUID      | Commande associée    |
| invoice_number | TEXT      | Numéro de facture    |
| invoice_date   | DATE      | Date de facture      |
| invoice_time   | TIME      | Heure de facturation |
| total_amount   | DECIMAL   | Montant total        |
| photo_url      | TEXT      | Photo de la facture  |
| created_at     | TIMESTAMP | Date de création     |

---

### menus

Stocke les menus hebdomadaires.

| Champ      | Type      | Description         |
| ---------- | --------- | ------------------- |
| id         | UUID      | Identifiant unique  |
| week_start | DATE      | Début de la semaine |
| name       | TEXT      | Nom du menu         |
| created_at | TIMESTAMP | Date de création    |

---

### menu_ingredients

Associe les ingrédients aux menus.

| Champ      | Type    | Description        |
| ---------- | ------- | ------------------ |
| id         | UUID    | Identifiant unique |
| menu_id    | UUID    | Menu               |
| product_id | UUID    | Produit            |
| quantity   | DECIMAL | Quantité prévue    |
| unit       | TEXT    | Unité              |

La V1 ne calcule pas automatiquement les quantités en fonction du nombre de personnes.

---

### price_history

Stocke l'évolution des prix.

| Champ       | Type      | Description           |
| ----------- | --------- | --------------------- |
| id          | UUID      | Identifiant unique    |
| product_id  | UUID      | Produit               |
| supplier_id | UUID      | Fournisseur           |
| price       | DECIMAL   | Prix                  |
| recorded_at | TIMESTAMP | Date d'enregistrement |

Cette table permettra de suivre l'évolution des prix et de détecter les augmentations importantes.

---

## 3. Relations principales

```text
SUPPLIER
   │
   ├──────── PRODUCTS
   │              │
   │              └──── PRICE_HISTORY
   │
   └──────── ORDERS
                  │
                  ├──── ORDER_PRODUCTS ──── PRODUCTS
                  │
                  └──── INVOICES


MENUS
   │
   └──── MENU_INGREDIENTS ──── PRODUCTS


USERS
   │
   └──── ORDERS
```

---

## 4. Règles principales

* Un fournisseur peut avoir plusieurs produits.
* Un fournisseur peut avoir plusieurs commandes.
* Une commande appartient à un fournisseur.
* Une commande peut contenir plusieurs produits.
* Un produit peut apparaître dans plusieurs commandes.
* Une commande peut avoir une facture.
* Un produit peut avoir plusieurs historiques de prix.
* Un menu peut contenir plusieurs ingrédients.
* Un utilisateur peut créer plusieurs commandes.
* Les données doivent être protégées selon le rôle de l'utilisateur.

---

## 5. Calculs

### Total d'une ligne

```text
quantity × unit_price
```

### Total d'une commande

```text
Somme des total_price des lignes
```

### Évolution du prix

```text
prix actuel - ancien prix
```

Ces calculs seront automatisés dans l'application.
