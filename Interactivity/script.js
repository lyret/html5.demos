"use strict";

/* Globala variabler */
var textNode; //Aktuell textstycke i paragraf som skrivs till.
var nodeNr = 0; //Antal paragrafer som skrivits.



/* Den här funktionen anropas då man trycker på en av skrivmaskinsknapparna */
/* ------------------------------------------------------------------------ */
/* Parametrar: c - Variabel som innehåller ett tecken                       */
function addLetter(c){
	//Skapa en paragraf ifall ingen finns
	if (textNode == null)
		addParagraph();

	//Lägg till inmatningen till textnoden.
	textNode.appendData(c);
	return;
}



/* Den här funktionen anroas då man trycker på Enter knappen */
/* --------------------------------------------------------- */
function addParagraph() {
	//Hitta och skapa nödvändiga noder. 
	var output    = document.getElementById("output");
	var paragraph = document.createElement("p");
	textNode  = document.createTextNode("");
	
	//Makera ifall paragrafen är jämn/ojämn beroende på vilket nummer i ordningen det är.
	if (nodeNr%2 == 0)
		paragraph.setAttribute("class","even");
	else
		paragraph.setAttribute("class","odd");
	
	//Koppla noderna till output.
	output.appendChild(paragraph);
	paragraph.appendChild(textNode);
	
	nodeNr +=1
	return;
}



/* Den här funktionen anropas när man trycker på länken "Räkna bokstäver". */
/* ----------------------------------------------------------------------- */
function countLetters() {
	//Skapa en paragraf ifall ingen finns, hämta senaste paragrafens textinnehåll.
	if (textNode == null)
		addParagraph();
	var input = textNode.textContent;
	
	//Ta bort tecken som inte önskar räknas
	input = input.split(" ").join("");
	input = input.split(".").join("");
	input = input.split(",").join("");
	
	//Returnera antalet bokstäver i den nuvarande paragrafen
	return input.length;
}
