# pi-jobs-done-sound

A tiny [Pi](https://pi.dev/) extension that plays a short sound when Pi finishes an agent turn and is ready for your next instruction.

Useful when you kick off a longer task, switch windows, and want an audible cue when the job is done.

## Install from GitHub (quick)

```bash
pi install git:github.com/kmjayadeep/pi-jobs-done-sound
```

Then restart Pi, or run `/reload` in an existing Pi session.

## Install from npm

```bash
pi install npm:@kmjayadeep/pi-jobs-done-sound
```

## Install

```bash
pi install git:github.com/kmjayadeep/pi-jobs-done-sound
```

Then restart Pi, or run `/reload` in an existing Pi session.

## Try without installing

```bash
pi -e git:github.com/kmjayadeep/pi-jobs-done-sound

# Or from npm
pi -e npm:@kmjayadeep/pi-jobs-done-sound
```

## Requirements

The extension includes `extension/jobs_done.mp3` and tries these players:

- Linux: `mpv`, `ffplay`, `mpg123`, `paplay`, `pw-play`
- macOS: `afplay`

If no player works, it falls back to the terminal bell.

## How it works

The extension listens for Pi's `agent_end` event and plays the bundled MP3:

```ts
pi.on("agent_end", async () => {
  // play jobs_done.mp3
});
```

## Package structure

```text
.
├── extension/
│   ├── index.ts
│   └── jobs_done.mp3
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

`package.json` declares this as a Pi package with:

```json
{
  "keywords": ["pi-package", "pi-extension"],
  "pi": {
    "extensions": ["./extension"]
  }
}
```

## Development

```bash
npm install
npm run typecheck
pi -e ./extension
```

## Publishing

New versions are published to npm via a GitHub Actions workflow that uses OIDC for authentication and [npm provenance](https://docs.npmjs.com/generating-provenance-statements) — no stored secrets needed.

### Prerequisites

Before the first publish, set up an npm publisher on npmjs.com:

1. Go to **[npm publishers page](https://www.npmjs.com/settings/kmjayadeep/publishers)** for your account.
2. Click **"Add Publisher"**.
3. Enter your GitHub repository URL:
   `https://github.com/kmjayadeep/pi-jobs-done-sound`.
4. Confirm the OIDC connection.

This tells npm to trust OIDC tokens from GitHub Actions for this repo.

### Trigger a publish

Create and push a GitHub Release (with a tag like `v0.1.0`). The workflow at `.github/workflows/publish.yml` runs automatically:

```bash
# Tag and push
cd pi-jobs-done-sound
npm version patch    # bumps to 0.1.1, creates a git tag
git push --tags origin main
```

Then create a GitHub Release from the tag on the [Releases page](https://github.com/kmjayadeep/pi-jobs-done-sound/releases) — this triggers the publish workflow.

### Workflow details

- Uses `npm publish --provenance` with `id-token: write` for OIDC.
- Runs on `release` events (tag published) and can be triggered manually via the GitHub UI.
- Runs type checking before publishing.

## License

MIT
