<?php
  $data = $_POST['mydata'];
  $motcle = $_POST['motcle'];
  $adresse = $_POST['adresse'];
  $getDate = date("Y-m-d H:i:s");

  $nomfichier = 'data/'.$adresse.'.json';
  $contenu = file_get_contents($nomfichier);
  $json_string = json_decode($contenu, true);


  $tab = [];
  foreach ($data as $d) {
    $donnee = Array('s'=>$d[0], 'x'=>$d[1], 'y'=>$d[2], 'z'=>$d[3], 'alpha'=>$d[4],
    'beta'=>$d[5], 'gamma'=>$d[6]);
    $tab[] = $donnee;
  }

  $json_string['BD'][] = Array("motcle" => $motcle, "date" => $getDate, "donnees" => $tab);

  $nouv_json_string = json_encode($json_string);
  // $json_string = JSON.stringify($data);
  file_put_contents($nomfichier, $nouv_json_string);
  // echo "OK";
?>
