<p align="center">
  <img src="https://img.shields.io/npm/v/%40kmjayadeep%2Fpi-jobs-done-sound?style=for-the-badge&color=7c3aed&labelColor=1e1b4b" alt="npm version">
  <img src="https://img.shields.io/npm/dm/%40kmjayadeep/pi-jobs-done-sound?style=for-the-badge&color=7c3aed&labelColor=1e1b4b" alt="npm downloads">
  <img src="https://img.shields.io/npm/l/%40kmjayadeep%2Fpi-jobs-done-sound?style=for-the-badge&color=7c3aed&labelColor=1e1b4b" alt="license">
  <img src="https://img.shields.io/github/actions/workflow/status/kmjayadeep/pi-jobs-done-sound/publish.yml?style=for-the-badge&label=CI&color=7c3aed&labelColor=1e1b4b" alt="CI status">
  <img src="https://img.shields.io/npm/types/%40kmjayadeep%2Fpi-jobs-done-sound?style=for-the-badge&color=7c3aed&labelColor=1e1b4b" alt="types">
</p>

<h1 align="center">🔔 pi-jobs-done-sound</h1>

<p align="center">
  <strong>A tiny <a href="https://pi.dev/">Pi</a> extension that plays a sound notification when Pi finishes an agent turn.</strong>
</p>

<p align="center">
  Kick off a long-running task, switch windows, and get an audible cue when the job is done — no more staring at the terminal waiting.
</p>

---

## ✨ Features

- 🎵 **Plays a completion sound** when Pi emits the `agent_end` event
- 🖥️ **Cross-platform** — Linux (`mpv`, `ffplay`, `mpg123`, `paplay`, `pw-play`), macOS (`afplay`)
- 🛎️ **Graceful fallback** to the terminal bell if no audio player is found
- 📦 **Self-contained** — ships its own `jobs_done.mp3`
- 🪶 **Zero configuration** — install and forget

## 📦 Install

```bash
# From npm (recommended)
pi install npm:@kmjayadeep/pi-jobs-done-sound

# From GitHub
pi install git:github.com/kmjayadeep/pi-jobs-done-sound
```

Then restart Pi, or run `/reload` in an existing Pi session.

## 🧪 Try without installing

```bash
pi -e npm:@kmjayadeep/pi-jobs-done-sound

# Or from GitHub
pi -e git:github.com/kmjayadeep/pi-jobs-done-sound
```

## 🔧 Requirements

| OS      | Players tried (in order)                    |
| ------- | ------------------------------------------- |
| Linux   | `mpv`, `ffplay`, `mpg123`, `paplay`, `pw-play` |
| macOS   | `afplay`                                    |

If none are available, it falls back to the **terminal bell** (`\x07`).

## 🧠 How it works

```ts
pi.on("agent_end", async () => {
  // play jobs_done.mp3
});
```

That's it. The extension hooks into Pi's event system and plays the bundled MP3 whenever Pi finishes processing your request.

## 📁 Package structure

```text
.
├── extension/
│   ├── index.ts          # Extension entry point
│   └── jobs_done.mp3     # Sound file
├── package.json
├── tsconfig.json
├── LICENSE
└── README.md
```

## 🛠️ Development

```bash
npm install
npm run typecheck
pi -e ./extension
```

## 📤 Publishing

New versions are published to npm via a GitHub Actions workflow using OIDC (no stored secrets!) with [npm provenance](https://docs.npmjs.com/generating-provenance-statements).

### One-time setup

1. Go to the **[npm publishers page](https://www.npmjs.com/settings/kmjayadeep/publishers)** for your account.
2. Click **Add Publisher**.
3. Enter your repo URL: `https://github.com/kmjayadeep/pi-jobs-done-sound`.
4. Confirm the OIDC connection.

This tells npm to trust OIDC tokens from GitHub Actions for this repository.

### Trigger a publish

Create and push a GitHub Release with a version tag (e.g. `v0.1.3`):

```bash
npm version patch && git push --tags origin main
```

Then create a GitHub Release from the tag on the [Releases page](https://github.com/kmjayadeep/pi-jobs-done-sound/releases) — the workflow fires automatically.

## 📄 License

[MIT](LICENSE) © [Jayadeep KM](https://github.com/kmjayadeep)
