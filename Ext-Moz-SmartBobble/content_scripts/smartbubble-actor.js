browser.runtime.onMessage.addListener(actions); //event boutton

function displayjson(){ //inject le json
var script=document.createElement('object'); 
script.id="jsondata";
script.data="/eleve/get-data";
script.height="0";
script.width="0";
$("body").append(script);

setTimeout(function(){ //on recupère les données json
	var json = $("object")[0].contentDocument.body.children[0].innerHTML;
	var data = JSON.parse(json);
		
	var currentjour = getjour();
	var profil = getprofil();
	var rolen1;
	
	if(profil == 'grossiste'){ rolen1='ind'; }
	if(profil == 'distributeur'){ rolen1='gro'; }
	if(profil == 'magasin'){ rolen1='dis'; }
	
	var demandemag = data[currentjour-1].mag.demande;
	var joueurstock= data[currentjour-1][rolen1].stock;
	var joueurvente= data[currentjour-1][rolen1].vente;
	var joueurreception= data[currentjour-1][rolen1].reception;
	
	joueurstock=parseInt(joueurstock);
	joueurvente=parseInt(joueurvente);
	joueurreception=parseInt(joueurreception);
	
	var stockn1 = (joueurstock-joueurvente)+joueurreception;
	setcookie('stockn1',stockn1);
	setcookie('demandemag',demandemag);
	
}, 2000);
}

function getcookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setcookie(name,value) {
    document.cookie = name+'='+value;
	return value;
}
function notify(type,title,content) {
  browser.runtime.sendMessage({"type": type,"title": title,"content": content});
}

if(!document.getElementById('jsondata')){ displayjson(); } //load json data

function actions(request, sender, sendResponse){ //actions des boutons
	var confiance = setconfiance(request.confiance);
	var profil = setprofil(request.profil);
	var maxjour = setmaxjour(request.maxjour);
	var algo = setalgo(request.algo);
	var pxvente = setpxvente(request.pxvente);
	var pxachat = setpxachat(request.pxachat);
	var ctlancement = setctlancement(request.ctlancement);
	var ctfixe = setctfixe(request.ctfixe);
	var ctrupture = setctrupture(request.ctrupture);
	var possession = setpossession(request.possession);
	var statusauto = request.buttonstatus;
	
	/* for debug
	if(statusauto == "start"){
		displayinfo();	
	}*/
	setautoplay(statusauto); //changement etat en fonction des bouttons
	
	browser.runtime.onMessage.removeListener(actions);	//on quitte le listener
}

function getprofil(){
	var profil;
	if(getcookie('profil')){
		profil = getcookie('profil');
	}else{
		for(var i = 0; i < 4 ;i++){
			var perso = document.getElementById('panneauDroite').children[i];
			var persorouge = perso.classList.contains('personnageActuelRouge');
			var persovert = perso.classList.contains('personnageActuelVert');
		  if( persorouge == true || persovert == true ){
			  if( perso.classList.contains('eleveGro') == true ){ profil = "grossiste"; }
			  if( perso.classList.contains('eleveMag') == true ){ profil = "magasin"; }
			  if( perso.classList.contains('eleveDis') == true ){ profil = "distributeur"; }
			  if( perso.classList.contains('eleveInd') == true ){ profil = "industriel"; }
		  }
		}
	}
return profil;
}
function getdemandes(){
	var demande = document.getElementsByClassName('panneau-corps panneauDemande')[0].innerHTML;
	return demande;
}
function getstock_debut(){
	var stock_debut = document.getElementsByClassName('panneau-corps stock panneauStockDebut')[0].innerHTML;
	return stock_debut;
}
function getstock_fin(){
	var stock_fin = document.getElementsByClassName('panneau-corps stock panneauStockFin')[0].innerHTML;
	return stock_fin;
}
function getrupture(){
	var rupture = document.getElementsByClassName('panneau-corps panneauRupture')[0].innerHTML;
	return rupture;
}
function getreception(){
	var reception = document.getElementsByClassName('panneau-corps panneauReception')[0].innerHTML;
	return reception;
}
function getventes(){
	var ventes = document.getElementsByClassName('panneau-corps panneauVente')[0].innerHTML;
	return ventes;
}
function getjour(){
	var jour = document.getElementsByClassName('tourCalendrier')[0].innerHTML;
	return jour;
}

