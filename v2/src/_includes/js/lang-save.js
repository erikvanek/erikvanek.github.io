// Remembers the language picked in the selector; lang-infer.js reads it on the
// next visit to /. Without storage the links still work, the choice just is
// not remembered.
document.addEventListener("click", function (event) {
	var link = event.target && event.target.closest ? event.target.closest("a[data-lang-choice]") : null;
	if (!link) return;
	try {
		window.localStorage.setItem("ev:lang", link.getAttribute("data-lang-choice"));
	} catch (e) {}
});
