browser.tabs.executeScript(null, { file: "/content_scripts/beastify.js" });

document.addEventListener("click", (e) => {
  if (e.target.id == 'button_launch_smart') {
	var data1 = document.getElementById('value1').value;
	var data2 = document.getElementById('value2').value;
	var data3 = document.getElementById('value3').value;
	var data4 = document.getElementById('value4').value;
	var confiance = '5';
	var maxjour = '40';
	
	for(var i = 0; i < 5 ;i++){ //get profil from checkboxes
		if(document.getElementsByName('role')[i].checked == true){ var profil = document.getElementsByName('role')[i].value; }
	}

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
      browser.tabs.sendMessage(tabs[0].id, {profil: profil,confiance: confiance,maxjour: maxjour,data1: data1, data2: data2, data3: data3, data4: data4});
    });
  }
  else if (e.target.classList.contains("clear")) {
    browser.tabs.reload();
    window.close();
  }  
});

