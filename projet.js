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
  position = listeRechercheMD.length;
  document.getElementById("recherche").value = '';
  // listeRechercheMD = [];
}

var listSX = [];
var listSY = [];
var listSZ = [];
var listSA = [];
var listSB = [];
var listSG = [];

function test1(i) {
  console.log(i);
  $('.graph').show();
  listeRechercheMD[i].donnees.forEach(function (r) {
    listSX.push(r.s,r.x);
    listSY.push(r.s,r.y);
    listSZ.push(r.s,r.z);
    listSA.push(r.s,r.alpha);
    listSB.push(r.s,r.beta);
    listSG.push(r.s,r.gamma);
  });
  console.log(listSX);
  draw(listSX);
}

function draw(dataArr){
  // 变量
  var canvas, ctx;
  // 图表属性
  var cWidth, cHeight, cMargin, cSpace;
  var originX, originY;
  // 折线图属性
  var tobalDots, dotSpace, maxValue;
  var totalYNumber;

  canvas = document.getElementById("chart");
  if (canvas && canvas.getContext){
    ctx = canvas.getContext("2d");
  }
  initChart();

  function initChart(){
    cMargin = 60;
    cSpace = 80;
    
    tobalDots = dataArr.length;
    dotSpace = parseInt( cWidth/tobalDots );
    maxValue = 0;
    for(var i=0; i<dataArr.length; i++){
      var dotVal = parseInt( dataArr[i][1] );
      if( dotVal > maxValue ){
        maxValue = dotVal;
        }
      }
    maxValue += 50;
    totalYNomber = 10;
    ctx.translate(0.5,0.5);
  }

  drawLineLabelMarkers();

  function drawLineLabelMarkers(){
    ctx.font="24px Arial";
    ctx.lineWidth = 2;
    ctx.fillStyle="#566a80";
    ctx.strokeStyle = "#566a80";
    // Y axis
    drawLine(originX, originY, cMargin);
    // X axis
    drawLine(originX, originY, originX+cWidth, originY);
    drawMarkers();
  }

  function drawLine(x, y, X, Y){
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(X, Y);
    ctx.stroke();
    ctx.closePath();
  }

  function drawMarkers(){
    ctx.strokeStyle = "#E0E0E0";
    // 绘制 y 轴 及中间横线
    var oneVal = parseInt(maxValue/totalYNomber);
    ctx.textAlign = "right";
    for(var i=0; i<=totalYNomber; i++){
        var markerVal =  i*oneVal;
        var xMarker = originX-5;
        var yMarker = parseInt( cHeight*(1-markerVal/maxValue) ) + cMargin;
        
        ctx.fillText(markerVal, xMarker, yMarker+3, cSpace); // 文字
        if(i>0){
            drawLine(originX+2, yMarker, originX+cWidth, yMarker);
        }
    }
    // 绘制 x 轴 及中间竖线
    ctx.textAlign = "center";
    for(var i=0; i<tobalDots; i++){
        var markerVal = dataArr[i][0];
        var xMarker = originX+i*dotSpace;
        var yMarker = originY+30;
        ctx.fillText(markerVal, xMarker, yMarker, cSpace); // 文字
        if(i>0){
            drawLine(xMarker, originY-2, xMarker, cMargin    );
        }
    }
    // 绘制标题 y
    ctx.save();
    ctx.rotate(-Math.PI/2);
    ctx.fillText("访问量", -canvas.height/2, cSpace-10);
    ctx.restore();
    // 绘制标题 x
    ctx.fillText("月份", originX+cWidth/2, originY+cSpace/2+20);
};

function drawArc( x, y, X, Y ){
  ctx.beginPath();
  ctx.arc( x, y, 3, 0, Math.PI*2 );
  ctx.fill();
  ctx.closePath();
}

canvas.onclick = function(){
  initChart(); // 图表初始化
  drawLineLabelMarkers(); // 绘制图表轴、标签和标记
  drawLineAnimate(); // 绘制折线图的动画
};
}