function getmaxjour(){
	return getcookie('maxjour');
}
function getconfiance(){
	return getcookie('confiance');
}
function getautoplay(){
	return getcookie('autoplay');
}
function getalgo(){
	return getcookie('algo');
}
function getstockn1(){
	return getcookie('stockn1');
}
function getdemandemag(){
	return getcookie('demandemag');
}
function getpxvente(){
	return getcookie('pxvente');
}
function getpxachat(){
	return getcookie('pxachat');
}
function getctlancement(){
	return getcookie('ctlancement');
}
function getctfixe(){
	return getcookie('ctfixe');
}
function getctrupture(){
	return getcookie('ctrupture');
}
function getpossession(){
	return getcookie('possession');
}


function setprofil(profilselect){
	var profil;
	if(profilselect == 'auto'){
		profil = getprofil();
	}else{
		profil = profilselect;
	}
	setcookie('profil',profil)
	return profil;
}
function setconfiance(confiance){
	setcookie('confiance',confiance);
	return confiance;
}
function setmaxjour(jour){
	setcookie('maxjour',jour);
	return jour;
}
function setalgo(algo){
	setcookie('algo',algo);
}
function setpxvente(pxvente){
	setcookie('pxvente',pxvente);
}
function setpxachat(pxachat){
	setcookie('pxachat',pxachat);
}
function setctlancement(ctlancement){
	setcookie('ctlancement',ctlancement);
}
function setctfixe(ctfixe){
	setcookie('ctfixe',ctfixe);
}
function setctrupture(ctrupture){
	setcookie('ctrupture',ctrupture);
}
function setpossession(possession){
	setcookie('possession',possession);
}
function setautoplay(statusplay){
	setcookie('autoplay',statusplay);
	if(statusplay == "stop"){
		notify("info","Arrêt du Bot","Le Bot a été arrêté !");
		resetbot();
	}else if(statusplay == "start"){
		notify("info","Demarrage du Bot","         Le Bot a été lancé !\n --- Ne pas toucher l\'ecran ---");
	}
	location.reload(); 
	return statusplay;
}

function displayinfo(){ //debug form
	var confiance = getconfiance();
	var demande = getdemandes();
	var stock_debut = getstock_debut();
	var stock_fin = getstock_fin();
	var rupture = getrupture();
	var reception = getreception();
	var ventes = getventes();
	var jour = getjour();
	var profil = getprofil();
	var algo = getalgo();
	
alert('Demandes:'+demande+'\nStock de debut:'+stock_debut+'\nStock de fin:'+stock_fin+'\nRupture:'+rupture+'\nReception:'+reception+'\nVentes:'+ventes+'\nProfil:'+profil+'\nJour:'+jour+'\nConfiance:'+confiance+'\nAlgo selectionné:'+algo);
}
function validateform(decision,confiance,stock_fin,pxachat,possession,ctrupture,rupture){
document.getElementById('decision').value = decision; //set decision
document.getElementById('envoiDecision').click(); //confirm decision
document.getElementById('valideConfirm').click(); //confim box

//decision = Math.round(decision);
stock_fin=parseInt(stock_fin);
pxachat=parseInt(pxachat);
possession=parseInt(possession);
ctrupture=parseInt(ctrupture);

var coutstock = stock_fin*pxachat*(possession/100);
var coutrupture = rupture*pxachat*(ctrupture/100);

notify("commande","Commande passée !","Une commande de "+decision+" vient d'être passée \nCout de stockage: "+coutstock+"€ \nCout de rupture: "+coutrupture+"€");

setTimeout(function(){
	var buttonmodal = $('#maModal :button')[1];
	var title = $('#maModal .modal-title')[0];
	var inputconfiance = $('#maModal #confidenceAmount')[0];
	if(title.innerHTML == "Confirmation"){ inputconfiance.value=confiance; buttonmodal.click(); }
	}, 2000);
}
function resetbot(){
	setcookie('currentjour','');
	setcookie('jourj','');
	setcookie('jour1','');
	setcookie('jour2','');
	setcookie('confiance','');
	setcookie('maxjour','');
	location.reload(); 
}


