# Fonctionnalités de l'application

## 1. Authentification

L'application doit permettre aux utilisateurs de se connecter avec leur compte.

Fonctionnalités :

* Connexion
* Déconnexion
* Identification du rôle de l'utilisateur
* Accès aux fonctionnalités selon le rôle

Les utilisateurs sont :

* Gestionnaire des achats
* Comptable
* Directrice

---

## 2. Tableau de bord

Le tableau de bord permet d'avoir une vue rapide de l'activité de la cuisine.

Il doit notamment afficher :

* Nombre de commandes en cours
* Commandes à venir
* Commandes en livraison
* Commandes reçues
* Factures à traiter
* Dépenses de la semaine
* Dépenses du mois
* Nombre de fournisseurs actifs
* Alertes importantes

---

## 3. Gestion des fournisseurs

L'application doit permettre de centraliser les informations des fournisseurs.

Informations principales :

* Nom
* Prénom
* Téléphone
* Email
* Adresse

Fonctionnalités :

* Ajouter un fournisseur
* Modifier un fournisseur
* Supprimer un fournisseur
* Consulter un fournisseur
* Rechercher un fournisseur
* Consulter l'historique des commandes
* Consulter le montant total des achats auprès du fournisseur
* Consulter les derniers produits commandés

---

## 4. Gestion des produits

L'application doit permettre de gérer les denrées alimentaires utilisées par la cuisine.

Informations principales :

* Nom du produit
* Catégorie
* Unité
* Prix actuel
* Fournisseur habituel

Fonctionnalités :

* Ajouter un produit
* Modifier un produit
* Supprimer un produit
* Consulter un produit
* Rechercher un produit
* Associer un fournisseur
* Consulter l'historique des prix
* Suivre l'évolution du prix

Exemples de catégories :

* Fruits et légumes
* Viandes
* Poissons
* Produits laitiers
* Épicerie
* Boissons
* Produits surgelés
* Autres

---

## 5. Gestion des commandes

La commande constitue une fonctionnalité centrale de l'application.

Une commande peut contenir plusieurs produits.

### Informations générales

Une commande doit contenir :

* Fournisseur
* Date de commande
* Date de livraison prévue
* Heure de commande
* Heure de facturation
* Numéro de facture
* Statut
* Date de réception
* Commentaire éventuel

### Produits de la commande

Pour chaque produit :

* Produit
* Quantité
* Unité
* Prix unitaire
* Prix total

Le prix total d'une ligne est calculé automatiquement :

**Quantité × Prix unitaire**

Le montant total de la commande est également calculé automatiquement.

### Statuts

Une commande peut avoir les statuts suivants :

* Brouillon
* Commandée
* En livraison
* Reçue
* Annulée

### Fonctionnalités

* Créer une commande
* Modifier une commande
* Consulter une commande
* Supprimer une commande
* Ajouter plusieurs produits
* Modifier les quantités
* Modifier les prix
* Calculer automatiquement les totaux
* Modifier le statut
* Enregistrer la réception
* Consulter l'historique

---

## 6. Gestion des factures

Une facture peut être associée à une commande.

Informations principales :

* Numéro de facture
* Date de facture
* Heure de facturation
* Montant
* Commande associée
* Fournisseur
* Photo de la facture

Fonctionnalités :

* Ajouter une facture
* Modifier une facture
* Consulter une facture
* Supprimer une facture
* Ajouter une photo
* Prendre une photo depuis le téléphone
* Importer une photo depuis le téléphone ou l'ordinateur
* Consulter la photo

La reconnaissance automatique des informations de la facture (OCR) n'est pas prévue dans la première version.

---

## 7. Planning des commandes et livraisons

Le planning permet de suivre les commandes dans le temps.

Il doit permettre de visualiser :

* Commandes à venir
* Commandes en livraison
* Commandes reçues
* Commandes en retard

Deux modes de consultation sont prévus :

* Vue liste
* Vue calendrier

Le planning est principalement basé sur les dates de commande et de livraison prévues.

---

## 8. Gestion des menus

L'application doit permettre de gérer les menus hebdomadaires de la cuisine.

Un menu est organisé par semaine et par jour.

