# Utilisateurs, rôles et permissions

## 1. Utilisateurs de l'application

L'application est destinée à environ 6 utilisateurs travaillant autour de la gestion des achats et de la cuisine.

Trois profils principaux sont définis :

* Gestionnaire des achats
* Comptable
* Directrice

Chaque utilisateur possède un compte personnel et doit se connecter pour accéder à l'application.

---

## 2. Gestionnaire des achats

### Rôle

Le gestionnaire des achats est l'utilisateur opérationnel principal de l'application.

Il dispose d'un accès complet à l'ensemble des fonctionnalités.

### Permissions

Le gestionnaire des achats peut :

* Consulter le tableau de bord
* Créer, modifier et supprimer des fournisseurs
* Créer, modifier et supprimer des produits
* Créer, modifier et supprimer des commandes
* Ajouter plusieurs produits à une commande
* Modifier les quantités et les prix
* Consulter et modifier les totaux
* Modifier le statut des commandes
* Enregistrer les réceptions
* Créer, modifier et consulter les factures
* Ajouter ou modifier les photos des factures
* Gérer le planning
* Créer, modifier et supprimer les menus
* Consulter les statistiques
* Consulter l'évolution des prix
* Gérer les informations nécessaires au fonctionnement de l'application

**Le gestionnaire des achats dispose d'un accès complet à l'application.**

---

## 3. Comptable

### Rôle

Le comptable assure le suivi administratif et financier des achats.

### Permissions

Le comptable dispose d'un **accès en lecture seule**.

Il peut consulter l'ensemble des informations disponibles dans l'application :

* Tableau de bord
* Fournisseurs
* Produits
* Commandes
* Produits et quantités des commandes
* Prix et totaux
* Statuts des commandes
* Réceptions
* Factures
* Photos des factures
* Planning
* Menus
* Statistiques
* Dépenses
* Évolution des prix
* Historique des commandes

Le comptable **ne peut pas créer, modifier ou supprimer de données**.

---

## 4. Directrice

### Rôle

La directrice dispose d'une vision globale de l'activité et utilise l'application principalement pour suivre les achats et les dépenses.

### Permissions

La directrice dispose d'un **accès en lecture seule**.

Elle peut consulter l'ensemble des informations disponibles dans l'application :

* Tableau de bord
* Fournisseurs
* Produits
* Commandes
* Produits et quantités des commandes
* Prix et totaux
* Statuts des commandes
* Réceptions
* Factures
* Photos des factures
* Planning
* Menus
* Statistiques
* Dépenses
* Évolution des prix
* Historique des commandes

La directrice **ne peut pas créer, modifier ou supprimer de données**.

---

## 5. Tableau des permissions

| Fonctionnalité          | Gestionnaire des achats | Comptable    | Directrice   |
| ----------------------- | ----------------------- | ------------ | ------------ |
| Tableau de bord         | Tout accès              | Consultation | Consultation |
| Fournisseurs            | Tout accès              | Consultation | Consultation |
| Produits                | Tout accès              | Consultation | Consultation |
| Commandes               | Tout accès              | Consultation | Consultation |
| Produits d'une commande | Tout accès              | Consultation | Consultation |
| Quantités et prix       | Tout accès              | Consultation | Consultation |
| Statut commande         | Tout accès              | Consultation | Consultation |
| Réception               | Tout accès              | Consultation | Consultation |
| Factures                | Tout accès              | Consultation | Consultation |
| Photos des factures     | Tout accès              | Consultation | Consultation |
| Planning                | Tout accès              | Consultation | Consultation |
| Menus                   | Tout accès              | Consultation | Consultation |
| Statistiques            | Consultation            | Consultation | Consultation |
| Évolution des prix      | Consultation            | Consultation | Consultation |
| Historique              | Consultation            | Consultation | Consultation |

---

## 6. Règle générale des droits

Le système repose sur deux niveaux principaux de droits :

### Gestionnaire des achats

**Accès complet**

Le gestionnaire peut effectuer toutes les opérations nécessaires à la gestion quotidienne de l'application.

### Comptable et Directrice

**Accès en lecture seule**

Ils peuvent consulter toutes les informations de l'application, mais ne peuvent effectuer aucune modification.

---

## 7. Authentification

Chaque utilisateur possède un compte individuel.

L'accès à l'application nécessite une authentification.

Après la connexion, le système identifie le rôle de l'utilisateur et applique automatiquement les permissions correspondantes.

---

## 8. Évolution possible

De nouveaux rôles ou des permissions plus détaillées pourront être ajoutés dans une version ultérieure si les besoins de la cuisine évoluent.
