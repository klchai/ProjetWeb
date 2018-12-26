<?php
  $data = $_POST['mydata'];
  $getDate = date("Y-m-d H:i");

  $donnee = Array('s'=>$data[0], 'x'=>$data[1], 'y'=>$data[2], 'z'=>$data[3], 'alpha'=>$data[4],
  'beta'=>$data[5], 'gamma'=>$data[6]);


  echo $data[7];

  $nomfichier = 'data/'.$data[8].'.json';

  $contenu = file_get_contents($nomfichier);
  $json_string = json_decode($contenu, true);
  //print_r($json_string);

  // $json_string[$data[7]]['date'] = $getDate;
  $json_string[$data[7]][$getDate]['donnees'][] = $donnee;
  $nouv_json_string = json_encode($json_string);
  // $json_string = JSON.stringify($data);
  file_put_contents($nomfichier, $nouv_json_string);
  // echo "OK";
?>
