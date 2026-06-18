# Events module

## Role

Le module Événements est le coeur du MVP.

Il sert à créer, suivre et préparer les salons, JPO, forums, webinaires, événements partenaires et événements internes.

## Primary user

Le premier utilisateur cible est la communication / pilotage événementiel.

Le module n'est pas conçu en V1 comme une interface simplifiée pour les chargées de formation.

## V1 objective

En V1, le module doit permettre de :

- créer un événement directement dans la plateforme ;
- consulter la liste des événements enregistrés ;
- préparer la future fiche événement complète ;
- fournir la base de travail du dashboard de pilotage.

## V1 scope

La V1 du module Événements inclut :

- une liste des événements ;
- une création manuelle simple ;
- un socle de champs métier essentiels ;
- des statuts d'avancement opérationnels ;
- des notes internes.

La V1 n'inclut pas encore :

- authentification avancée ;
- workflow complexe ;
- documents liés ;
- tâches liées ;
- budget détaillé ;
- intégrations Outlook, QR code ou Matomo ;
- vue simplifiée par rôle.

## Event model direction

L'événement est l'objet central de l'application.

Direction cible du modèle V1 :

- `id`
- `title`
- `cfaScope`
- `eventType`
- `status`
- `decisionStatus`
- `priority`
- `startDate`
- `endDate`
- `location`
- `organizerName`
- `organizerContact`
- `mainGoal`
- `expectedOutcome`
- `targetAudience`
- `owner`
- `teamNotes`
- `budgetEstimated`
- `budgetActual`
- `notes`
- `createdAt`
- `updatedAt`

## Minimal first version

Le premier niveau réellement nécessaire pour démarrer la saisie est :

- `title`
- `eventType`
- `cfaScope`
- `status`
- `startDate`
- `endDate`
- `location`
- `owner`
- `priority`
- `mainGoal`
- `notes`

## Controlled values

### CFA scope

- `IFIR`
- `SPORT`
- `BOTH`

### Event statuses

- `veille`
- `à arbitrer`
- `devis demandé`
- `devis reçu`
- `validé`
- `inscrit`
- `à préparer`
- `terminé`
- `bilan à faire`

### Event examples

- salon
- JPO
- forum
- webinaire
- événement partenaire
- événement interne

## Product rules

- La saisie doit rester rapide.
- Les champs obligatoires doivent être limités au strict nécessaire.
- Le module doit rester compatible avec une base SQLite locale en démo.
- La structure doit rester portable vers une base future plus adaptée.
- Les données événement doivent pouvoir alimenter plus tard les modules Documents, Tâches, PLV, Formations, Leads et Reporting.

## UI direction

- page liste simple et lisible ;
- création d'événement sur la même page au début ;
- état vide clair si aucun événement n'existe ;
- affichage orienté pilotage et préparation, pas seulement reporting ;
- fiche événement complète reportée après le socle.

## Next steps

1. Ajouter la fiche événement détaillée.
2. Lier documents, tâches et matériaux à un événement.
3. Ajouter les champs métier manquants du modèle cible.
4. Connecter ensuite le dashboard aux événements réels.
