# CFA Event Platform

Plateforme locale de pilotage des salons, JPO et événements pour les CFA IFIR et CFA Sport & Animation.

Objectif V1 : mieux organiser la saison salons 2026-2027, centraliser les documents, suivre les démarches, préparer les kits communication, sélectionner les formations à pousser, collecter les leads et analyser les premiers indicateurs de ROI.

## État du projet

Projet développé en local sous **WSL / Ubuntu**, avec VS Code connecté à WSL.

Stack actuelle :

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Prisma
* SQLite
* pnpm
* RTK pour réduire les sorties terminal et économiser les tokens Codex

## Dossier de travail principal

Le projet de travail est dans WSL :

```bash
~/dev/cfa-event-platform
```

Ne pas travailler dans la copie Windows / OneDrive sauf besoin de sauvegarde ou comparaison.

## Ouvrir le projet dans VS Code

Depuis un terminal Ubuntu / WSL :

```bash
cd ~/dev/cfa-event-platform
code .
```

Dans VS Code, vérifier que la fenêtre est bien ouverte en mode :

```txt
WSL: Ubuntu
```

Le terminal intégré doit afficher un chemin du type :

```bash
/home/jbouloudani/dev/cfa-event-platform
```

## Lancer une session de travail

À faire au début de chaque session :

```bash
cd ~/dev/cfa-event-platform
rtk git status
rtk pnpm build
```

Si le build passe et que Git est propre, lancer le serveur de développement :

```bash
pnpm dev
```

Ouvrir ensuite :

```txt
http://localhost:3000
```

## Lancer Codex

Dans un terminal WSL placé dans le projet :

```bash
cd ~/dev/cfa-event-platform
codex
```

Avant de demander du code à Codex, vérifier que le projet est propre :

```bash
rtk git status
rtk pnpm build
```

## Règles Codex

Codex doit suivre les règles du fichier :

```txt
AGENTS.md
```

Règles principales :

* lire seulement les fichiers nécessaires ;
* ne pas scanner tout le repo ;
* utiliser RTK pour les commandes verbeuses ;
* ne pas modifier de fichiers hors périmètre ;
* ne pas ajouter de dépendance sans validation ;
* ne pas développer de fonctionnalités V2 sans demande explicite ;
* une tâche = une modification ciblée ;
* build obligatoire avant validation ;
* réponse courte après chaque tâche.

## Commandes utiles

### Installer les dépendances

À faire après un clone ou après modification du lockfile :

```bash
pnpm install
```

### Lancer le serveur local

```bash
pnpm dev
```

### Vérifier le build

```bash
rtk pnpm build
```

ou sans RTK :

```bash
pnpm build
```

### Vérifier Git

```bash
rtk git status
```

ou :

```bash
git status --short
```

### Voir les fichiers modifiés

```bash
rtk git diff --stat
```

### Commit

```bash
git add .
git commit -m "Message du commit"
```

### Push GitHub

```bash
git push
```

## Workflow recommandé

1. Ouvrir VS Code en WSL.
2. Vérifier le projet avec `rtk git status`.
3. Vérifier le build avec `rtk pnpm build`.
4. Lancer `pnpm dev` si besoin d’afficher l’app.
5. Préparer un prompt court pour Codex.
6. Lancer Codex dans un terminal WSL.
7. Faire une seule tâche à la fois.
8. Relancer `rtk pnpm build`.
9. Vérifier `rtk git diff --stat`.
10. Commit.
11. Push si besoin.

## Structure importante

```txt
AGENTS.md
docs/
prompts/
uploads/
imports/
exports/
prisma/
src/
package.json
pnpm-lock.yaml
```

## Dossiers à ne pas commit

Ne jamais commit :

```txt
node_modules/
.next/
.env
uploads réels
imports réels
exports réels
src/generated/
```

Les dossiers `uploads`, `imports` et `exports` peuvent contenir un `.gitkeep`, mais pas de vrais fichiers sensibles.

## RTK

RTK est installé pour réduire le bruit des sorties terminal.

Commandes utiles :

```bash
rtk git status
rtk git diff --stat
rtk pnpm build
rtk pnpm lint
rtk gain
```

Utiliser RTK en priorité pour les commandes longues ou verbeuses.

## Docker

Docker n’est pas obligatoire pour le développement quotidien.

Mode recommandé actuellement :

```bash
pnpm dev
```

Docker sera ajouté plus tard pour :

* rendre l’application portable ;
* préparer une démo plus stable ;
* faciliter un futur déploiement sur serveur interne ;
* isoler l’environnement ;
* lancer l’app avec une seule commande.

Docker sera pertinent quand les éléments suivants seront stabilisés :

* schéma Prisma ;
* base SQLite locale ;
* dossier uploads ;
* variables d’environnement ;
* premiers modules fonctionnels.

Objectif futur :

```bash
docker compose up --build
```

Mais le développement courant reste en WSL avec `pnpm dev`.

## Déploiement futur

La V1 est une application locale de démonstration.

Elle doit toutefois rester pensée pour pouvoir être déployée plus tard sur l’infrastructure interne de l’entreprise, si le projet est validé.

Principes à respecter :

* éviter les chemins locaux codés en dur ;
* utiliser les variables d’environnement ;
* garder une architecture portable ;
* ne pas dépendre de services payants ;
* prévoir une migration future de SQLite vers une base plus adaptée si besoin ;
* garder les fichiers uploadés dans une structure remplaçable par un stockage serveur.