function algostock(profil,stock_debut,stock_fin,ruptureA,demande,reception,ventes,currentjour){
	var stockn1 = getstockn1(); 
	var demandemag = getdemandemag();
	var stockDebutJournee = stock_debut;
    var stockFinJournee = stock_fin;
    var commande = 0;
    var demandeRecue = demande;
    var produitRecue = reception;
    var rupture = ruptureA;
	
	demandeRecue=parseInt(demandeRecue);
	rupture=parseInt(rupture);
	stockFinJournee=parseInt(stockFinJournee);
	demandemag=parseInt(demandemag);
	stockn1=parseInt(stockn1);
	
	
	/*
	algo stock:
	magasin=si stock < 50 then commande=(50-stock)+demandemag | if commamde > stockn1 then commande=stockn1 else commande=commande | else commande=demandemag 
	distrib=si stock < 50 then commande=(50-stock)+demandemag | if commamde > stockn1 then commande=stockn1 else commande=commande | else commande=demandemag 
	gross=si stock < 50 then commande=(50-stock)+demandemag | if commamde > stockn1 then commande=stockn1 else commande=commande | else commande=demandemag 
	ind=si stock <= 50 then commande=100 else commande=0 ;
	*/
	
	if(profil == 'industriel'){
		if(stockFinJournee <= 50){
			commande=80;
		}else{
			commande=0;
		}
	}
	if(profil == 'grossiste'){
		if(stockFinJournee < 40){
			commande=(40-stockFinJournee)+demandemag;
		}else{
			commande=demandemag;
		}
		if(commande > stockn1){
					commande=stockn1;
			}
		if(currentjour == '2'){
			commande=demandemag;
			
		}
	}
	if(profil == 'distributeur'){
		if(stockFinJournee < 40){
			commande=(40-stockFinJournee)+demandemag;
		}else{
			commande=demandemag;
		}
		if(commande > stockn1){
				commande=stockn1;
		}
		if(currentjour == '2'){
			commande=demandemag;
			
		}
	}
	if(profil == 'magasin'){
		if(stockFinJournee < 40){
			commande=(40-stockFinJournee)+demandemag;
		}else{
			commande=demandemag;
		}
		if(commande > stockn1){
				commande=stockn1;
		}
		if(currentjour == '2'){
			commande=demandemag;
		}
	}
	
	if(commande < 0){ commande=0; }
	if(commande > 100){ commande=100; }
    return commande;
}


