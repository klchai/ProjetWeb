<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Test of Projet Web</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" href="projet.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <script type="text/javascript" src="projet.js"></script>
    </head>
    <body>

      <div class="title">
        <h3> Mobilephone Sensor<br>Test Page </h3>
      </div>
      <br>



      <div class="panel">
          <h4 id="change"> DÉJÀ MEMBRE ? </h4>
          <form method="post" action="app.php">
              <!-- Adresse Mail -->
              <input type="text" name="adresse" placeholder="username" required>
              <br>
              <br>
              <!-- Mot de passe -->
              <input type="password" name="mot" placeholder="mot de passe" required>
              <br>
              <br>
              <button type="submit" class="w3-button w3-light-grey">Se connecter</button>
              <br>
          </form>
          <!-- <form action="https://tp-ssh1.dep-informatique.u-psud.fr/~shenjin.lyu/Web/ProjetWeb/creercompte.php">
              <button id="b" type="submit" class="w3-button w3-light-blue">Se créer un compte</button>
          </form -->
      </div>

      <br>


        <?php
        $fichier = "./projet.json";
        if (isset($_POST['adresse']) && isset($_POST['mot']) && isset($_POST['verifmot'])) {
          if ($_POST['mot']==$_POST['verifmot']) {
            $adresse = $_POST['adresse'];
            $mot = $_POST['mot'];

            $fichier = "./projet.json";
            $contenu = file_get_contents($fichier);
            $json_data = json_decode($contenu, true);


            $existe = false;
            foreach ($json_data['usr'] as $u) {
              if ($adresse == $u['adresse']) {
                $existe = true;
              }
            }

            if (!$existe) {
              $json_data['usr'][] = Array('adresse' => $adresse, 'mot' => $mot);

              $nouv_json_data = json_encode($json_data);
              file_put_contents($fichier,$nouv_json_data);


              $nouveauF = './data/'.$adresse.'.json';
              fopen($nouveauF,'w+');

              echo "<div class='success'><p>Votre compte est bien créé.</p></div><br>";
            } else {
              echo "<div class='warning'><p>Ce nom d'utilisateur est déjà existe.</p><div><br>";
            }
          } else {
            echo "<div class='warning'><p>Les mots de passe ne sont pas le même.</p></div><br>";
          }
        }
        ?>


      <div class="panel">
        <h4 id="change"> DEVENEZ MEMBRE DE TEST </h4>
          <form method="post" action="index.php">
            <input type="text" name="adresse" placeholder="adresse mail" required>
            <br>
            <br>
            <input type="password" name="mot" placeholder="mot de passe" required>
            <br>
            <br>
            <input type="password" name="verifmot" placeholder="verifiez mot de passe" required>
            <br>
            <br>
            <button type="submit" class="w3-button w3-light-grey">Se créer</button>
            <br>
          </form>
      </div>
    </body>
</html>
