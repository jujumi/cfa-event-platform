# docs/EVENTS_MODULE.md

# Events module — V1

## Role

Le module Événements est le cœur opérationnel du MVP.

Il sert à créer, suivre, préparer et analyser les salons, JPO, forums, webinaires, événements partenaires et événements internes.

La page `/evenements` n’est pas le dashboard global.
Elle est la page de gestion détaillée des événements.

Le dashboard global `/` sert à afficher une synthèse : urgences, prochains événements, alertes, indicateurs et accès rapides.

## Primary users

Le module Événements doit être utilisable par toute l’équipe interne concernée :

* communication / pilotage événementiel ;
* direction ;
* chargées de formation ;
* finance en consultation ;
* équipes terrain mobilisées sur les événements.

Une interface simplifiée par rôle pourra être créée plus tard, mais le socle V1 doit d’abord être complet côté pilotage.

## V1 objective

En V1, le module doit permettre de :

* créer un événement directement dans la plateforme ;
* consulter tous les événements enregistrés ;
* suivre l’état de décision ;
* suivre l’état général de l’événement ;
* suivre la préparation admin, communication et opérationnelle ;
* suivre la complétion avant ou après événement ;
* préparer la future fiche événement complète ;
* fournir les données utiles au dashboard global.

## Main `/evenements` view

La page `/evenements` doit être une vue dense de gestion, proche d’un tableau back-office.

Elle doit contenir :

* une recherche globale ;
* des filtres et tris dans les en-têtes de colonne, à terme comme dans Excel ;
* une vue liste ;
* une vue calendrier ;
* un bouton global “Nouvel événement” ;
* une table dense ;
* des actions de ligne, dont “Voir fiche”.

La vue liste est prioritaire en V1.
La vue calendrier doit exister dans la structure, mais peut être améliorée progressivement.

## Short table columns

La table courte doit afficher uniquement les informations utiles au pilotage rapide.

Colonnes recommandées :

* Décision ;
* Statut ;
* Événement ;
* Date ;
* Durée ;
* Type ;
* CFA ;
* Lieu / adresse ;
* Participants ;
* Admin ;
* Com ;
* Orga ;
* Complétion.

Les actions comme “Voir fiche” ne sont pas de vraies colonnes métier.
Elles doivent être placées visuellement à droite de la ligne, mais ne doivent pas être pensées comme des champs triables ou filtrables.

## Data not shown in the short table

Ne pas afficher dans la liste courte :

* budget détaillé ;
* note budget ;
* bilan détaillé ;
* reporting détaillé ;
* objectifs détaillés ;
* documents ;
* leads ;
* notes longues.

Ces informations appartiennent à la fiche événement, au reporting ou aux modules dédiés.

## New event action

Le bouton “Nouvel événement” doit être disponible dans le header global de l’application.

Il doit être visible sur les pages internes principales.

En V1, il ouvre un drawer de création.

Le drawer doit permettre de créer rapidement un événement sans quitter la page courante.

## New event fields

Le formulaire de création V1 doit contenir :

* titre ;
* type d’événement ;
* CFA concerné ;
* décision ;
* statut ;
* date de l’événement ;
* durée en jours, avec décimales possibles, par exemple 0,5 ;
* lieu / adresse ;
* participants IFIR ;
* participants CFA Sport ;
* budget ;
* note budget ;
* notes.

Ne pas afficher dans la création rapide :

* responsable ;
* priorité ;
* objectif détaillé ;
* bilan ;
* reporting ;
* documents ;
* leads.

Les objectifs détaillés, documents, tâches, bilans et leads seront ajoutés dans la fiche événement ou dans les modules dédiés.

## CFA scope

Un événement peut concerner :

* IFIR seul ;
* CFA Sport seul ;
* les deux.

Si l’événement concerne IFIR seul, afficher uniquement les participants IFIR.

Si l’événement concerne CFA Sport seul, afficher uniquement les participants CFA Sport.

Si l’événement concerne les deux, afficher les participants IFIR et les participants CFA Sport.

Les participants sont les personnes internes mobilisées sur l’événement : communication, chargées de formation, direction ou autres contributeurs internes.

Les prospects, visiteurs, inscrits JPO et leads ne sont pas des participants événement. Ils appartiennent aux modules Leads, Formulaires ou JPO.

## Decision values

La décision répond à la question : “Est-ce qu’on fait cet événement ?”

Valeurs autorisées :

* À étudier ;
* Validé ;
* Refusé ;
* Annulé.

Ne pas utiliser “À arbitrer” comme valeur séparée.
“À étudier” couvre les événements non décidés.

## Event status values

Le statut répond à la question : “Où en est l’événement dans son cycle de vie ?”

Valeurs autorisées :

