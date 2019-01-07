// variables globales
var e1 = document.getElementById("change1");
var e2 = document.getElementById("change2");

var s = false;
var c = 0;
var countdown = 3;
var t;
var x = 0, y = 0, z = 0, alpha = 0, beta = 0, gamma = 0;
var mot;
var liste = [];

var listeRechercheMD = [];
var position = 0;

// verifier entrer un mot cle avant demarrer
function beforeStart() {
  mot = document.getElementById("motcle");
  console.log(mot.value);
  if (mot.value == '') {
    alert("mot cle null");
  } else {
    $('.panel').show();
    $('.motcle').hide();
  }
}

function test() {
  $('.motcle').show();
  $('.retour').show();
  $('.testbt').hide();
  $('.trace').hide();
}

function trace() {
  var txt = '<ol id="hhh"> </ol>';
  $('.recherche').show();
  $('.retour').show();
  $('.testbt').hide();
  $('.trace').hide();
  $('.tracebt').hide();
  $('.motcle').hide();
  $('.sdata').append($(txt));
}

function retour() {
  $('.motcle').hide();
  $('.recherche').hide();
  $('.testbt').show();
  $('.trace').show();
  $('.retour').hide();
  $('#hhh').remove();
  $('.sdata').hide();
  $('.graph').hide();

  // repositionner
  position = 0;
  listeRechercheMD = [];
}

// onclick sur le boutton start
function go() {
  $('.motcle').hide();
  countDown();
}

// comptage 3 secondes
function countDown() {
  if (countdown >= 1) {
    e1.innerHTML = countdown;
    countdown = countdown - 1;
    t = setTimeout("countDown()", 1000);
  } else {
    e1.innerHTML = countdown;
    start();
  }
}

// demarrer les listeners
function start() {
  s = true;
  timedCount();
  dm();
  dorient();
}

// compteur pour enrgister les donnees
// il met les donnees dans liste tout 0.1 seconde
function timedCount() {
  c = c + 1;
  var donnees = [c, x, y, z, alpha, beta, gamma];
  liste.push(donnees);
  t = setTimeout("timedCount()", 100);
}

// arreter les listeners
// appeller la fonction ecrireGlobale pour envoyer les donnees a php
// initialiser les variables globales
function stop() {
  ecrireGlobale();
  mot.value = '';
  $('.motcle').show();
  $('.panel').hide();
  s = false;
  clearTimeout(t);
  e1.innerHTML = "Stop";
  e2.innerHTML = "Stop";
  countdown = 3;
  liste = [];
  $('.tracebt').show();
}

// onclick sur boutton tracer
function tracebt() {
  trace();
}

// listener DeviceMotionEvent
function dm() {
  if (window.addEventListener) {
    window.addEventListener("devicemotion", motion, false);
  } else {
    console.log("DeviceMotionEvent is not supported");
  }
}

// changer les variables globales x y z dans tous les mouvements de portable
function motion(event) {
  if (s) {
    x = event.accelerationIncludingGravity.x.toFixed(0);
    y = event.accelerationIncludingGravity.y.toFixed(0);
    z = event.accelerationIncludingGravity.z.toFixed(0);
    var s1 = "Accelerometer: "
      + x + ", "
      + y + ", "
      + z;
    e1.innerHTML = s1;
  }
}

// listener DeviceOrientationEvent
function dorient() {
  if (window.addEventListener) {
    window.addEventListener("deviceorientation", orientation, false);
  } else {
    console.log("DeviceOrientationEvent is not supported");
  }
}

// changer les variables globales alpha beta gamma dans tous les mouvements de portable
function orientation(event) {
  if (s) {
    alpha = event.alpha.toFixed(0);
    beta = event.beta.toFixed(0);
    gamma = event.gamma.toFixed(0);
    var s2 = "Gyroscope: "
      + alpha + ", "
      + beta + ", "
      + gamma;
    e2.innerHTML = s2;
  }
}

// fonction pour envoyer les donnees de javascript a php
function ecrireGlobale() {
  $.ajax(
    {
      url: "save.php",
      type: "POST",
      data: {
        mydata: liste,
        motcle: mot.value,
        adresse: adresse
      },
      async: false,
      success: function (msg) {
        console.log("DONE ");
        console.log(msg);
      },
      error: function (msg) {
        console.log("error");
        console.log(msg);
      }
    });
}

// ici adresse se trouve dans app.php qui est le nom de fichier .json lie a compte
// meme nom que nom du compte
var a = "./data/" + adresse + ".json";

// eviter de avoir plusieur fois un meme resultat
function isIn(value) {
  for (let i = 0; i < listeRechercheMD.length; i++) {
    if (listeRechercheMD[i].motcle == value.motcle && listeRechercheMD[i].date == value.date) {
      return true;
    }
  }
  return false;
}

