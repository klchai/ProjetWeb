<?php

  // recuperer les trois donnes envoyees par javascript
  $data = $_POST['mydata'];
  $motcle = $_POST['motcle'];
  $adresse = $_POST['adresse'];

  // recuperer le temps actuel
  $getDate = date("Y-m-d H:i:s");

  // trouver le fichier .json correspondent du compte utilise dans notre repertoire 'data'
  $nomfichier = 'data/'.$adresse.'.json';

  // obtenir tous les anciennes donnees dans ce fichier et decoder en php
  $contenu = file_get_contents($nomfichier);
  $json_string = json_decode($contenu, true);

  // transmettre les nouvelles donnees en arraylist
  $tab = [];
  foreach ($data as $d) {
    $donnee = Array('s'=>$d[0], 'x'=>$d[1], 'y'=>$d[2], 'z'=>$d[3], 'alpha'=>$d[4],
    'beta'=>$d[5], 'gamma'=>$d[6]);
    $tab[] = $donnee;
  }

  // ajouter ces nouvelles donnees
  $json_string['BD'][] = Array("motcle" => $motcle, "date" => $getDate, "donnees" => $tab);

  // encoder tout en json et enregister dans le fichier
  $nouv_json_string = json_encode($json_string);
  file_put_contents($nomfichier, $nouv_json_string);

?>
