// Inlined in <head> of / only, so the redirect happens before anything paints.
// Goes to /cs/ (the script's data-cs, path prefix included) when either
//   - the visitor chose Czech with the selector before, or
//   - this is their first visit to / and their browser prefers Czech
//     (Czech comes before English in navigator.languages).
// A saved choice of English always stays here. Every storage access is
// wrapped in try/catch: with storage blocked the site still works, and the
// referrer check keeps a visitor who clicked English from bouncing back.
(function () {
	var LANG_KEY = "ev:lang";
	var SEEN_KEY = "ev:seen";
	var script = document.currentScript;
	var csHref = script && script.getAttribute("data-cs");
	if (!csHref) return;

	var saved = null;
	var seen = false;
	try {
		saved = window.localStorage.getItem(LANG_KEY);
		seen = window.localStorage.getItem(SEEN_KEY) === "1";
	} catch (e) {}
	try {
		window.localStorage.setItem(SEEN_KEY, "1");
	} catch (e) {}

	var fromThisSite = false;
	try {
		fromThisSite = !!document.referrer && new URL(document.referrer).origin === window.location.origin;
	} catch (e) {}

	function prefersCzech() {
		var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
		for (var i = 0; i < langs.length; i++) {
			var tag = String(langs[i]).toLowerCase();
			if (tag === "cs" || tag.indexOf("cs-") === 0) return true;
			if (tag === "en" || tag.indexOf("en-") === 0) return false;
		}
		return false;
	}

	var goCzech = saved === "cs" || (saved !== "en" && !seen && !fromThisSite && prefersCzech());
	if (goCzech) window.location.replace(csHref + window.location.search + window.location.hash);
})();
