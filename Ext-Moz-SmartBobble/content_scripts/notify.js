
function notify(message) {
	var type = message.type;
	if(type == "commande"){
		var icone = "icons/beasts-48.png";
	}
	else if(type == "info"){
		var icone = "icons/beasts-32.png";
	}
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL(icone),
    "title": message.title,
    "message": message.content
  });
}
browser.runtime.onMessage.addListener(notify);
