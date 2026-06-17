# Dependency policy

## Goal

Use free, local-first and open-source dependencies when they reduce development time, reduce Codex token usage or avoid fragile custom code.

Do not install tools that require paid hosting, paid accounts or complex setup for the V1 demo.

## Preferred approach

Before coding a complex feature, check if a maintained open-source package already solves it.

Prefer packages for:

* tables and data grids;
* forms and validation;
* file uploads;
* CSV import/export;
* charts;
* calendars/date pickers;
* markdown or rich text editing;
* QR code demo generation;
* local search/filtering.

## Avoid

Avoid dependencies that:

* require a paid account;
* require cloud hosting;
* are abandoned or poorly maintained;
* add too much complexity;
* force a full architecture change;
* solve only a tiny problem that can be coded simply.

## Dependency proposal format

Before adding a non-trivial dependency, explain:

* package name;
* feature covered;
* why it saves time;
* whether it is required or optional;
* install command;
* possible downside.

## V1 integrations

For V1, prefer manual import over API integration when the API would slow the MVP.

Accepted V1 shortcuts:

* upload saved Outlook emails instead of Microsoft Graph integration;
* manual QR stats import or fields instead of API connection;
* manual Matomo export/import or fields instead of API connection;
* local file storage instead of SharePoint integration;
* simple local landing pages instead of an external landing page builder.
