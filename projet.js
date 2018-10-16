var e1 = document.getElementById("change1");
var e2 = document.getElementById("change2");

function go() {
  dm();
  dorient();
}

function stop() {
  // var e1 = document.getElementById("change1");
  // e1.innerHTML = "Stop";

  // var e2 = document.getElementById("change2");
  e2.innerHTML = "Stop";

}


function dm() {
  if (window.addEventListener) {
    window.addEventListener("devicemotion", motion, false);
  } else {
    console.log("DeviceMotionEvent is not supported");
  }
}

function motion(event) {
  var s1 = "Accelerometer: "
  + event.accelerationIncludingGravity.x + ", "
  + event.accelerationIncludingGravity.y + ", "
  + event.accelerationIncludingGravity.z;
  console.log(s1);
  // var e1 = document.getElementById("change1");
  e1.innerHTML = s1;
}

function dorient() {
  if (window.addEventListener) {
    window.addEventListener("deviceorientation", orientation, false);
  } else {
    console.log("DeviceOrientationEvent is not supported");
  }
}

function orientation(event) {
  var s2 = "Gyroscope: "
  + event.alpha + ", "
  + event.beta + ", "
  + event.gamma;
  console.log(s2);
  // var e2 = document.getElementById("change2");
  e2.innerHTML = s2;
}



// function changerLeStyle() {
//     var e1 = document.getElementById("change");
//     e1.style.background = "#0F0";
// }
//
// function mafonction(event) {
//   console.log(event);
// }
// var e1 = document.getElementById("change");
// e1.addEventListener("click", changerLeStyle, false);

// function lireJson() {
//   $.ajax("projet.json").done(function (resultat){
//     console.log(resultat.usr[0].mot);
//   });
// }
// var newadresse = {"adresse":"aaa@gmail.com","mot":123456};
// function ecrireJson() {
//   $.ajax(
//    {
//         url: "save.php",
//         type: "POST",
//         data: {mydata:JSON.stringify(newadresse)},
//         dataType: 'json',
//         async: false,
//         success: function(msg) {
//           console.log("DONE ");
//             console.log(msg);
//         },
//         error: function(msg) {
//           console.log("error");
//             console.log(msg);
//         }
//     });
// }
//
//
// function motion(event) {
//   var s = "Accelerometer: "
//   + event.accelerationIncludingGravity.x + ", "
//   + event.accelerationIncludingGravity.y + ", "
//   + event.accelerationIncludingGravity.z;
//   console.log(s);
//   var e = document.getElementById("change");
//   e.innerHTML = s;
//
// }
// function test() {
//   if (window.addEventListener) {
//     window.addEventListener("devicemotion", motion, false);
//   } else {
//     console.log("DeviceMotionEvent is not supported");
//   }
// }