browser.runtime.onMessage.addListener(actions); //event boutton
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

function actions(request, sender, sendResponse){ //actions des boutons
	var confiance = setconfiance(request.confiance);
	var profil = setprofil(request.profil);
	var maxjour = setmaxjour(request.maxjour);
	var algo = setalgo(request.algo);
	var statusauto = request.buttonstatus;
	
	/*
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

function selectjour(jourselect){
	var maxtab = 15;
	function pagesuivante(){
		document.getElementById('tourSuiv').click();
	}
	function pageprecedente(){
		document.getElementById('tourPrec').click();
	}
	for(var i = 0; i < maxtab ;i++){
		var jour = document.getElementsByClassName('selectTour')[i];
		if(i == 0){ //acces aux pages precedentees hors du tableau
			var inter = jourselect-jour.innerHTML;
			var page = inter/maxtab;
			if(page > 0){ for(var p = 0; p < page ;p++){ pagesuivante(); } }
			if(page < 0){ for(var p = 0; p > page ;p--){ pageprecedente(); } }
		}
		var jour = document.getElementsByClassName('selectTour')[i];
		if ( jour.innerHTML == jourselect ){
			jour.click();
		}
	}
}

function olddemandes(addjour,reception){
	var jourj = getcookie('jourj');
	var jour1 = getcookie('jour1');
	var jour2 = getcookie('jour2');
	
	jour2=jour1;
	jour1=jourj;
	jourj=addjour;
	
	setcookie('jourj',jourj);
	setcookie('jour1',jour1);
	setcookie('jour2',jour2);
	
	if(getcookie('jour2') == ''){
		jour2=reception;
	}
	return jour2;
}

function getdecisionstatus(){
	var decisionstatus = document.getElementById('decision').disabled;
	return decisionstatus;
}
function getstartjour(){
	return getcookie('startjour');
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
function setstartjour(jour){
	setcookie('startjour='+jour);
}
function setdecision(decision){
	setcookie('decision',decision);
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
function setstockn1(profil){
	var persoademande;
	if(profil == 'grossiste'){ persoademande='industriel'; }
	if(profil == 'distributeur'){ persoademande='grossiste'; }
	if(profil == 'magasin'){ persoademande='distributeur'; }
	if(profil != 'industriel'){
		$('#maModal .modal-title').html('Stock du'+persoademande);
		$('#maModal .modal-body').html("Veuillez entrer le stock du "+persoademande+": <p class='text-center'><input type='number' id='stockn1' min='0' step='1'/></p>");
		$('#maModal .modal-footer').html('<button type="button" class="btn btn-default alertOk" id="validestockn1" data-dismiss="modal">OK</button>');
		$('#maModal').modal('show');
		var demanden1 =  $("#stockn1").val();
		setcookie('demanden1',demanden1);
		return demanden1;
	}
}

function displayinfo(){
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

function validateform(decision,confiance){
	
document.getElementById('decision').value = decision; //set decision
document.getElementById('envoiDecision').click(); //confirm decision
document.getElementById('valideConfirm').click(); //confim box

//decision = Math.round(decision);
notify("commande","Commande passée !","Une commande de "+decision+" vient d'être passée");

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

function algoalexis(profil,stock_debut,stock_fin,ruptureA,demande,reception,ventes,currentjour){
	var stockMagasinDebutJournee = stock_debut;
    var stockMagasinFinJournee = stock_fin;
    var commandAuDistributeur = 0;
    var demandeRecue = demande;
    var produitRecue = reception;
    var demandeEffectue = olddemandes(demande,reception); //enregistre demandes j-3 
    var ruptureN1 = 0;
    var rupture = ruptureA;
    var totalCmd = 0;
    var totalCmdFinal = 0;
    var ratioCmdSup = 1.9;
    var ratioCmdInf = 1;
	var ruptureN1 = demandeEffectue-produitRecue
	
	demandeRecue=parseInt(demandeRecue);
	rupture=parseInt(rupture);
	
	if(ruptureN1 != 0){ //RUPTURE
       totalCmdFinal = (demandeRecue+rupture);
           if(stockMagasinDebutJournee <= ratioCmdSup*totalCmdFinal)
            {
                commandAuDistributeur = (demandeRecue +(rupture))-(ruptureN1/2);
            }
            else{
                commandAuDistributeur = (demandeRecue*1.9) +(rupture)-(ruptureN1/2);
            }

    }else{

            if(stockMagasinDebutJournee <=totalCmdFinal){
                commandAuDistributeur = demandeRecue+rupture;
            }
            else{
                commandAuDistributeur = (demandeRecue*1.9)+rupture;
            }
    }
	if(profil == 'industriel'){
		if (stockMagasinDebutJournee > 100){commandAuDistributeur=0; }
	}
	if(profil == 'grossiste'){
		if (stockMagasinDebutJournee > 100){commandAuDistributeur=0; }
		//if(commandAuDistributeur > 80){ commandAuDistributeur=80; }
	}
	if(profil == 'distributeur'){
		if (stockMagasinDebutJournee > 90){commandAuDistributeur=0; }
		//if(commandAuDistributeur > 70){ commandAuDistributeur=70; }
	}
	if(profil == 'magasin'){
		if (stockMagasinDebutJournee > 60){commandAuDistributeur=0; }
		//if(commandAuDistributeur > 70){ commandAuDistributeur=70; }
	}
	if(commandAuDistributeur < 0){ commandAuDistributeur=0; }
	if(commandAuDistributeur > 100){ commandAuDistributeur=100; }
    return commandAuDistributeur;
}

function autoplay(profil,confiance,maxjour){
	var startjour = getstartjour();
	var currentjour = getjour();
	var decisionstatus =  getdecisionstatus();
	var demande = getdemandes();
	var stock_debut = getstock_debut();
	var stock_fin = getstock_fin();
	var rupture = getrupture();
	var reception = getreception();
	var ventes = getventes();
	var algo = getalgo();
	
	if(currentjour != getcookie('currentjour')){
		setcookie('currentjour',getjour());
		
		if(algo == 'algo1'){ //choix de l'algo
			var decision = algoalexis(profil,stock_debut,stock_fin,rupture,demande,reception,ventes,currentjour);
		}
		
		validateform(decision,confiance);
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