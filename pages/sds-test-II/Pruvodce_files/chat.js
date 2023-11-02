var chatbotStyleElement = document.createElement('style');
chatbotStyleElement.innerHTML = "#botmedia-chat-widget {\n    display: block !important;\n}\n\n#botmedia-chat-note {\n    background: white;\n    overflow: hidden;\n    max-width: 380px;\n    border: 0;\n    position: fixed;\n    bottom: 145px;\n    right: 35px;\n    padding: 20px 20px;\n    border-radius: 10px;\n    box-shadow: 0 0 15px rgba(0,0,0,0.3);\n    display: none;\n    font-size: 14px;\n    color: #000;\n    z-index: 1000000000;\n}\n\n#botmedia-chat-content {\n    background: white;\n    overflow: hidden;\n    width: 400px;\n    border: 0px;\n    height: 450px;\n    position: fixed;\n    bottom: 25px;\n    right: 25px;\n    border-radius: 10px;\n    box-shadow: 0 0 15px rgba(0,0,0,0.3);\n    display: none;\n    z-index: 1000000000;\n}\n\n@media (max-height: 600px) {\n    #botmedia-chat-content {\n        bottom: 0px;\n        right: 0px;\n        height: 100%;\n        top: 0;\n        border-radius: 00px;\n    }\n}\n\n#botmedia-chat-content iframe {\n    border: 0;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n}\n\n#botmedia-chat-close {\n    height: 20px;\n    width: 20px;\n    position: absolute;\n    right: 0px;\n    top: 0px;\n    margin: 15px;\n    cursor: pointer;\n}\n\n#botmedia-chat-maximize {\n    height: 20px;\n    width: 20px;\n    position: absolute;\n    right: 35px;\n    top: 0px;\n    margin: 15px;\n    cursor: pointer;\n}\n\n#botmedia-chat-button {\n    background: transparent;\n    position: fixed;\n    bottom: 35px;\n    right: 35px;\n    height: 100px;\n    width: 100px;\n    border-radius: 50px;\n    cursor: pointer;\n    background-size: 40px;\n    box-shadow: 0 0 15px rgba(0,0,0,0.3);\n    z-index: 1000000000;\n}\n\n#botmedia-chat-button svg,\n#botmedia-chat-button img {\n    border: 0;\n    margin: 0px auto;\n    padding: 0;\n    height: 100px;\n    display: block;\n    border-radius: 50px;\n}\n\n#botmedia-chat-close svg,\n#botmedia-chat-maximize svg {\n    fill: black;\n}\n\n#botmedia-chat-maximize {\n    display: block;\n}\n\n@media (max-width: 640px) {\n    #botmedia-chat-button {\n        bottom: 15px;\n        right: 15px;\n        height: 80px;\n        width: 80px;\n        background-size: 35px;\n    }\n\n    #botmedia-chat-note {\n        right: 15px;\n        bottom: 105px;\n        margin-left: 15px;\n    }\n\n    #botmedia-chat-button svg,\n    #botmedia-chat-button img {\n        margin: 0px auto;\n        height: 80px;\n    }\n\n    #botmedia-chat-content {\n        position: fixed;\n        width: 100%;\n        top: 0;\n        bottom: 0;\n        right: 0;\n        left: 0;\n        height: 100%;\n        border: 0;\n        border-radius: 0;\n    }\n\n    #botmedia-chat-maximize {\n        display: none;\n    }\n}\n\n#botmedia-chat-widget.maximized #botmedia-chat-content {\n    position: fixed;\n    width: 100%;\n    top: 0;\n    bottom: 0;\n    right: 0;\n    left: 0;\n    height: 100%;\n    border: 0;\n    border-radius: 0;\n}\n\n#botmedia-chat-exit {\n    background: white;\n    height: 30px;\n    width: 30px;\n    border: 0;\n    position: absolute;\n    right: -5px;\n    top: -5px;\n    box-shadow: 0 0 15px rgba(0,0,0,0.3);\n    border-radius: 15px;\n    z-index: 1000000001;\n}\n\n#botmedia-chat-exit svg,\n#botmedia-chat-exit img {\n    height: 10px;\n    top: 0;\n    margin: 10px auto;\n    padding: 0;\n    border: 0;\n}\n";