Pour chaque jour, il est possible d'enregistrer les éléments du menu et les ingrédients utilisés.

### Version 1

La gestion reste simple.

L'application ne calcule pas automatiquement les quantités nécessaires en fonction du nombre de personnes.

Fonctionnalités :

* Créer un menu
* Modifier un menu
* Consulter un menu
* Supprimer un menu
* Organiser les menus par semaine
* Associer des ingrédients aux menus

---

## 9. Statistiques et indicateurs

L'application doit fournir des statistiques simples permettant de suivre les achats.

Indicateurs prévus :

* Nombre de commandes
* Montant total des achats
* Dépenses par période
* Dépenses par fournisseur
* Dépenses par catégorie
* Nombre de fournisseurs actifs
* Produits les plus commandés
* Évolution des prix
* Nombre de commandes reçues
* Nombre de commandes en attente

Les statistiques doivent rester simples et faciles à comprendre.

---

## 10. Suivi des prix

L'application doit conserver l'historique des prix des produits.

Lorsqu'un prix change, l'ancien prix doit être conservé.

Cela permettra notamment de :

* Voir l'évolution du prix d'un produit
* Identifier les augmentations de prix
* Comparer le prix actuel avec les anciens prix
* Identifier les produits dont le prix augmente fortement

---

## 11. Alertes

L'application doit générer des alertes simples.

Exemples :

### Livraison en retard

Une commande dont la date de livraison prévue est dépassée et qui n'est pas encore reçue peut générer une alerte.

### Commande prévue non reçue

Une commande prévue prochainement ou arrivée à échéance doit pouvoir être identifiée facilement.

### Augmentation de prix

Une augmentation importante du prix d'un produit peut générer une alerte.

Les seuils exacts des alertes seront définis pendant la conception technique.

---

## 12. Recherche et filtres

Les principales listes doivent pouvoir être recherchées et filtrées.

Exemples :

* Rechercher un fournisseur
* Rechercher un produit
* Rechercher une commande
* Filtrer les commandes par statut
* Filtrer les commandes par fournisseur
* Filtrer par période
* Filtrer les statistiques

---

## 13. Utilisation sur téléphone

L'application doit être conçue pour être facilement utilisable depuis un téléphone.

Les principales actions doivent être accessibles rapidement :

* Créer une commande
* Ajouter un produit
* Photographier une facture
* Consulter une commande
* Modifier le statut
* Consulter le planning

L'interface doit également fonctionner sur :

* Téléphone
* Tablette
* Ordinateur

---

## 14. Fonctionnalités non prévues dans la V1

Les fonctionnalités suivantes ne sont pas prévues dans la première version :

* Gestion complète des stocks
* Calcul automatique des besoins selon le nombre de personnes
* Génération automatique des commandes à partir des menus
* OCR des factures
* Envoi automatique de SMS
* Application mobile native
* Publication obligatoire sur App Store ou Google Play
* Gestion de plusieurs cuisines
* Intelligence artificielle
* Prévision avancée des dépenses

Ces fonctionnalités pourront être étudiées dans une version future.

---

## 15. Résumé des modules

| Module           | Fonction principale                    |
| ---------------- | -------------------------------------- |
| Authentification | Connexion et gestion des accès         |
| Tableau de bord  | Vue globale de l'activité              |
| Fournisseurs     | Gestion des fournisseurs               |
| Produits         | Gestion des produits et des prix       |
| Commandes        | Création et suivi des commandes        |
| Factures         | Gestion et stockage des factures       |
| Planning         | Suivi des commandes et livraisons      |
| Menus            | Gestion des menus hebdomadaires        |
| Statistiques     | Analyse des achats                     |
| Prix             | Historique et évolution des prix       |
| Alertes          | Signalement des situations importantes |
| Recherche        | Recherche et filtrage des données      |

---

## 16. Principe général

La première version doit privilégier :

* La simplicité
* La rapidité de saisie
* La lisibilité
* L'utilisation sur téléphone
* La centralisation des informations
* La fiabilité des données
* Des statistiques simples et utiles

L'objectif n'est pas de créer un système complexe, mais un outil pratique permettant à l'équipe de suivre efficacement les achats alimentaires de la cuisine.
