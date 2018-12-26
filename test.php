<?php


  $nomfichier = 'data/4.json';
  $contenu = file_get_contents($nomfichier);
  $json_string = json_decode($contenu, true);

  print_r($json_string);




?>
