# 2026-06-17 — Socle V1
La V1 est une application locale fonctionnelle.
La priorité V1 est l’organisation événementielle.
La V1 doit aider à préparer la saison salons 2026-2027 dès l’été.
Le premier utilisateur cible est la communication / pilotage événementiel.
L’interface simplifiée pour les chargées de formation est souhaitée, mais repoussée après le socle principal.
La fiche événement est l’objet central de l’application.
Le dashboard V1 doit être un poste de pilotage complet, pas une simple page de statistiques.
Les documents sont uploadés dans l’application.
Les mails Outlook sont importés comme fichiers enregistrés, puis classés manuellement.
Les jeunes accèdent uniquement aux landing pages et formulaires publics.
L’inscription administrative au CFA est hors périmètre.
Les intégrations Outlook, QR code et Matomo commencent par des imports manuels ou champs simples.
Aucun outil payant.
Un plan B Microsoft 365 pourra être étudié si la plateforme complète n’est pas validée.

# 2026-06-17 — Déploiement futur
La V1 reste une application locale de démonstration.
L’application doit toutefois être pensée pour pouvoir être déployée plus tard sur l’infrastructure interne de l’entreprise, si le projet est validé.
Ne pas supposer pour l’instant le fonctionnement exact du serveur de l’entreprise.
Éviter les chemins locaux codés en dur.
Prévoir une configuration par variables d’environnement quand c’est nécessaire.
Garder une architecture simple et portable.
SQLite est accepté pour la démo locale.
La structure ne doit pas empêcher une migration future vers une base plus adaptée à un usage serveur.
Les fichiers uploadés restent locaux en V1.
Le stockage devra pouvoir être adapté plus tard à un environnement serveur ou partagé.

# 2026-06-17 — Dashboard
Le dashboard V1 est conçu d’abord pour la communication.
Le dashboard doit montrer les priorités d’organisation, les événements à arbitrer, le pipeline, les formations à pousser, la collecte de leads et le ROI rapide.
Le dashboard ne doit pas être pensé d’abord comme une vue simplifiée pour les chargées de formation.
La simplification par rôle sera traitée plus tard.

# docs/DECISIONS.md — Ajout à faire

# 2026-06-18 — Module Événements

La page `/evenements` est une page de gestion détaillée, pas le dashboard global.

Le dashboard `/` reste une synthèse des priorités, alertes, prochains événements, leads et indicateurs.

Le module Événements utilise une logique de décision, statut et checklists.

Valeurs de décision :

* À étudier ;
* Validé ;
* Refusé ;
* Annulé.

Valeurs de statut événement :

* À organiser ;
* Organisé ;
* Terminé.

“Terminé” signifie que l’événement a eu lieu ou que sa date est passée.
Cela ne signifie pas que le bilan ou le reporting sont terminés.

La table courte `/evenements` doit afficher :

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

Le budget, les notes longues, les notes budget et le reporting détaillé ne doivent pas apparaître dans la table courte.

Ils doivent être accessibles dans la fiche événement ou les pages dédiées.

La complétion affichée dans la table courte est un seul pourcentage.

Avant l’événement, elle est calculée depuis les checklists Admin, Com et Orga.

Après la date de l’événement, ou lorsque le statut est “Terminé”, elle est calculée depuis la checklist Bilan / Reporting.

Les actions de ligne comme “Voir fiche” ne sont pas des colonnes métier triables ou filtrables.

Deux templates de checklists sont prévus pour démarrer :

* Salon / événement externe ;
* JPO.

Les checklists devront être éditables dans la fiche événement.
