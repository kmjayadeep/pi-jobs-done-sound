/**
 * Pi Jobs Done Sound Extension
 *
 * Plays jobs_done.mp3 when Pi finishes an agent turn and is ready for input.
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { execFile } from "node:child_process";
import { access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const EXTENSION_DIR =
	typeof __dirname === "string"
		? __dirname
		: dirname(fileURLToPath(import.meta.url));
const SOUND_PATH = join(EXTENSION_DIR, "jobs_done.mp3");

/** Platform-appropriate audio players for MP3 playback, in priority order. */
const AUDIO_PLAYERS: string[] = [];
if (process.platform === "linux") {
	AUDIO_PLAYERS.push("mpv", "ffplay", "mpg123", "paplay", "pw-play");
} else if (process.platform === "darwin") {
	AUDIO_PLAYERS.push("afplay");
}

async function commandPath(command: string): Promise<string | null> {
	try {
		const { stdout } = await execFileAsync("which", [command], { timeout: 2000 });
		return stdout.trim() || null;
	} catch {
		return null;
	}
}

function argsForPlayer(player: string): string[] {
	const name = player.split("/").pop();
	switch (name) {
		case "mpv":
			return ["--no-video", "--really-quiet", SOUND_PATH];
		case "ffplay":
			return ["-nodisp", "-autoexit", "-loglevel", "quiet", SOUND_PATH];
		default:
			return [SOUND_PATH];
	}
}

async function playJobsDoneSound(): Promise<void> {
	await access(SOUND_PATH);

	for (const command of AUDIO_PLAYERS) {
		const player = await commandPath(command);
		if (!player) continue;

		try {
			await execFileAsync(player, argsForPlayer(player), { timeout: 10000 });
			return;
		} catch {
			// Some players may be installed but unable to play MP3 on a system.
			// Try the next candidate before falling back to the terminal bell.
		}
	}

	// Fallback: terminal bell (ASCII BEL).
	process.stdout.write("\x07");
}

export default function (pi: ExtensionAPI) {
	pi.on("agent_end", async () => {
		playJobsDoneSound().catch((err) => {
			console.error("[pi-jobs-done-sound] playback error:", err.message);
		});
	});
}
