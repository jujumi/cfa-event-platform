

# docs/MVP_SCOPE.md

# MVP scope

## V1 incluse

La V1 doit inclure les modules suivants :

### Dashboard de pilotage

* Vue globale de la saison.
* Filtres : saison, CFA, période, statut, type d’événement.
* Indicateurs clés.
* Actions urgentes.
* Événements à arbitrer.
* Pipeline des événements.
* Prochains événements.
* Formations à pousser.
* Suivi de la collecte et du parcours prospect.
* Reporting rapide.

### Événements

* Liste des événements.
* Fiche événement complète.
* Statuts : veille, à arbitrer, devis demandé, devis reçu, validé, inscrit, à préparer, terminé, bilan à faire.
* Décision : à faire, en attente, refusé, à arbitrer, à refaire, à arrêter, à refaire sous conditions.
* Objectif de l’événement.
* Public cible.
* CFA concerné : IFIR, Sport, les deux.
* Responsable.
* Équipe mobilisée.
* Budget estimé et réel.
* Démarches en cours.
* Notes et commentaires.

### Documents

* Upload de documents dans l’outil.
* Classement par événement.
* Types : devis, facture, mail Outlook enregistré, info organisateur, stand, support communication, retour terrain, bilan, autre.
* Système de classification simple.

### Tâches

* Tâches liées à un événement.
* Responsable.
* Échéance.
* Statut.
* Priorité.
* Suivi des relances internes.

### PLV / matériaux / kits communication

* Inventaire PLV.
* Supports disponibles.
* Quantités.
* État : OK, à vérifier, à refaire, obsolète, manquant.
* Matériel à prendre par événement.
* Kit communication associé à chaque événement.
* Suivi des brochures par secteur.
* Réduction des dépenses inutiles sur goodies et impressions.

### Formations prioritaires

* Base des formations.
* CFA concerné.
* Secteur.
* Niveau.
* Lieu.
* Besoin de remplissage.
* Argument marché.
* Taux d’insertion ou élément valorisable si disponible.
* Sélection des formations à pousser par événement.
* Message clé par formation.

### Leads / CRM simple

* Leads collectés.
* Source / événement.
* Formation ou secteur d’intérêt.
* Niveau de maturité.
* Action attendue : rappel, rendez-vous, JPO, information, brochure.
* Statut : nouveau, à relancer, en cours, converti, perdu.
* Suivi des relances.

### Landing pages et formulaires

* Création de landing pages simples.
* Landing page liée à un événement, une JPO, une formation ou une campagne.
* Formulaires publics :

  * être rappelé ;
  * demander un rendez-vous ;
  * s’inscrire à une JPO ;
  * demander des informations ;
  * recevoir une brochure.
* Les landing pages sont développées dans l’outil.
* Les prospects n’accèdent pas à l’interface interne.

### Reporting / ROI

* Coût estimé.
* Coût réel.
* Nombre de leads.
* Leads qualifiés.
* Inscriptions JPO.
* Demandes de rappel.
* Candidatures éventuelles.
* Scans QR.
* Visites site autour de l’événement.
* Coût par lead.
* Coût par inscription JPO.
* ROI indicatif.
* Retour terrain.
* Décision après événement.

### Imports manuels

En V1, les intégrations automatiques peuvent être remplacées par des imports manuels ou champs de saisie.

* QR code : import manuel ou saisie des statistiques.
* Matomo : import manuel ou saisie des statistiques.
* Outlook : upload des mails enregistrés.
* Site : saisie ou import des indicateurs utiles.

## V1 exclue

Ne pas développer en V1 :

* authentification avancée ;
* déploiement serveur complet ;
* intégration Outlook automatique ;
* Microsoft Graph ;
* connexion API Matomo automatique ;
* connexion API outil QR code automatique ;
* portail employeur ;
* job board ;
* dépôt d’offres employeurs ;
* prise de rendez-vous RH employeur ;
* automatisations complexes ;
* envoi réel d’emails ;
* inscription administrative au CFA ;
* espace personnel candidat ;
* interface simplifiée complète par rôle.

## V2 possible

La V2 pourra inclure :

* interface simplifiée pour les chargées de formation ;
* gestion fine des rôles ;
* portail employeur ;
* offres d’alternance ;
* dépôt de besoin employeur ;
* rendez-vous d’accompagnement RH employeur ;
* intégration Outlook ;
* intégration Microsoft 365 ;
* intégration Matomo API ;
* intégration outil QR code ;
* notifications automatiques ;
* relances automatisées ;
* hébergement serveur ;
* usage multi-utilisateur sécurisé.

## Priorité produit

Le socle prioritaire est :

1. Événements.
2. Documents.
3. Tâches.
4. PLV / kits communication.
5. Formations prioritaires.
6. Landing pages / formulaires.
7. Leads / CRM.
8. Reporting / ROI.