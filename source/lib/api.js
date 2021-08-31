import optionsStorage from "../options-storage.js";
import { parseLinkHeader } from "../util.js";

export async function getTrelloOrigin() {
	const { rootUrl } = await optionsStorage.getAll();
	const { origin } = new URL(rootUrl);

	return origin || "https://trello.com";
}

export async function getTabUrl() {
	return `${await getTrelloOrigin()}/me/boards`;
}

export async function getParsedUrl(endpoint, parameters) {
	const api = await getTrelloOrigin();
	const { app_key, token } = await optionsStorage.getAll();

	parameters.key = app_key;
	parameters.token = token;

	const query = parameters
		? "?" + new URLSearchParams(parameters).toString()
		: "";
	return `${api}${endpoint}${query}`;
}

export async function getHeaders() {
	return {};
}

export async function makeApiRequest(endpoint, parameters) {
	const url = await getParsedUrl(endpoint, parameters);
	let response;
	try {
		response = await fetch(url, {
			headers: await getHeaders(),
		});
	} catch (error) {
		console.error(error);
		return Promise.reject(new Error("network error"));
	}

	const { status, headers } = response;

	if (status >= 500) {
		return Promise.reject(new Error("server error"));
	}

	if (status >= 400) {
		return Promise.reject(new Error("client error"));
	}

	try {
		const json = await response.json();
		return {
			headers,
			json,
		};
	} catch {
		return Promise.reject(new Error("parse error"));
	}
}

export async function getNotificationResponse({
	page = 0,
	maxItems = 100,
	lastModified = "",
}) {
	const parameters = {
		page,
		limit: maxItems,
	};

	if (lastModified) {
		parameters.since = lastModified;
	}

	return makeApiRequest("/1/members/me/notifications/unread", parameters);
}

export async function getNotifications({
	page,
	maxItems,
	lastModified,
	notifications = [],
}) {
	const { json } = await getNotificationResponse({
		page,
		maxItems,
		lastModified,
	});
	notifications = [...notifications, ...json];

	return notifications;
}

export async function getNotificationCount() {
	const { json: notifications } = await getNotificationResponse({});

	return {
		count: notifications.length,
		interval: null,
		lastModified: null,
	};
}
