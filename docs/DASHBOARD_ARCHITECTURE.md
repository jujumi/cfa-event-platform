# docs/DASHBOARD_ARCHITECTURE.md

# Dashboard architecture — V1

## Objectif du dashboard

Le dashboard V1 est un poste de pilotage pour la communication.

Il doit permettre de comprendre rapidement :

* quels événements arrivent ;
* lesquels sont à arbitrer ;
* ce qui bloque ;
* ce qui doit être préparé ;
* quelles formations pousser ;
* quels supports prévoir ;
* quels leads suivre ;
* quels résultats analyser.

Le dashboard n’est pas seulement un écran de statistiques.
C’est un outil de pilotage opérationnel et stratégique.

## Public principal

Le dashboard V1 est d’abord conçu pour la communication / pilotage événementiel.

Une version simplifiée pour les chargées de formation pourra être créée plus tard.

## Structure générale

Le dashboard doit comporter :

1. Barre de navigation latérale.
2. Zone de filtres.
3. Cartes de synthèse.
4. Bloc actions prioritaires.
5. Pipeline événements.
6. Prochains événements.
7. Formations à pousser.
8. Collecte et parcours prospect.
9. ROI / bilan rapide.

## Navigation latérale

Navigation principale :

* Dashboard
* Événements
* Documents
* PLV / Kits
* Formations
* Leads
* Landing pages
* Reporting
* Paramètres
* Aide

## Filtres en haut de page

Filtres utiles :

* Saison.
* CFA : IFIR, Sport, les deux.
* Période.
* Statut.
* Type d’événement.

## Cartes de synthèse

Cartes proposées :

* Événements à arbitrer.
* Actions urgentes.
* Salons validés.
* Leads à relancer.

Ces cartes doivent servir à attirer l’attention sur les priorités, pas à faire du reporting détaillé.

## Bloc “À traiter en priorité”

Ce bloc est essentiel.

Il doit faire remonter les problèmes opérationnels :

* devis en attente ;
* PLV à vérifier ;
* landing page manquante ;
* formulaire JPO à refaire ;
* brief équipe non prêt ;
* document manquant ;
* événement sans objectif ;
* événement sans formation prioritaire ;
* événement sans responsable ;
* bilan non rempli.

L’objectif est de savoir immédiatement quoi traiter.

## Pipeline événements

Le pipeline doit montrer les événements par statut.

Colonnes envisagées :

* Veille.
* À arbitrer.
* Devis demandé.
* Validé.
* À préparer.
* Terminé.
* Bilan à faire.

Pour le premier mockup, on peut réduire les colonnes à :

* Veille.
* À arbitrer.
* Validé.
* À préparer.
* Terminé.

Chaque carte événement doit idéalement afficher :

* nom ;
* date ;
* lieu ;
* type ;
* CFA concerné ;
* statut ou alerte courte.

## Prochains événements

Liste ou tableau des prochains événements avec :

* date ;
* événement ;
* type ;
* lieu ;
* statut ;
* responsable ;
* prochaine action.

Ce bloc doit être plus opérationnel que stratégique.

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

La V1 peut afficher des placeholders structurés, mais l’architecture doit déjà refléter le futur produit.

Il faut éviter un dashboard générique avec des cartes inutiles.
Chaque bloc doit correspondre à une décision ou une action réelle.
