# Périmètre du projet

## 1. Version V1

La première version de l'application aura pour objectif de fournir les fonctionnalités essentielles à la gestion des achats alimentaires d'une cuisine.

### Fonctionnalités incluses

#### Authentification

* Connexion des utilisateurs ;
* gestion des comptes ;
* gestion des rôles et des permissions.

#### Fournisseurs

* Création d'un fournisseur ;
* modification d'un fournisseur ;
* consultation d'un fournisseur ;
* recherche d'un fournisseur ;
* consultation de l'historique des commandes.

#### Produits

* Création d'un produit ;
* modification d'un produit ;
* consultation d'un produit ;
* catégorisation des produits ;
* gestion des unités ;
* suivi des prix ;
* historique des prix.

#### Commandes

* Création d'une commande ;
* sélection d'un fournisseur ;
* ajout de plusieurs produits ;
* saisie des quantités ;
* saisie des prix unitaires ;
* calcul automatique du montant total ;
* modification d'une commande ;
* consultation du détail d'une commande ;
* gestion du statut de la commande.

#### Factures

* Enregistrement des informations de facture ;
* association d'une facture à une commande ;
* prise de photo depuis un téléphone ;
* import d'une photo ;
* consultation de la facture.

#### Planning

* Affichage des commandes à venir ;
* affichage des commandes en cours de livraison ;
* affichage des commandes réceptionnées ;
* identification des commandes en retard ;
* affichage sous forme de liste ;
* affichage sous forme de calendrier.

#### Menus

* Création d'un menu hebdomadaire ;
* modification d'un menu ;
* consultation du menu ;
* association d'ingrédients aux menus.

#### Tableau de bord

* Nombre de commandes ;
* montant des achats ;
* commandes en attente ;
* commandes en livraison ;
* commandes réceptionnées ;
* indicateurs par période.

#### Alertes

* Alertes de retard de livraison ;
* alertes de commandes non réceptionnées ;
* alertes liées à l'évolution des prix.

---

## 2. Fonctionnalités exclues de la V1

Les fonctionnalités suivantes ne seront pas développées dans la première version :

* gestion complète des stocks ;
* calcul automatique des besoins selon le nombre de personnes ;
* génération automatique des commandes à partir des menus ;
* lecture automatique des factures par OCR ;
* notifications SMS ;
* application mobile native ;
* publication sur l'App Store ;
* publication sur Google Play ;
* gestion de plusieurs cuisines ;
* gestion avancée des fournisseurs ;
* prévision automatique des dépenses ;
* intelligence artificielle.

Ces fonctionnalités pourront être étudiées dans une version ultérieure.

---

## 3. V2 envisagée

Les évolutions possibles comprennent :

### OCR des factures

Extraction automatique des informations présentes sur une facture à partir de sa photo.

### Gestion des besoins

Calcul des quantités d'ingrédients nécessaires en fonction du nombre de personnes et des menus.

### Génération des commandes

Proposition automatique des produits à commander à partir des menus et des besoins.

### Gestion des stocks

Suivi des entrées, sorties et niveaux de stock.

### Notifications

Notifications concernant les livraisons, commandes et alertes importantes.

### Analyses avancées

Analyse de l'évolution des dépenses et des prix afin d'aider à la prise de décision.

---

## 4. Contraintes du projet

L'application est conçue pour une seule cuisine et environ six utilisateurs.

Elle doit rester simple et rapide à utiliser.

L'accès se fera principalement depuis un téléphone, mais l'application devra également fonctionner sur ordinateur et tablette.

La première version sera une application web responsive pouvant être utilisée comme une PWA.