// requete par mot cle
// lire le fichier .json et enrgister dans listeRechercheMD
// eviter ajax async car il faut marcher par ordre
function recherche_motcle() {
  $.ajax({ url: a, async: false }).done(function (resultat) {
    var motclecherche = document.getElementById("recherche").value;
    resultat.BD.forEach(function (r) {
      var isin = isIn(r);
      if (!isin && r.motcle == motclecherche) {
        listeRechercheMD.push(r);
      }
    });
  });
}

// requete par date
// lire le fichier .json et enrgister dans listeRechercheMD
// eviter ajax async car il faut marcher par ordre
function recherche_date() {
  $.ajax({ url: a, async: false }).done(function (resultat) {
    var date = document.getElementById("recherchedate").value;
    resultat.BD.forEach(function (r) {
      if (!isIn(r) && r.date.substring(0, 10) == date) {
        listeRechercheMD.push(r);
      }
    });
  });
}

// requete par date et mot cle
// lire le fichier .json et enrgister dans listeRechercheMD
// eviter ajax async car il faut marcher par ordre
function recherche_motcle_date() {
  $.ajax({ url: a, async: false }).done(function (resultat) {
    var date = document.getElementById("recherchedate").value;
    var motclecherche = document.getElementById("recherche").value;
    resultat.BD.forEach(function (r) {
      if (!isIn(r) && r.date.substring(0, 10) == date && r.motcle == motclecherche) {
        listeRechercheMD.push(r);
      }
    });
  });
}

function cleanCanvas(){
  var c1 = document.getElementById("chart");
  var c2 = document.getElementById("trahc");
  var cxt1 = c1.getContext('2d');
  var cxt2 = c2.getContext('2d');
  cxt1.clearRect(0,0,c1.width,c1.height);
  cxt2.clearRect(0,0,c2.width,c2.height);
}

// onclick sur le boutton recherche
// verifier l'entree de recherche, mot cle ou data ou les deux
// utiliser JQuery pour afficher comme un boutton les resultats trouves
function recherche() {
  if (document.getElementById("recherche").value == ''
    && document.getElementById("recherchedate").value == '') {
    alert('Il faut au moins un mot cle ou une date!')
  } else if (document.getElementById("recherche").value != ''
    && document.getElementById("recherchedate").value != '') {
    recherche_motcle_date();
  } else if (document.getElementById("recherche").value != '') {
    recherche_motcle();
  } else {
    recherche_date();
  }
  $('.sdata').show();

  // $('.graph').show();
  for (let i = position; i < listeRechercheMD.length; i++) {
    $(document).ready(function () {
      $("#hhh").append("<li style='list-style-type:none'><button onclick='test1(" + i + ")'>" + listeRechercheMD[i].motcle + " : " + listeRechercheMD[i].date + "</button></li>");
    });
  }
  position = listeRechercheMD.length;
  document.getElementById("recherche").value = '';
}

var listSX = [];
var listSY = [];
var listSZ = [];
var listSA = [];
var listSB = [];
var listSG = [];

// retirer les valeurs dans les differentes listes
// appeler la fonction draw pour dessiner les courbes
function test1(i) {
  $('.graph').show();
  listeRechercheMD[i].donnees.forEach(function (r) {
    listSX.push(r.x);
    listSY.push(r.y);
    listSZ.push(r.z);
    listSA.push(r.alpha);
    listSB.push(r.beta);
    listSG.push(r.gamma);
  });
  // console.log(listSX);
  // console.log(listSY);
  // console.log(listSZ);
  // console.log(listSA);
  // console.log(listSB);
  // console.log(listSG);

  // ajuster la taille de Canvas
  window.addEventListener("resize", resizeCanvas, false);
  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
	}
  cleanCanvas();
  // desinner les courbes
  draw(listSX,listSY,listSZ,false);
  draw(listSA,listSB,listSG,true);

  listSX.length=0;
  listSY.length=0;
  listSZ.length=0;
  listSA.length=0;
  listSB.length=0;
  listSG.length=0;
}

