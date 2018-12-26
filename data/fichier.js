function countDown(){
  if (countdown>=1) {
    e1.innerHTML=countdown;
    countdown=countdown-1;
    t = setTimeout("countDown()",1000);
  } else {
    e1.innerHTML=countdown;
    start();
  }
}

function start(){
  s = true;
  timedCount();
  dm();
  dorient();
}
