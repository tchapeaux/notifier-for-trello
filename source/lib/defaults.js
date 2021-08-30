export const notificationReasons = new Map([
	["subscribed", "You are watching the repository"],
	["manual", "You are subscribed to this thread"],
	["author", "You created this thread"],
	["comment", "You commented on this thread"],
	["mention", "New updates from thread"],
	["team_mention", "New updates from thread"],
	["state_change", "Thread status changed"],
	["assign", "You were assigned to the thread"],
	["security_alert", "New security vulnerability found"],
	["invitation", "You accepted an invitation"],
	["review_requested", "PR Review Requested"],
]);

export const errorTitles = new Map([
	[
		"missing token",
		"Missing access token, please create one and enter it in Options",
	],
	["server error", "GitHub having issues serving requests"],
	["client error", "Invalid token, enter a valid one"],
	["network error", "You have to be connected to the Internet"],
	["parse error", "Unable to handle server response"],
	["default", "Unknown error"],
]);

export const errorSymbols = new Map([
	["missing token", "X"],
	["client error", "!"],
	["default", "?"],
]);

export const warningTitles = new Map([
	["default", "Unknown warning"],
	["offline", "No Internet connnection"],
]);

export const warningSymbols = new Map([
	["default", "warn"],
	["offline", "off"],
]);

export const colors = new Map([
	["default", [3, 102, 214, 255]],
	["error", [203, 36, 49, 255]],
	["warning", [245, 159, 0, 255]],
]);

export function getBadgeDefaultColor() {
	return colors.get("default");
}

export function getBadgeErrorColor() {
	return colors.get("error");
}

export function getBadgeWarningColor() {
	return colors.get("warning");
}

export function getWarningTitle(warning) {
	return warningTitles.get(warning) || warningTitles.get("default");
}

export function getWarningSymbol(warning) {
	return warningSymbols.get(warning) || warningSymbols.get("default");
}

export function getErrorTitle(error) {
	return errorTitles.get(error.message) || errorTitles.get("default");
}

export function getErrorSymbol(error) {
	return errorSymbols.get(error.message) || errorSymbols.get("default");
}

export function getNotificationReasonText(reason) {
	return notificationReasons.get(reason) || "";
}

export const defaultTitle = "Notifier for Trello";
