browser.tabs.executeScript(null, { file: "/content_scripts/smartbubble-actor.js" });

document.addEventListener("click", (e) => { //retour boutons
	var confiance = document.getElementById('confidenceAmount').value;
	var maxjour = document.getElementById('jourmax').value;
	var algo = document.getElementById('algo').value;
	var pxvente = document.getElementById('pxvente').value;
	var pxachat = document.getElementById('pxachat').value;
	var ctlancement = document.getElementById('ctlancement').value;
	var ctfixe = document.getElementById('ctfixe').value;
	var ctrupture = document.getElementById('ctrupture').value;
	var possession = document.getElementById('possession').value;
	
	
	for(var i = 0; i < 5 ;i++){ //get profil from checkboxes
		if(document.getElementsByName('role')[i].checked == true){ var profil = document.getElementsByName('role')[i].value; }
	}
	
	if (e.target.id == 'button_launch_smart') { //bouton start
		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {buttonstatus: 'start',algo: algo,profil: profil,confiance: confiance,maxjour: maxjour,pxvente: pxvente,pxachat: pxachat,ctlancement: ctlancement,ctfixe: ctfixe,ctrupture: ctrupture,possession: possession});
		});
	}
	else if (e.target.classList.contains("clear")) {
		browser.tabs.reload();
		window.close();
	}
	if (e.target.id == 'button_stop_smart') { //bouton stop
		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {buttonstatus: 'stop',profil: profil,confiance: confiance});
		});
	}
}
)	;

document.getElementById('confidenceAmount').addEventListener("change", function(){ //change range button with value
	document.getElementById('confidenceLevel').innerHTML = document.getElementById('confidenceAmount').value;  
});
	