function algorupture(profil,stock_debut,stock_fin,ruptureA,demande,reception,ventes,currentjour){
	var stockn1 = getstockn1();
	var demandemag = getdemandemag();
	var stockDebutJournee = stock_debut;
    var stockFinJournee = stock_fin;
    var commande = 0;
    var demandeRecue = demande;
    var produitRecue = reception;
    var rupture = ruptureA;
	
	demandeRecue=parseInt(demandeRecue);
	rupture=parseInt(rupture);
	stockFinJournee=parseInt(stockFinJournee);
	demandemag=parseInt(demandemag);
	stockn1=parseInt(stockn1);
	
	
	/*
	algo rupture:
	magasin=si stock < 10 then commande=(10-stock)+demandemag | if commamde > stockn1 then commande=stockn1 else commande=commande | else commande=demandemag 
	distrib=si stock < 10 then commande=(10-stock)+demandemag | if commamde > stockn1 then commande=stockn1 else commande=commande | else commande=demandemag 
	gross=si stock < 10 then commande=(10-stock)+demandemag | if commamde > stockn1 then commande=stockn1 else commande=commande | else commande=demandemag 
	ind=si stock < 20 then commande=(20-stock) else commande=demandemag 
	*/
	
	if(profil == 'industriel'){
		if(stockFinJournee <= 30){
			commande=100;
		}else{
			commande=0;
		}
	}
	if(profil == 'grossiste'){
		if(stockFinJournee < 20){
			commande=(20-stockFinJournee)+demandemag;
		}else{
			commande=demandemag;
		}
		if(commande > stockn1){
					commande=stockn1;
			}
		if(rupture > 0){
			commande=commande+20;
		}
		if(currentjour == '2'){
			commande=demandemag;
			
		}
	}
	if(profil == 'distributeur'){
		if(stockFinJournee < 20){
			commande=(20-stockFinJournee)+demandemag;
		}else{
			commande=demandemag;
		}
		if(commande > stockn1){
				commande=stockn1;
		}
		if(rupture > 0){
			commande=commande+20;
		}
		if(currentjour == '2'){
			commande=demandemag;
			
		}
	}
	if(profil == 'magasin'){
		if(stockFinJournee < 20){
			commande=(20-stockFinJournee)+demandemag;
		}else{
			commande=demandemag;
		}
		if(commande > stockn1){
				commande=stockn1;
		}
		if(rupture > 0){
			commande=commande+20;
		}
		if(currentjour == '2'){
			commande=demandemag;
		}
	}
	
	if(commande < 0){ commande=0; }
	if(commande > 100){ commande=100; }
    return commande;
}

function autoplay(profil,confiance,maxjour){
	var currentjour = getjour();
	var demande = getdemandes();
	var stock_debut = getstock_debut();
	var stock_fin = getstock_fin();
	var rupture = getrupture();
	var reception = getreception();
	var ventes = getventes();
	var algo = getalgo();
	var pxvente = getpxvente();
	var pxachat = getpxachat();
	var ctlancement = getctlancement();
	var ctfixe = getctfixe();
	var ctrupture = getctrupture();
	var possession = getpossession();
	
	if(currentjour != getcookie('currentjour')){
		setcookie('currentjour',getjour());
		
		
		if(algo == 'algo1'){ //choix de algo stock
			var decision = algostock(profil,stock_debut,stock_fin,rupture,demande,reception,ventes,currentjour);
		}
		if(algo == 'algo2'){ //choix de algo rupture
			var decision = algorupture(profil,stock_debut,stock_fin,rupture,demande,reception,ventes,currentjour);
		}
		if(algo == 'algoauto'){ //choix de algo auto en fonction des couts
			if(ctrupture > possession){ 
				var decision = algostock(profil,stock_debut,stock_fin,rupture,demande,reception,ventes,currentjour); 
			}else{
				var decision = algorupture(profil,stock_debut,stock_fin,rupture,demande,reception,ventes,currentjour);
			}
		}
		
		validateform(decision,confiance,stock_fin,pxachat,possession,ctrupture,rupture);
	}else if(currentjour == maxjour){
		notify("info","C\'est le dernier jour !","Le Bot termine ses commandes");
		setTimeout(function(){ //on stoppe le bot
			setautoplay('stop');
		}, 2000);
	}
	
}

//autoplay start event on refresh
if( getautoplay() == "start"){
	setTimeout(function(){ //wait html rendering
		autoplay(getprofil(),getconfiance(),getmaxjour());
	}, 2000);
}

$('#maModal').on('focus', function (e) { //on valide toute les modal info
	var buttonmodal = $('#maModal :button')[1];
	var info = $('#maModal .modal-title')[0];
	if(info.innerHTML == "Information"){ 
		buttonmodal.click(); 
	}
});



