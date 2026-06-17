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