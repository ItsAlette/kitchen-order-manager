# Expression du besoin

## 1. Contexte

La gestion des commandes de denrées alimentaires d'une cuisine nécessite le suivi de nombreuses informations : fournisseurs, produits, quantités, prix, factures, dates de commande, dates de livraison et état des commandes.

Lorsque ces informations sont gérées de manière manuelle ou à travers différents supports, il peut devenir difficile de retrouver rapidement une commande, une facture ou l'historique des prix d'un produit.

L'objectif du projet est de centraliser ces informations dans une application unique, simple et accessible depuis un téléphone, une tablette ou un ordinateur.

## 2. Problématique

La cuisine doit pouvoir suivre l'ensemble de ses achats alimentaires et disposer d'une vision claire de ses commandes.

Les principaux besoins identifiés sont :

* centraliser les informations relatives aux commandes ;
* conserver les informations des fournisseurs ;
* gérer les produits commandés ;
* suivre les quantités et les prix ;
* conserver une copie des factures ;
* suivre l'état des livraisons ;
* connaître les commandes à venir et celles déjà réceptionnées ;
* gérer les menus de la semaine et leurs ingrédients ;
* suivre l'évolution des prix des produits ;
* disposer de statistiques simples sur les achats ;
* recevoir des alertes lorsqu'une situation nécessite une attention particulière.

## 3. Solution envisagée

Le projet consiste à développer une application web responsive pouvant également être utilisée comme une PWA.

L'application sera accessible depuis un navigateur et optimisée pour une utilisation sur téléphone.

Elle permettra notamment de :

* créer et suivre des commandes ;
* associer plusieurs produits à une même commande ;
* gérer les fournisseurs ;
* gérer les produits ;
* enregistrer les informations des factures ;
* prendre ou importer une photo d'une facture ;
* suivre les livraisons ;
* consulter un planning des commandes ;
* créer et modifier les menus de la semaine ;
* associer des ingrédients aux menus ;
* suivre l'évolution des prix ;
* consulter des statistiques ;
* générer des alertes simples.

## 4. Utilisateurs

L'application sera utilisée par environ six utilisateurs au sein d'une même cuisine.

Les principaux profils sont :

### Gestionnaire des achats

Le gestionnaire des achats est l'utilisateur principal de l'application.

Il pourra notamment :

* créer et modifier les commandes ;
* gérer les fournisseurs ;
* gérer les produits ;
* enregistrer les factures ;
* suivre les livraisons ;
* consulter le planning ;
* gérer les menus.

### Comptable

La comptable pourra notamment :

* consulter les commandes ;
* consulter les factures ;
* consulter les fournisseurs ;
* suivre les montants des achats ;
* consulter les statistiques.

### Directrice

La directrice pourra principalement :

* consulter le tableau de bord ;
* suivre les commandes ;
* consulter le planning ;
* consulter les menus ;
* consulter les statistiques et indicateurs.

## 5. Accès à l'application

L'application nécessitera une authentification.

Chaque utilisateur disposera d'un compte personnel avec :

* nom ;
* prénom ;
* adresse e-mail ;
* mot de passe ;
* rôle.

Les droits d'accès pourront être adaptés au rôle de l'utilisateur.

## 6. Principe général

Le fonctionnement de l'application reposera principalement sur les relations suivantes :

**Fournisseur → Commande → Produits → Facture → Livraison**

Les menus seront également associés aux produits utilisés comme ingrédients :

**Menu → Ingrédients → Produits**

Les données enregistrées pourront ensuite être utilisées pour produire des statistiques et détecter certaines situations nécessitant une attention particulière.

## 7. Niveau d'automatisation

L'application intégrera des automatismes simples afin de faciliter le travail des utilisateurs.

Elle pourra notamment :

* calculer automatiquement le montant total d'une commande ;
* calculer les montants par période ;
* calculer les montants par fournisseur ;
* suivre l'évolution du prix des produits ;
* détecter certaines augmentations de prix ;
* identifier les commandes dont la livraison est en retard ;
* signaler les commandes prévues mais non réceptionnées.

Les fonctionnalités d'automatisation avancées, comme la lecture automatique des factures par OCR ou le calcul des besoins alimentaires en fonction du nombre de personnes, ne sont pas incluses dans la première version.

## 8. Contraintes

L'application devra être :

* simple à utiliser ;
* intuitive ;
* responsive ;
* adaptée à une utilisation sur téléphone ;
* accessible depuis un navigateur ;
* sécurisée ;
* capable de stocker les données de manière persistante ;
* capable de conserver les photos des factures.

L'application n'a pas besoin d'être publiée sur l'App Store ou le Google Play Store pour la première version.

## 9. Résultat attendu

À terme, l'application devra permettre aux utilisateurs de disposer d'un espace unique pour gérer les achats alimentaires de la cuisine.

Elle devra faciliter le suivi quotidien des commandes, la conservation des factures, le suivi des livraisons et l'analyse des dépenses, tout en restant suffisamment simple pour être utilisée rapidement depuis un téléphone.
