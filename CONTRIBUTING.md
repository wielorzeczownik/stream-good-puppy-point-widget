# Contributing

Every contribution helps, including a typo fix, a bug report, or a question about how something works. For anything bigger than a small fix, opening an issue first is a good idea, so we can agree on the approach before you spend time on it.

## Setup

```bash
git clone https://github.com/wielorzeczownik/stream-good-puppy-point-widget.git
cd stream-good-puppy-point-widget
npm ci
npm run dev
```

`npm run dev` opens a local preview with a panel that fires the chat command, Channel Points, Bits and the minus command, and lets you change the text and colours on the fly. You don't need a stream or a StreamElements account to work on the widget.

To try a build in StreamElements, run `npm run build` and paste the files from `widget/dist/` into a custom widget, as described in the [README](README.md#streamelements-custom-widget).

## Checks

CI runs these on every pull request. You don't have to run them all locally, since CI will point out anything that's off:

```bash
npm run format:check
npm run lint
npm run lint:scss
npm run typecheck
npm test
npm run build

shfmt --diff scripts/
shellcheck scripts/*.sh
actionlint
markdownlint-cli2 "**/*.md" '!node_modules/**' '!CHANGELOG.md'
```

`npm run fix` fixes whatever eslint, stylelint and prettier can fix on their own.

## Tests

Tests are vitest suites in `tests/`, mirroring `widget/src/scripts/`.

## Commits and pull requests

Commits follow [Conventional Commits](https://www.conventionalcommits.org/) (`feat: ...`, `fix: ...`), because the changelog and version bumps are generated from them. Don't worry if you get the prefix wrong, it can be fixed before merging.

Smaller PRs that do one thing are easier to review. Tests for behavior changes are very welcome. If you're not sure how to test something, open the PR anyway and we'll work it out together.

Bugs and ideas go to [issues](https://github.com/wielorzeczownik/stream-good-puppy-point-widget/issues). Security problems go through [SECURITY.md](SECURITY.md).

Contributions are licensed under the [MIT License](LICENSE).
