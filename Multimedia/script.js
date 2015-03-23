"use strict";

//Funktion för att byta videofil.
function change_video(target, media) {
    var video = document.getElementById(target);

    if (video.canPlayType('video/mp4')=="") {
	    video.src = 'http://www8.cs.umu.se/kursmaterial/html5/mediafiler/'+media+'.ogv';
	    video.type = 'video/ogg';
	    }
    else {
	    video.src = 'http://www8.cs.umu.se/kursmaterial/html5/mediafiler/'+media+'.mp4';
	    video.type = 'video/mp4"';
	    }
    
    video.load();
    }



//Funktioner för att starta och stoppa all media på sidan.
function play_all() {
	var objects = document.getElementsByClassName('media');
	for (var i=0; i<objects.length; i++) { objects[i].play() }
	}
	
	
function stop_all() {
	var objects = document.getElementsByClassName('media');
	for (var i=0; i<objects.length; i++) { objects[i].pause(); }
	}



//Funktioner för ritytan.
function canvas_click(e) {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var x, y;
	var color = document.getElementById('canvas_color').value;
	var size = document.getElementById('canvas_size').value;
	var status = document.getElementById('canvas_status');
	var validcolor = /^(#)?([0-9a-fA-F]{3})([0-9a-fA-F]{3})?$/;
	var validsize  = /^\s*\d+\s*$/;

    if (e.pageX != undefined && e.pageY != undefined) {
		x = e.pageX;
		y = e.pageY;
		}
    else {
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
	
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    
	//Återställ färgvärdet och storleken ifall de är felinmatate.
	status.innerHTML = "";
	
	if (validcolor.test(color) == false) {
		color = '#4479BA';
		document.getElementById('canvas_color').value = color;
		status.innerHTML += "Felinskriven färg, återställde till blått.<br>"
		}

	if (validsize.test(size) == false) {
		size = '15';
		document.getElementById('canvas_size').value = size;
		status.innerHTML += "Ogilltlig storlek, återställde till 15."
		}
	
	//Rita
	context.fillStyle = color;
	context.beginPath();
	context.arc(x, y, size, 0, Math.PI*2, 1); 
	context.closePath();
	context.fill();
	
	//Spara bild
	if (window.storage) {window.storage["savedCanvasImage"] = canvas.toDataURL();}
	}

function canvas_clear() {
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	
	//Rensa canvas
	context.fillStyle = "#fcfbfb";
	context.fillRect(0,0,400,400);
	context.fillStyle = "#000";
	context.font = 'bold 60px sans-serif';
	context.globalAlpha = 0.2;
	context.fillText('Umeå Universitet Umeå Universitet',-10,40);
	context.fillText('Umeå Universitet Umeå Universitet',-70,110);
	context.fillText('Umeå Universitet Umeå Universitet',-100,180);
	context.fillText('Umeå Universitet Umeå Universitet',-10,250);
	context.fillText('Umeå Universitet Umeå Universitet',-200,320);
	context.fillText('Umeå Universitet Umeå Universitet',-50,390);
	context.globalAlpha = 1;
	
	//Spara bild
	if (window.storage) {window.storage["savedCanvasImage"] = canvas.toDataURL();}
	}


//Utför funktioner när sidan laddats
function init() {
	//Använd rätt filformat när sidan laddas.
	change_video('balloons', 'WaterBalloon1');
	
	//Gör det möjligt att klicka på ritytan.
	var canvas = document.getElementById('canvas')
	canvas.addEventListener("click", canvas_click, false);
	
		
	//Kontrollera ifall localstorage stödjs (skapar global storage variabel)
	try { if (localStorage.getItem) { window.storage = localStorage; }
		} catch(e) {}
	
	if (window.storage) {
		
		//Om LS stödjs men det inte finns en tidigare bild, rensa canvasen och spara den som bild.
		if (window.storage.getItem("savedCanvasImage") === null)  {
			canvas_clear();
			}
		//Om LS stödjs och det FINNS en tidigare bild, ladda den.
		else {
			var img = new Image();
			img.onload = function() {
    			var context = canvas.getContext("2d");
    			context.drawImage(img,0,0);
    			}
    			img.src = window.storage["savedCanvasImage"];
    			}
    		}
   	
   	//Om LS inte stödjs: Visa en varningstext och skapa en tom canvas.
   	else {
	   	var mess = document.getElementById("storage_status");
	   	mess.innerHTML = "Din webbläsare stödjer inte Localstorage, din bild kommer raderas när du lämnar sidan!";
		canvas_clear();
	   	}
	}
