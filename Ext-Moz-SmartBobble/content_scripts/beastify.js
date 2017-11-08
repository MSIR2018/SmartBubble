function actions(request, sender, sendResponse){
	var decision = '50';
	var confiance = '5';
	alert(request.data1+' '+request.data2);
	displayinfo();
	validateform(decision,confiance);
	
	//required
	browser.runtime.onMessage.removeListener(actions);	
}


function displayinfo(){
var demande = document.getElementsByClassName('panneau-corps panneauDemande')[0].innerHTML;
var stock_debut = document.getElementsByClassName('panneau-corps stock panneauStockDebut')[0].innerHTML;
var stock_fin = document.getElementsByClassName('panneau-corps stock panneauStockFin')[0].innerHTML;
var rupture = document.getElementsByClassName('panneau-corps panneauRupture')[0].innerHTML;
var reception = document.getElementsByClassName('panneau-corps panneauReception')[0].innerHTML;
var ventes = document.getElementsByClassName('panneau-corps panneauVente')[0].innerHTML;

alert('Demandes:'+demande+'\nStock de debut:'+stock_debut+'\nStock de fin:'+stock_fin+'\nRupture:'+rupture+'\nReception:'+reception+'\nVentes:'+ventes);
}


function validateform(decision,confiance){
document.getElementById('decision').value = decision;
document.getElementById('envoiDecision').click(); 
document.getElementById('valideConfirm').click();	

setTimeout(function(){
	document.getElementById('maModal').children[0].children[0].children[1].children[0].children[0].value = confiance;
	document.getElementById('maModal').children[0].children[0].children[2].children[0].click();
	}, 2000);
}


browser.runtime.onMessage.addListener(actions);