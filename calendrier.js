$(function() {
	var mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	var d = new Date();
	var annee = d.getFullYear();

	
	
	$("#moisPrec").click(function(){
		var index = (mois.indexOf($("#mois").html()) - 1);

		//modulo négatif fonctionnant bizarrement sur javascript, il faut modifier l'index manuellement quand < 0
		if(index == -1) {
			index = 11;
			annee--;
		}

		setMoisAnnee(mois[index % 12], annee);
		resetTable();
		setNumeroJour(annee, index);
	});

	$("#moisSuiv").click(function(){
		var index = (mois.indexOf($("#mois").html()) + 1) % 12;
		index == 0 ? annee++ : annee;
		setMoisAnnee(mois[index], annee);
		resetTable();
		setNumeroJour(annee, index);
	});

	$(".jour").click(function() {
		$("#details").html("<p>Détail du " + 
			$(this).find(".numero").html() + ' ' + 
			$("#mois").html() + ' ' +
			$("#annee").html() + "</p>");
	});

	resetTable();
	setMoisAnnee(mois[d.getMonth()], annee);
	setNumeroJour(annee, mois.indexOf($("#mois").html()));
});

/**
 * Change le mois et l'année dans le tableau html
 * @param int mois  
 * @param int annee 
 */
function setMoisAnnee(mois, annee) {
	$("#mois").html(mois);
	$("#annee").html(annee);
}


/**
 * Reset les valeurs dans les cases du tableau html
 * @return void
 */
function resetTable() {
	for(var i = 1; i <= 57; i++){
		$("#"+i).removeClass("jour").html("");
	}
}

/**
 * Permet de mettre les numéro de jours dans les bonnes cases du tableau
 * @param int annee l'année de la date
 * @param int mois  numéro du mois
 */
function setNumeroJour(annee, mois) {

	//Récupère la date complète au 1er du mois et de l'année donnée
	var d = new Date(annee,mois, 1);
	//Récupère le dernier jour du mois
	var nbDay = new Date(annee, mois + 1, 0);
	//Numéro du jour auquel commence le mois
	var indexJour = d.getDay();
	var content;

	//permet de savoir combien de jours dans le mois
	nbDay = nbDay.getDate();

	//pour javascript dimanche = 0, pour nous dimanche = 7
	indexJour == 0 ? indexJour = 7 : indexJour;

	//Attribution des numéro dans les bonnes cases du tableau
	for(var i = 1; i <= nbDay; i++){
		content = '<span class="numero">' + i + '</span><br/>';
		
		$("#"+indexJour).addClass("jour").html(content);

		//Si on arrive en bout du ligne du tableau on saute à la suivante
		if(indexJour == 7 || indexJour == 17 || indexJour == 27 || indexJour == 37 || indexJour == 47) {
			indexJour += 4;
		} else {
			indexJour++;
		}
	}
}