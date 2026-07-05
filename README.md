# pi-jobs-done-sound

A tiny [Pi](https://pi.dev/) extension that plays a short sound when Pi finishes an agent turn and is ready for your next instruction.

Useful when you kick off a longer task, switch windows, and want an audible cue when the job is done.

## Install

```bash
pi install git:github.com/kmjayadeep/pi-jobs-done-sound
```

Then restart Pi, or run `/reload` in an existing Pi session.

## Try without installing

```bash
pi -e git:github.com/kmjayadeep/pi-jobs-done-sound
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

## License

MIT
