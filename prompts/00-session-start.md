# Prompt 00 — Session start

Read:

* `AGENTS.md`
* `docs/MVP_SCOPE.md`
* `docs/DECISIONS.md`
* `docs/PREINSTALLED_TOOLS.md`
* `docs/DEPENDENCY_POLICY.md`

Do not modify any file.

Goal:

Start a clean Codex session for this project.

Checks to run:

* `rtk git status`
* `rtk pnpm build`

Rules for this session:

* Use RTK for verbose commands.
* Do not scan the entire repository.
* Do not inspect `node_modules`, `.next`, `uploads`, `imports`, `exports` or generated files unless explicitly asked.
* Do not add dependencies.
* Do not build V2 features.
* Do not build the simplified chargée de formation dashboard yet.
* Wait for a specific coding prompt before making changes.

Expected response:

Reply in 5 lines maximum with:

* current Git state;
* build result;
* whether the project is ready for a coding task;
* any blocker if present.
