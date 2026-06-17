# docs/DATA_MODEL.md

# Data model V1

## Event

Objet central de l’application.

Représente un salon, une JPO, un forum, un événement partenaire ou un événement interne.

Champs principaux :

* id
* title
* cfaScope : IFIR, SPORT, BOTH
* eventType
* status
* decisionStatus
* priority
* startDate
* endDate
* location
* organizerName
* organizerContact
* mainGoal
* expectedOutcome
* targetAudience
* owner
* teamNotes
* budgetEstimated
* budgetActual
* notes
* createdAt
* updatedAt

## Document

Document uploadé dans l’application et classé.

Champs principaux :

* id
* eventId
* title
* documentType : quote, invoice, email, organizer_info, stand_info, communication_asset, feedback, report, other
* filePath
* originalFileName
* uploadedAt
* notes

## Task

Tâche interne liée à un événement ou à l’organisation générale.

Champs principaux :

* id
* eventId
* title
* description
* assignee
* dueDate
* status : todo, in_progress, done, blocked
* priority : low, medium, high, urgent
* createdAt
* updatedAt

## Material

PLV, support ou matériel de communication.

Champs principaux :

* id
* name
* cfaScope : IFIR, SPORT, BOTH
* materialType
* quantity
* storageLocation
* status : ok, to_check, to_update, obsolete, missing
* notes
* createdAt
* updatedAt

## EventMaterial

Matériel prévu pour un événement.

Champs principaux :

* id
* eventId
* materialId
* quantityPlanned
* quantityReturned
* notes

## Formation

Formation suivie dans l’outil.

Champs principaux :

* id
* name
* cfaScope : IFIR, SPORT, BOTH
* sector
* level
* location
* priorityLevel
* fillingNeed
* insertionInfo
* marketArgument
* notes
* createdAt
* updatedAt

## EventFormation

Formation sélectionnée pour être mise en avant sur un événement.

Champs principaux :

* id
* eventId
* formationId
* reasonToPush
* keyMessage
* priority
* notes

## Lead

Contact prospect collecté via salon, formulaire, landing page ou action terrain.

Champs principaux :

* id
* eventId
* landingPageId
* firstName
* lastName
* email
* phone
* profileType : young, parent, employer, partner, other
* cfaInterest : IFIR, SPORT, BOTH, unknown
* formationInterest
* maturity : cold, warm, hot
* desiredAction : callback, appointment, jpo, info, brochure
* status : new, to_contact, contacted, in_progress, converted, lost
* consent
* notes
* createdAt
* updatedAt

## LandingPage

Landing page simple liée à un événement, une JPO, une formation ou une action.

Champs principaux :

* id
* eventId
* title
* slug
* target
* introText
* ctaLabel
* isPublished
* createdAt
* updatedAt

## FormSubmission

Réponse à un formulaire public.

Champs principaux :

* id
* landingPageId
* leadId
* submittedAt
* actionType
* message
* rawData

## EventReport

Bilan d’un événement.

Champs principaux :

* id
* eventId
* contactsCount
* qualifiedLeadsCount
* jpoRegistrationsCount
* callbackRequestsCount
* applicationsCount
* qrScans
* siteVisitsAroundEvent
* humanTimeEstimate
* qualitativeFeedback
* roiComment
* finalDecision : repeat, stop, repeat_with_conditions, unknown
* createdAt
* updatedAt

## StatImport

Import manuel ou semi-manuel de statistiques.

Champs principaux :

* id
* eventId
* source : qr_code_tool, matomo, manual, other
* importDate
* label
* value
* notes


