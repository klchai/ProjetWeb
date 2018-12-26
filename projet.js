//  JSON.stringify() ---> xxx encode()

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
  position = 0;
  listeRechercheMD = [];
}

function go() {
  $('.motcle').hide();
  countDown();
}

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

function start() {
  s = true;
  timedCount();
  dm();
  dorient();
}

function timedCount() {
  c = c + 1;
  // ecrireGlobale();
  var donnees = [c, x, y, z, alpha, beta, gamma];
  liste.push(donnees);
  t = setTimeout("timedCount()", 1000);
}

function stop() {
  ecrireGlobale();
  mot.value = '';
  $('.motcle').show();
  $('.panel').hide();
  // var e1 = document.getElementById("change1");
  s = false;
  clearTimeout(t);
  e1.innerHTML = "Stop";
  // var e2 = document.getElementById("change2");
  e2.innerHTML = "Stop";
  countdown = 3;
  liste = [];
  $('.tracebt').show();
}

function tracebt() {
  trace();
}

function dm() {
  if (window.addEventListener) {
    window.addEventListener("devicemotion", motion, false);
  } else {
    console.log("DeviceMotionEvent is not supported");
  }
}

function motion(event) {
  if (s) {
    x = event.accelerationIncludingGravity.x.toFixed(0);
    y = event.accelerationIncludingGravity.y.toFixed(0);
    z = event.accelerationIncludingGravity.z.toFixed(0);

    var s1 = "Accelerometer: "
      + x + ", "
      + y + ", "
      + z;
    //console.log(s1);

    // var donneesmotion = [x,y,z];
    // ecrireJson2(donneesmotion);
    // var e1 = document.getElementById("change1");
    e1.innerHTML = s1;
  }
}

function dorient() {
  if (window.addEventListener) {
    window.addEventListener("deviceorientation", orientation, false);
  } else {
    console.log("DeviceOrientationEvent is not supported");
  }
}

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

function ecrireGlobale() {
  $.ajax(
    {
      url: "save.php",
      type: "POST",
      // data: {mydata:JSON.stringify(donnees)},
      data: {
        mydata: liste,
        motcle: mot.value,
        adresse: adresse
      },
      // dataType: 'json',
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

var a = "./data/" + adresse + ".json";

function isIn(value) {
  console.log(value);
  for (let i = 0; i < listeRechercheMD.length; i++) {
    if (listeRechercheMD[i].motcle == value.motcle && listeRechercheMD[i].date == value.date) {
      return true;
    }
  }
  return false;
}

function recherche_motcle() {
  $.ajax({ url: a, async: false }).done(function (resultat) {
    var motclecherche = document.getElementById("recherche").value;
    console.log(motclecherche);
    resultat.BD.forEach(function (r) {
      var isin = isIn(r);
      if (!isin && r.motcle == motclecherche) {
        listeRechercheMD.push(r);
      }
    });
    console.log("recherch fini");
  });
}

function recherche_date() {
  $.ajax({ url: a, async: false }).done(function (resultat) {
    var date = document.getElementById("recherchedate").value;
    console.log(date);
    resultat.BD.forEach(function (r) {
      if (!isIn(r) && r.date.substring(0, 10) == date) {
        listeRechercheMD.push(r);
      }
    });
  });
}

function recherche_motcle_date() {
  $.ajax({ url: a, async: false }).done(function (resultat) {
    var date = document.getElementById("recherchedate").value;
    var motclecherche = document.getElementById("recherche").value;
    console.log(date);
    resultat.BD.forEach(function (r) {
      if (!isIn(r) && r.date.substring(0, 10) == date && r.motcle == motclecherche) {
        listeRechercheMD.push(r);
      }
    });
  });
}

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
  // $('.sdata').show();
  console.log(listeRechercheMD);
  console.log(listeRechercheMD.length);
  $('.sdata').show();
  // if (listeRechercheMD.length != 0) {
  for (let i = position; i < listeRechercheMD.length; i++) {
    $(document).ready(function () {
      $("#hhh").append("<li style='list-style-type:none'><button onclick='test1(" + i + ")'>" + listeRechercheMD[i].motcle + " : " + listeRechercheMD[i].date + "</button></li>");
    });
  }
  // }
  // listeRechercheMD.forEach(function (r) {
  //   $(document).ready(function(){
  //     $("#hhh").append("<li style='list-style-type:none'><button id='select' onclick='test1()'>"+r.motcle+" : "+r.date+"</button></li>");
  //     // $("#hhh").append("<button name='select' onclick=draw() class='w3-button w3-light-grey'>"+r.motcle+"</button><br><br>");
  //   });
  // });
  // } else {
  //   $(document).ready(function(){
  //     $("#hhh").append("<li>Not Found</li>");
  //   });
  // }
  position = listeRechercheMD.length;
  document.getElementById("recherche").value = '';
  // listeRechercheMD = [];
}

var listS = [];
var listX = [];
var listY = [];
var listZ = [];
var listA = [];
var listB = [];
var listG = [];

function test1(i) {
  console.log(i);
  $('.graph').show();
  listeRechercheMD[i].donnees.forEach(function (r) {
    listS.push(r.s);
    listX.push(r.x);
    listY.push(r.y);
    listZ.push(r.z);
    listA.push(r.alpha);
    listB.push(r.beta);
    listG.push(r.gamma);
  });
  draw();
}
