import browser from "webextension-polyfill";
import { getGitHubOrigin } from "./lib/api.js";

export function isChrome() {
	return navigator.userAgent.includes("Chrome");
}

export async function isNotificationTargetPage(url) {
	const urlObject = new URL(url);
	return url.origin.includes("trello.com");
}

export function parseLinkHeader(header) {
	const links = {};
	for (const part of (header || "").split(",")) {
		const [sectionUrl = "", sectionName = ""] = part.split(";");
		const url = sectionUrl.replace(/<(.+)>/, "$1").trim();
		const name = sectionName.replace(/rel="(.+)"/, "$1").trim();
		if (name && url) {
			links[name] = url;
		}
	}

	return links;
}

const backgroundPage = browser.extension.getBackgroundPage() || window;

export const background = {
	log: backgroundPage.console.log,
	warn: backgroundPage.console.warn,
	error: backgroundPage.console.error,
	info: backgroundPage.console.info,
};
