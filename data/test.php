<?php



$nomfichier = 'test.json';

$contenu = file_get_contents($nomfichier);
$json_string = json_decode($contenu, true);
print_r($json_string);




$tab = [];
$donnee = Array('s'=>0, 'x'=>1, 'y'=>2, 'z'=>3, 'alpha'=> 4);
$tab[] = $donnee;
$tab[] = $donnee;
$tab[] = $donnee;
print_r($tab);

$r = Array('motcle' => 't1', 'date' => '2018-09-03', 'donnees' => $tab);

print_r($r);


?>