function draw(l1,l2,l3,chart){

  if (chart) {
    var cvs = document.getElementById("chart");
  } else {
    var cvs = document.getElementById("trahc");
  }
  var ctx = cvs.getContext('2d');


  // les distances haut, droit, bas, gauche entre coordonnee et canvas
  var padding = {
    top:10,
    right:10,
    bottom:20,
    left:25
  }
  // width et height de fleche
  var arrow = {
    width:6,
    height:10
  }
  // point en haut de repere
  var vertexTop = {
    x:padding.left,
    y:padding.top
  }
  // point en bas de repere
  var vertexBottom = {
    x:padding.left,
    y:cvs.height - padding.bottom
  }
  // point d'origine
  var origin = {
    x:padding.left,
    y:(cvs.height-padding.bottom-padding.top)/2+padding.top
  }
  // point de droit
  var vertexRight = {
    x:cvs.width - padding.right,
    y:cvs.height - padding.bottom
  }

  // le plus loin de axe x (nombre de donnees)
  var maxx = l1.length;
  var listeAbs = [];
  l1.forEach(function(a){
    listeAbs.push(Math.abs(a));
  });
  l2.forEach(function(a){
    listeAbs.push(Math.abs(a));
  });
  l3.forEach(function(a){
    listeAbs.push(Math.abs(a));
  });
  // le plus loin de axe y (maximum de toutes les donnees)
  var maxy = Math.max(...listeAbs);

  console.log(maxx);
  console.log(maxy);

  // calculer la taille de graduation pour axe x et axe y
  var unitex = (cvs.width - padding.left - padding.right)/maxx;
  var unitey = ((cvs.height - padding.top - padding.bottom)/2)/maxy;

  ctx.lineWidth = 2;

  // dessiner axe x et axe y
  ctx.beginPath();
  ctx.moveTo(vertexTop.x,vertexTop.y);
  ctx.lineTo(vertexBottom.x, vertexBottom.y);
  ctx.lineTo(vertexRight.x,vertexRight.y);
  ctx.fillText('0',0,origin.y);

  // dessiner graduction de axe x
  for (var i=1; i< maxx/10-1 ; i++) {
      ctx.fillText('|', vertexBottom.x + 10*unitex*i, vertexBottom.y);
  }

  // dessiner graduction de axe y
  if (chart) {
    for (var j=1; j< maxy/50 ; j++) {
      ctx.fillText(-50*j, 0, origin.y + 50*unitey*j);
      ctx.fillText('-', origin.x, origin.y + 50*unitey*j);
      ctx.fillText(50*j, 0, origin.y - 50*unitey*j);
      ctx.fillText('-', origin.x, origin.y - 50*unitey*j);
    }
    ctx.fillText("Gyroscop(rad/s)", 0, cvs.height);
  } else {
    for (var j=1; j< maxy/10 ; j++) {
      ctx.fillText(-10*j, 0, origin.y + 10*unitey*j);
      ctx.fillText('-', origin.x, origin.y + 10*unitey*j);
      ctx.fillText(10*j, 0, origin.y - 10*unitey*j);
      ctx.fillText('-', origin.x, origin.y - 10*unitey*j);
    }
    ctx.fillText("Acceleromter(m/s^2)", 0, cvs.height);
  }
  ctx.strokeStyle = '#000000';
  ctx.stroke();


  // fleche de axe y
  ctx.beginPath();
  ctx.moveTo(vertexTop.x,vertexTop.y);
  ctx.lineTo(vertexTop.x - arrow.width/2,vertexTop.y + arrow.height);
  ctx.lineTo(vertexTop.x,vertexTop.y + arrow.height/2);
  ctx.lineTo(vertexTop.x + arrow.width/2,vertexTop.y + arrow.height);
  ctx.fill();

  // fleche de axe x
  ctx.beginPath();
  ctx.moveTo(vertexRight.x,vertexRight.y);
  ctx.lineTo(vertexRight.x - arrow.height,vertexRight.y - arrow.width);
  ctx.lineTo(vertexRight.x - arrow.height/2,vertexRight.y);
  ctx.lineTo(vertexRight.x - arrow.height,vertexRight.y + arrow.width);
  ctx.fill();

  // dessiner les courbes
  var comptepas = 0;
  ctx.beginPath();
  ctx.moveTo(origin.x,origin.y);
  l1.forEach(function(arr){
    comptepas += 1;
    ctx.lineTo(origin.x + comptepas*unitex, origin.y - arr*unitey);
  });
  ctx.strokeStyle = '#FF0000';
  ctx.stroke();

  var comptepas = 0;
  ctx.beginPath();
  ctx.moveTo(origin.x,origin.y);
  l2.forEach(function(arr){
    comptepas += 1;
    ctx.lineTo(origin.x + comptepas*unitex, origin.y - arr*unitey);
  });
  ctx.strokeStyle = '#FFFF00';
  ctx.stroke();

  var comptepas = 0;
  ctx.beginPath();
  ctx.moveTo(origin.x,origin.y);
  l3.forEach(function(arr){
    comptepas += 1;
    ctx.lineTo(origin.x + comptepas*unitex, origin.y - arr*unitey);
  });
  ctx.strokeStyle = '#0000FF';
  ctx.stroke();
}