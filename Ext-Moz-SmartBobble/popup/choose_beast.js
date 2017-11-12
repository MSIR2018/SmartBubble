browser.tabs.executeScript(null, { file: "/content_scripts/beastify.js" });

document.addEventListener("click", (e) => {
	var vente = document.getElementById('vente').value;
	var achat = document.getElementById('achat').value;
	var commande = document.getElementById('commande').value;
	var fixe = document.getElementById('fixe').value;
	var rupture = document.getElementById('rupture').value;
	var stockage = document.getElementById('stockage').value;
	var confiance = document.getElementById('confidenceAmount').value;
	var maxjour = document.getElementById('jourmax').value;
	var algo = document.getElementById('algo').value;
	
	
	for(var i = 0; i < 5 ;i++){ //get profil from checkboxes
		if(document.getElementsByName('role')[i].checked == true){ var profil = document.getElementsByName('role')[i].value; }
	}
	
	if (e.target.id == 'button_launch_smart') { //bouton start
		var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
		gettingActiveTab.then((tabs) => {
		browser.tabs.sendMessage(tabs[0].id, {buttonstatus: 'start',algo: algo,profil: profil,confiance: confiance,maxjour: maxjour,vente: vente, achat: achat, commande: commande, fixe: fixe,rupture: rupture,stockage: stockage});
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
	



