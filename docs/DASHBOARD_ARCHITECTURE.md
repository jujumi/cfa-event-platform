# docs/DASHBOARD_ARCHITECTURE.md

# Dashboard architecture — V1

## Objectif du dashboard

Le dashboard V1 est un poste de pilotage pour la communication et l’organisation événementielle.

Il doit permettre de comprendre rapidement :

* quels événements arrivent ;
* ce qui bloque ;
* ce qui doit être préparé ;
* quelles actions sont prioritaires ;
* quelles formations pousser ;
* quels supports prévoir ;
* quels leads suivre ;
* quels résultats analyser.

Le dashboard n’est pas la page de gestion détaillée des événements.

La gestion détaillée se fait dans `/evenements`.

Le dashboard doit être synthétique, orienté priorités et décisions.

## Public principal

Le dashboard V1 est d’abord conçu pour la communication / pilotage événementiel.

Il peut être consulté par la direction, les chargées de formation, la finance ou les équipes terrain.

Une version simplifiée par rôle pourra être créée plus tard.

## Différence entre dashboard et module Événements

Le dashboard `/` affiche une synthèse :

* alertes ;
* prochains événements ;
* indicateurs ;
* priorités ;
* raccourcis.

Le module `/evenements` gère le détail :

* table dense ;
* filtres ;
* calendrier ;
* création ;
* fiche événement ;
* checklists ;
* documents ;
* reporting.

Le dashboard ne doit pas dupliquer la page `/evenements`.

## Structure générale

Le dashboard doit comporter :

1. Cartes de synthèse.
2. Bloc actions prioritaires.
3. Prochains événements.
4. Pipeline ou vue d’avancement synthétique.
5. Formations à pousser.
6. Collecte et parcours prospect.
7. ROI / bilan rapide.

La navigation latérale, le header global, le titre de page et les actions principales sont gérés par l’AppShell, pas par le dashboard lui-même.

## Navigation latérale

Navigation principale :

* Dashboard ;
* Événements ;
* Documents ;
* PLV / Kits ;
* Formations ;
* Leads ;
* Landing pages ;
* Reporting ;
* Paramètres ;
* Aide.

## AppShell

L’AppShell doit fournir :

* sidebar persistante ;
* header global ;
* titre de page ;
* sous-titre ;
* action principale ;
* largeur de contenu cohérente ;
* espacements globaux.

Les pages internes ne doivent pas recréer leur propre shell.

## Cartes de synthèse

Cartes proposées :

* événements à étudier ;
* actions urgentes ;
* événements validés ;
* leads à relancer.

Ces cartes doivent attirer l’attention sur les priorités.
Elles ne doivent pas remplacer le reporting détaillé.

## Bloc “À traiter en priorité”

Ce bloc doit faire remonter les problèmes opérationnels :

* événement sans date confirmée ;
* événement validé mais préparation incomplète ;
* checklist Admin bloquée ;
* checklist Com bloquée ;
* checklist Orga bloquée ;
* landing page manquante ;
* QR code manquant ;
* PLV à vérifier ;
* participants internes non confirmés ;
* bilan / reporting non rempli après événement.

L’objectif est de savoir immédiatement quoi traiter.

## Pipeline / avancement événements

Le dashboard peut afficher une vue d’avancement synthétique, mais il ne doit pas recréer toute la table `/evenements`.

La logique d’avancement doit s’appuyer sur :

* décision ;
* statut événement ;
* complétion ;
* checklists Admin, Com, Orga ;
* checklist Bilan / Reporting après événement.

Valeurs de décision :

* À étudier ;
* Validé ;
* Refusé ;
* Annulé.

Valeurs de statut :

* À organiser ;
* Organisé ;
* Terminé.

## Prochains événements

Liste ou tableau synthétique des prochains événements avec :

* date ;
* événement ;
* type ;
* lieu ;
* CFA concerné ;
* complétion ;
* prochaine action ou alerte.

Ce bloc doit être plus opérationnel que décoratif.

## Formations à pousser

Ce bloc répond au problème du discours trop flou, notamment pour l’IFIR.

Il doit permettre d’identifier les formations à mettre en avant selon :

* besoins de remplissage ;
* taux d’insertion ou argument valorisable ;
* besoins employeurs ;
* adéquation avec le public du salon ;
* territoire ;
* priorité de recrutement.

Chaque formation peut avoir :

* nom ;
* CFA ;
* secteur ;
* tag : à remplir, forte insertion, besoin employeur, priorité rentrée ;
* nombre de leads ou objectif indicatif ;
* message clé.

## Collecte et parcours prospect

Ce bloc doit visualiser le parcours de conversion :

* landing pages publiées ;
* formulaires créés ;
* scans QR ;
* leads collectés ;
* demandes de rappel ;
* inscriptions JPO ;
* candidatures éventuelles.

L’objectif est de voir si l’événement crée seulement de la visibilité ou s’il génère des contacts exploitables.

## ROI / bilan rapide

Ce bloc peut rester en bas du dashboard.

Il doit afficher :

* coût total période ;
* leads générés ;
* inscriptions JPO ;
* taux de conversion ;
* coût par lead ;
* coût par inscription JPO ;
* répartition des coûts par type d’événement.

Le reporting détaillé aura sa propre page.

## Règle importante

Le dashboard ne doit pas devenir trop complexe dès le départ.

Il doit rester une synthèse utile.

Chaque bloc doit correspondre à une décision ou une action réelle.

Éviter les cartes génériques qui ne changent pas les priorités de travail.
