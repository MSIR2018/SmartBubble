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
function actions(request, sender, sendResponse){
	var confiance = setconfiance(request.confiance);
	var profil = setprofil(request.profil);
	var maxjour = setmaxjour(request.maxjour);
	
	switchautoplay();
	
	//required
	browser.runtime.onMessage.removeListener(actions);	
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
	var maxjour = 7;
	for(var i = 0; i < maxjour ;i++){
		var jour = document.getElementsByClassName('selectTour')[i];
		if ( jour.innerHTML == jourselect ){
			jour.click();
		}
	}
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
	return getcookie('autoplay')
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
function setautoplay(statusplay){
	setcookie('autoplay',statusplay);
	return statusplay;
}
function switchautoplay(){
	if(getautoplay() == "start"){
		setautoplay('stop');
		alert('L\'automate a été stoppé !');
	}else{
		setautoplay('start');
		alert('L\'automate a été lancé !');
	}
	location.reload(); 
}

function displayinfo(profil){
	//selectjour('4');
	//var profil = getprofil();
	var demande = getdemandes();
	var stock_debut = getstock_debut();
	var stock_fin = getstock_fin();
	var rupture = getrupture();
	var reception = getreception();
	var ventes = getventes();
	var jour = getjour();
	
alert('Demandes:'+demande+'\nStock de debut:'+stock_debut+'\nStock de fin:'+stock_fin+'\nRupture:'+rupture+'\nReception:'+reception+'\nVentes:'+ventes+'\nProfil:'+profil+'\nJour:'+jour);
}

function validateform(decision,confiance){
document.getElementById('decision').value = decision; //set decision
document.getElementById('envoiDecision').click(); //confirm decision
document.getElementById('valideConfirm').click(); //confim box

setTimeout(function(){
	document.getElementById('maModal').children[0].children[0].children[1].children[0].children[0].value = confiance; //set confiance
	document.getElementById('maModal').children[0].children[0].children[2].children[0].click(); //confim confiance
	}, 2000);
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
	
	
	if(currentjour != getcookie('currentjour')){
		setcookie('currentjour',getjour());
		var decision = '10';
		
		displayinfo(profil);
		
		// algo
		
		validateform(decision,confiance);
	}
}

browser.runtime.onMessage.addListener(actions);

//autoplay start event
if( getautoplay() == "start"){
	setTimeout(function(){ //wait html rendering
		autoplay(getprofil(),getconfiance(),getmaxjour());
	}, 2000);
}

