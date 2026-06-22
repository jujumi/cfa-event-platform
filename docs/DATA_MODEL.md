# docs/DATA_MODEL.md

# Data model V1

## Principles

L’événement est l’objet central de l’application.

Le modèle doit rester simple, local, portable et compatible avec une V1 en SQLite.

La structure doit permettre une migration future vers une base plus adaptée à un usage serveur, sans bloquer le MVP local.

## Event

Représente un salon, une JPO, un forum, un webinaire, un événement partenaire ou un événement interne.

Champs principaux :

* id ;
* title ;
* cfaScope : IFIR, SPORT, BOTH ;
* eventType ;
* decisionStatus ;
* eventStatus ;
* eventDate ;
* durationDays ;
* location ;
* participantsIfir ;
* participantsSport ;
* budget ;
* budgetNotes ;
* notes ;
* createdAt ;
* updatedAt.

## Event decision status

La décision répond à la question : “Est-ce qu’on fait cet événement ?”

Valeurs autorisées :

* À étudier ;
* Validé ;
* Refusé ;
* Annulé.

## Event status

Le statut répond à la question : “Où en est l’événement ?”

Valeurs autorisées :

* À organiser ;
* Organisé ;
* Terminé.

“Terminé” signifie que l’événement a eu lieu ou que la date est passée.
Cela ne signifie pas que le bilan ou le reporting sont complets.

## Event checklist group

Un événement peut avoir plusieurs groupes de checklist.

Groupes attendus :

* Admin ;
* Com ;
* Orga opérationnelle ;
* Bilan / Reporting.

Champs principaux :

* id ;
* eventId ;
* groupType ;
* label ;
* createdAt ;
* updatedAt.

Selon l’implémentation choisie, les groupes peuvent être matérialisés explicitement ou déduits depuis les items.

## Event checklist item

Tâche de checklist liée à un événement.

Champs principaux :

* id ;
* eventId ;
* groupType : admin, communication, operational, reporting ;
* label ;
* isChecked ;
* sortOrder ;
* createdAt ;
* updatedAt.

Les items doivent pouvoir être modifiés plus tard depuis la fiche événement.

## Completion calculation

La complétion est calculée depuis les items de checklist.

Avant l’événement, la complétion affichée dans la liste courte est calculée depuis :

* Admin ;
* Com ;
* Orga opérationnelle.

Après la date de l’événement, ou lorsque le statut est “Terminé”, la complétion affichée dans la liste courte est calculée depuis :

* Bilan / Reporting.

La liste courte n’affiche qu’un seul pourcentage de complétion.

Admin, Com et Orga peuvent être affichés séparément comme pourcentages de préparation.

## Default checklist templates

Deux templates de départ sont nécessaires :

* Salon / événement externe ;
* JPO.

Chaque template doit générer des items par défaut dans les groupes :

* Admin ;
* Com ;
* Orga opérationnelle ;
* Bilan / Reporting.

Les templates doivent rester modifiables plus tard.

## Document

Document uploadé dans l’application et classé.

Champs principaux :

* id ;
* eventId ;
* title ;
* documentType : quote, invoice, email, organizer_info, stand_info, communication_asset, feedback, report, other ;
* filePath ;
* originalFileName ;
* uploadedAt ;
* notes.

## Task

Tâche interne liée à un événement ou à l’organisation générale.

Champs principaux :

* id ;
* eventId ;
* title ;
* description ;
* assignee ;
* dueDate ;
* status : todo, in_progress, done, blocked ;
* priority : low, medium, high, urgent ;
* createdAt ;
* updatedAt.

Les tâches générales restent distinctes des checklists d’événement.

Les checklists servent au suivi standardisé de préparation et de bilan.
Les tâches servent aux actions spécifiques, ponctuelles ou assignées.

## Material

PLV, support ou matériel de communication.

Champs principaux :

* id ;
* name ;
* cfaScope : IFIR, SPORT, BOTH ;
* materialType ;
* quantity ;
* storageLocation ;
* status : ok, to_check, to_update, obsolete, missing ;
* notes ;
* createdAt ;
* updatedAt.

## EventMaterial

Matériel prévu pour un événement.

Champs principaux :

* id ;
* eventId ;
* materialId ;
* quantityPlanned ;
* quantityReturned ;
* notes.

## Formation

Formation suivie dans l’outil.

Champs principaux :

* id ;
* name ;
* cfaScope : IFIR, SPORT, BOTH ;
* sector ;
* level ;
* location ;
* priorityLevel ;
* fillingNeed ;
* insertionInfo ;
* marketArgument ;
* notes ;
* createdAt ;
* updatedAt.

## EventFormation

Formation sélectionnée pour être mise en avant sur un événement.

Champs principaux :

* id ;
* eventId ;
* formationId ;
* reasonToPush ;
* keyMessage ;
* priority ;
* notes.

## Lead

Contact prospect collecté via salon, formulaire, landing page ou action terrain.

Champs principaux :

* id ;
* eventId ;
* landingPageId ;
* firstName ;
* lastName ;
* email ;
* phone ;
* profileType : young, parent, employer, partner, other ;
* cfaInterest : IFIR, SPORT, BOTH, unknown ;
* formationInterest ;
* maturity : cold, warm, hot ;
* desiredAction : callback, appointment, jpo, info, brochure ;
* status : new, to_contact, contacted, in_progress, converted, lost ;
* consent ;
* notes ;
* createdAt ;
* updatedAt.

## LandingPage

Landing page simple liée à un événement, une JPO, une formation ou une action.

Champs principaux :

* id ;
* eventId ;
* title ;
* slug ;
* target ;
* introText ;
* ctaLabel ;
* isPublished ;
* createdAt ;
* updatedAt.

## FormSubmission

Réponse à un formulaire public.

Champs principaux :

* id ;
* landingPageId ;
* leadId ;
* submittedAt ;
* actionType ;
* message ;
* rawData.

## EventReport

Bilan d’un événement.

Champs principaux :

* id ;
* eventId ;
* contactsCount ;
* qualifiedLeadsCount ;
* jpoRegistrationsCount ;
* callbackRequestsCount ;
* applicationsCount ;
* qrScans ;
* siteVisitsAroundEvent ;
* humanTimeEstimate ;
* qualitativeFeedback ;
* roiComment ;
* finalDecision : repeat, stop, repeat_with_conditions, unknown ;
* createdAt ;
* updatedAt.

Le reporting détaillé ne doit pas apparaître dans la liste courte des événements.
Il doit être consulté dans la fiche événement ou dans la page Reporting.

## StatImport

Import manuel ou semi-manuel de statistiques.

Champs principaux :

* id ;
* eventId ;
* source : qr_code_tool, matomo, manual, other ;
* importDate ;
* label ;
* value ;
* notes.