var chatbotBodyData = "\n" +
    "<div id=\"botmedia-chat-widget\" style='display:none'>\n" +
    "    <div id=\"botmedia-chat-button\">\n" +
    (typeof(window.bChat) != "undefined" && typeof(window.bChat.exitButton) != "undefined" && window.bChat.exitButton ?
    "        <div id=\"botmedia-chat-exit\">\n" +
    "            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"15px\" height=\"15px\" viewBox=\"0 0 612 612\" xml:space=\"preserve\">\n" +
    "            <g><g id=\"cross\"><g><polygon points=\"612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397 306,341.411 576.521,611.397 612,575.997 341.459,306.011\"/></g></g></g>\n" +
    "            </svg>\n" +
    "        </div>\n" : "") +
    "        <img alt=\"avatar obrazek" + (typeof(window.bChat) != "undefined" && typeof(window.bChat.text) != "undefined" ? window.bChat.text.replace(/[\"<>]/g, function (a) { return { '"': '&quot;', '<': '&lt;', '>': '&gt;' }[a]; }) : "") + "\" src=\"" + (typeof(window.bChat) != "undefined" && typeof(window.bChat.image) != "undefined" ? window.bChat.image : "") + "\" />\n" +
    "    </div>\n" +
    (typeof(window.bChat) != "undefined" && typeof(window.bChat.text) != "undefined" ? "<div id=\"botmedia-chat-note\">" + window.bChat.text.replace(/[\"<>]/g, function (a) { return { '"': '&quot;', '<': '&lt;', '>': '&gt;' }[a]; }) + "</div>" : "") +
    "    <div id=\"botmedia-chat-content\">\n" +
    "        <iframe id=\"botmedia-chat-frame\"></iframe>\n" +
    "        <div id=\"botmedia-chat-close\">\n" +
    "            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"15px\" height=\"15px\" viewBox=\"0 0 612 612\" xml:space=\"preserve\">\n" +
    "            <g><g id=\"cross\"><g><polygon points=\"612,36.004 576.521,0.603 306,270.608 35.478,0.603 0,36.004 270.522,306.011 0,575.997 35.478,611.397 306,341.411 576.521,611.397 612,575.997 341.459,306.011\"/></g></g></g>\n" +
    "            </svg>\n" +
    "        </div>\n" +
    "        <div id=\"botmedia-chat-maximize\">\n" +
    "            <svg version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\" width=\"15px\" height=\"15px\" viewBox=\"0 0 320 320\" xml:space=\"preserve\">\n" +
    "            <g><g id=\"max\"><g><polygon points=\"125.007,180.849 20,285.857 20,203.401 0,203.401 0,320 116.599,320 116.599,300 34.142,300 139.15,194.992 \"/><polygon points=\"203.401,0 203.401,20 285.855,20 180.85,125.005 194.993,139.148 300,34.14 300,116.599 320,116.599 320,0 \"/><polygon points=\"20,34.142 125.006,139.148 139.149,125.006 34.143,20 116.599,20 116.599,0 0,0 0,116.599 20,116.599 \"/><polygon points=\"300,285.855 194.994,180.849 180.851,194.991 285.86,300 203.401,300 203.401,320 320,320 320,203.401 300,203.401 \"/></g>\n</g></g>\n" +
    "            </svg>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>";

var chatbotBodyDiv = document.createElement("div");
chatbotBodyDiv.innerHTML = chatbotBodyData;

var bchatbot = {
    initialized: false,
    closeButton: null,
    chatContent: null,
    chatButton: null,
    chatWidget: null,
    exitWidget: null,
    maxButton: null,
    chatFrame: null,
    chatNote: null,
    isOpen: false,
    isFirstOpen: true,
    showChatNote: true,
    sessionPrefix: "",
    url: window.location.protocol + "//chatbot.mpsv.cz/chat/",

    init: function() {
        var self = this;
        if (self.initialized) {
            self.open();
            return;
        }

        self.initialized = true;

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.sessionKey) != "undefined" && window.bChat.sessionKey.length > 0) {
            self.sessionPrefix = window.bChat.sessionKey + "-";
        }

        var ts = Math.round((new Date()).getTime() / 1000);
        if (localStorage && localStorage.getItem(self.sessionPrefix + "botmedia-session-start") === null) {
            localStorage.setItem(self.sessionPrefix + "botmedia-session-start", ts);
        }
        if (localStorage && localStorage.getItem(self.sessionPrefix + "botmedia-session-start") !== null) {
            var originalTs = localStorage.getItem(self.sessionPrefix + "botmedia-session-start");
            var elapsedMinutes = (ts - originalTs) / 60;
            if (elapsedMinutes > 1576800) {
                this.resetSession();
            }
        }

        if (sessionStorage && typeof(window.bChat) != "undefined" && typeof(window.bChat.exitButton) != "undefined" && window.bChat.exitButton) {
            var isExit = sessionStorage.getItem(self.sessionPrefix + "botmedia-chat-exit") === "1";
            if (isExit) {
                return;
            }
        }

        document.body.appendChild(chatbotStyleElement);
        document.body.appendChild(chatbotBodyDiv);

        self.closeButton = document.getElementById("botmedia-chat-close");
        self.maxButton = document.getElementById("botmedia-chat-maximize");

        self.chatContent = document.getElementById("botmedia-chat-content");
        self.chatButton = document.getElementById("botmedia-chat-button");
        self.chatFrame = document.getElementById("botmedia-chat-frame");
        self.chatNote = document.getElementById("botmedia-chat-note");
        self.chatWidget = document.getElementById("botmedia-chat-widget");
        self.exitWidget = document.getElementById("botmedia-chat-exit");

        // events
        self.maxButton.addEventListener('click', function (event) {
            event.preventDefault();
            self.maximize();
        }, false);
        self.closeButton.addEventListener('click', function (event) {
            event.preventDefault();
            self.close();
        }, false);
        self.chatButton.addEventListener('click', function (event) {
            event.preventDefault();
            self.toggle();
        }, false);

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.exitButton) != "undefined" && window.bChat.exitButton) {
            self.exitWidget.addEventListener('click', function (event) {
                event.preventDefault();
                self.exit();
                event.stopImmediatePropagation();
            }, false);
        }

        var alreadyUsed = (localStorage && localStorage.getItem(self.sessionPrefix + "botmedia-chat-used") === "1");

        if (localStorage) {
            self.isOpen = localStorage.getItem(self.sessionPrefix + "botmedia-chat-open") === "1";
        }

        if (localStorage) {
            self.showChatNote = !alreadyUsed;
        }

        // restore
        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.autoOpen) != "undefined" && window.bChat.autoOpen && !alreadyUsed) {
            self.isOpen = true;
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.autoOpen) != "undefined" && window.bChat.autoOpen === false) {
            self.isOpen = false;
        }

        // restore state
        if (self.isOpen) {
            self.open();
        } else if (self.showChatNote) {
            self.showNote();
        }
    },
    resetSession: function() {
        var self = this;
        if (localStorage) {
            localStorage.removeItem(self.sessionPrefix + "messages");
            localStorage.removeItem(self.sessionPrefix + "identity-expiry");
            localStorage.removeItem(self.sessionPrefix + "botmedia-chat-open");
            localStorage.removeItem(self.sessionPrefix + "botmedia-chat-used");
            localStorage.removeItem(self.sessionPrefix + "botmedia-session-start");
        }
        if (sessionStorage) {
            sessionStorage.removeItem(self.sessionPrefix + "botmedia-chat-exit");
        }
    },
    loadChat: function() {
        var self = this;
        var url = self.url + "?";

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.skipWelcome) != "undefined" && window.bChat.skipWelcome > 0) {
            url += "force=1&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.noHistory) != "undefined" && window.bChat.noHistory) {
            url += "history=0&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.sessionKey) != "undefined" && window.bChat.sessionKey.length > 0) {
            url += "session_key=" + encodeURIComponent(window.bChat.sessionKey) + "&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.welcomeRef) != "undefined" && window.bChat.welcomeRef.length > 0) {
            url += "welcome_ref=" + encodeURIComponent(window.bChat.welcomeRef) + "&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.ref) != "undefined" && window.bChat.ref.length > 0) {
            url += "ref=" + encodeURIComponent(window.bChat.ref) + "&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.primaryColor) != "undefined" && window.bChat.primaryColor.length > 0) {
            url += "primary_color=" + encodeURIComponent(window.bChat.primaryColor) + "&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.secondaryColor) != "undefined" && window.bChat.secondaryColor.length > 0) {
            url += "secondary_color=" + encodeURIComponent(window.bChat.secondaryColor) + "&";
        }

        if (typeof(window.bChat) != "undefined" && typeof(window.bChat.font) != "undefined" && window.bChat.font.length > 0) {
            url += "font=" + encodeURIComponent(window.bChat.font) + "&";
        }

        self.chatFrame.src = url;
    },
    showNote: function() {
        var self = this;

        if (self.chatNote) {
            self.chatNote.style.display = 'block';
        }
    },
    hideNote: function() {
        var self = this;
        if (self.chatNote) {
            self.chatNote.style.display = 'none';
        }
    },
    exit: function() {
        var self = this;
        document.getElementById("botmedia-chat-button").style.display = 'none';
        var noteElement = document.getElementById("botmedia-chat-note");
        if (noteElement) {
            noteElement.style.display = 'none';
        }
        if (sessionStorage) {
            sessionStorage.setItem(self.sessionPrefix + "botmedia-chat-exit", "1");
        }
    },
    open: function() {
        var self = this;
        self.chatContent.style.display = 'block';
        self.isOpen = true;
        self.hideNote();

        if (localStorage) {
            localStorage.setItem(self.sessionPrefix + "botmedia-chat-open", self.isOpen ? "1" : "0");
            localStorage.setItem(self.sessionPrefix + "botmedia-chat-used", "1");
        }

        if (self.isFirstOpen) {
            self.loadChat();
            self.isFirstOpen = false;
        }

        // change <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    },
    close: function() {
        var self = this;
        self.chatContent.style.display = 'none';
        self.isOpen = false;
        self.hideNote();

        if (localStorage) {
            localStorage.setItem(self.sessionPrefix + "botmedia-chat-open", self.isOpen ? "1" : "0");
            localStorage.setItem(self.sessionPrefix + "botmedia-chat-used", "1");
        }
    },
    hide: function() {
        var self = this;
        document.getElementById("botmedia-chat-button").style.display = 'none';
        self.close();
    },
    show: function() {
        var self = this;
        document.getElementById("botmedia-chat-button").style.display = 'block';
    },
    toggle: function() {
        var self = this;
        if (self.isOpen) {
            self.close();
        } else {
            self.open();
        }
    },
    maximize: function() {
        var self = this;
        self.chatWidget.classList.toggle("maximized");
    }
};

if (typeof(window.bChat) != "undefined" && typeof(window.bChat.noAutoInit) != "undefined" && window.bChat.noAutoInit) {
} else {
    // load
    if (document.readyState === "complete" || document.readyState === "interactive") {
        bchatbot.init();
    } else {
        document.addEventListener("DOMContentLoaded", function() {
            bchatbot.init();
        });
    }
}