* À organiser ;
* Organisé ;
* Terminé.

“Terminé” signifie que l’événement a eu lieu ou que sa date est passée.

“Terminé” ne signifie pas que le bilan, les statistiques QR, les données Matomo ou l’analyse ROI sont complets.

## Checklist logic

La préparation d’un événement doit être suivie par checklists.

Groupes de checklists :

* Admin ;
* Com ;
* Orga opérationnelle ;
* Bilan / Reporting.

Admin, Com et Orga opérationnelle correspondent à la préparation avant événement.

Bilan / Reporting correspond au suivi après événement.

## Completion logic

La table courte affiche un seul pourcentage de complétion.

Avant l’événement, ce pourcentage est calculé à partir des checklists :

* Admin ;
* Com ;
* Orga opérationnelle.

Après la date de l’événement, ou lorsque le statut est “Terminé”, ce pourcentage est calculé à partir de la checklist :

* Bilan / Reporting.

Ne pas afficher deux colonnes séparées “avant événement” et “après événement”.

Admin, Com et Orga peuvent rester visibles comme pourcentages séparés dans la table courte, car ils permettent de comprendre rapidement où la préparation bloque.

## Default checklist templates

Commencer avec deux templates de checklists :

* Salon / événement externe ;
* JPO.

Ces templates pourront être améliorés plus tard.

### Template Salon / événement externe

Admin :

* Devis demandé ;
* Devis reçu ;
* Budget validé ;
* Inscription confirmée ;
* Facture ou justificatif ajouté ;
* Informations exposant récupérées.

Com :

* Objectif de présence défini ;
* Formations à pousser identifiées ;
* Landing page ou page de redirection prête ;
* QR code prêt ;
* Supports de communication prêts ;
* Publication ou annonce planifiée.

Orga opérationnelle :

* Participants internes identifiés ;
* Participants confirmés ;
* Brief jour J envoyé ;
* PLV vérifiée ;
* Matériel prêt ;
* Informations pratiques partagées.

Bilan / Reporting :

* Retours participants ajoutés ;
* Nombre de contacts renseigné ;
* Stats QR code ajoutées ;
* Stats Matomo ajoutées ;
* Leads à relancer identifiés ;
* Décision de reconduction renseignée.

### Template JPO

Admin :

* Date validée ;
* Lieu ou salles confirmés ;
* Équipe mobilisée ;
* Informations pratiques prêtes ;
* Liste des formations présentes confirmée.

Com :

* Page JPO prête ;
* Formulaire d’inscription prêt ;
* Campagne réseaux sociaux planifiée ;
* Emailing ou relance prévu ;
* Supports d’accueil prêts ;
* Message de rappel prêt.

Orga opérationnelle :

* Programme de la JPO défini ;
* Participants internes confirmés ;
* Brief équipe envoyé ;
* Signalétique / PLV prête ;
* Liste inscrits suivie ;
* Accueil / orientation prévu.

Bilan / Reporting :

* Présents / absents renseignés ;
* Retours équipe ajoutés ;
* Stats formulaire / inscriptions ajoutées ;
* Stats Matomo ajoutées ;
* Leads / candidats à relancer identifiés ;
* Bilan validé.

## Event detail page

Chaque événement devra avoir une fiche détaillée.

La fiche événement doit centraliser :

* résumé de l’événement ;
* informations générales ;
* budget et note budget ;
* notes longues ;
* participants ;
* checklists Admin, Com, Orga et Bilan / Reporting ;
* documents ;
* tâches ;
* PLV / kits ;
* formations à pousser ;
* landing page / formulaire ;
* leads ;
* reporting ;
* ROI ;
* décision de reconduction.

Les checklists devront être éditables dans la fiche événement : cocher, décocher, ajouter, supprimer ou renommer une tâche.

## Calendar view

Le module Événements doit inclure une vraie vue calendrier.

La vue calendrier doit permettre de voir les événements par date.

Comportement cible :

* vue mois ;
* événements placés sur leurs dates ;
* badge ou couleur par CFA, type ou décision ;
* clic sur un événement pour ouvrir sa fiche ;
* bouton “Nouvel événement” disponible.

En V1, une première version simple est acceptable, mais elle ne doit pas être une carte redondante avec la vue liste.

## V1 priority order

Ordre recommandé :

1. Stabiliser l’AppShell global.
2. Stabiliser `/evenements` comme table dense.
3. Ajouter les valeurs décision/statut validées.
4. Ajouter la logique de checklists et de complétion.
5. Créer la fiche événement.
6. Rendre les checklists éditables dans la fiche.
7. Ajouter les filtres et tris de tableau.
8. Améliorer la vue calendrier.
9. Connecter le dashboard global aux vrais événements.
