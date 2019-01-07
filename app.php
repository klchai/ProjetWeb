<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Mobile Phone Sensor Application</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" href="projet.css">
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>

      <?php
      $fichier = "./projet.json";

      if (isset($_POST['adresse']) && isset($_POST['mot']) && !isset($_POST['verifmot'])) {
        $adresse = $_POST['adresse'];
        $mot = $_POST['mot'];

        $fichier = "./projet.json";
        $contenu = file_get_contents($fichier);

        $json_data = json_decode($contenu, true);

        $trouve = false;
        foreach ($json_data['usr'] as $data) {
          if ($data['adresse']==$adresse && $data['mot']==$mot) {
            $trouve = true;
          }
        }
        if ($trouve) {
          echo "";
          echo "<script>var adresse=$adresse;</script>";
        } else {
          header('refresh:0; url=index.php');
          // echo "<div class='warning'><p>️L'adresse ou le mot de passe sont incorrects...</p></div><br>";
        }

      }
      ?>

      <div class="title">
        <h3> Mobilephone Sensor<br>Test Page </h3>
      </div>
      <br>

      <div class="testbt">
        <button id="test" onclick="test()">Test</button>
      <br>
    </div>
    <br>

    <div class="trace">
      <button id="trace" onclick="trace()">Trace</button>
      <br>
  </div>
    <br>

      <div class="motcle" style="display:none">
        <!-- <form> -->
        <input type="text" id="motcle" name="motcle" placeholder="motcle" required = "required">
        <br>
        <br>
        <button type="submit" id="valid" class="w3-button w3-light-grey" onclick="beforeStart()">Valider</button>
        <!-- </form> -->
      </div>
      <br>

      <div class="panel" style="display:none">
        <p id="change1">Wait</p>
        <p id="change2">Wait</p>
        <br>
        <button id="start" class="w3-button w3-light-grey" onclick="go()">Start</button>
        <button id="stop" class="w3-button w3-light-grey" onclick="stop()">Stop</button>
      </div>


      <div class="recherche" style="display:none">
        <!-- <form> -->
        <input type="text" id="recherche" name="recherche" placeholder="rechercher par mot cle" required = "required">
        <br>
        <br>
        <input type="date" id='recherchedate'/>
        <br>
        <br>
        <button type="submit" id="valid" class="w3-button w3-light-grey" onclick="recherche()">Valider</button>
        <!-- </form> -->
      </div>
      <br>

      <div class="graph" style="display:none">
        <canvas id="chart"></canvas>
      </div>
      <br>

      <div class="graph" style="display:none">
        <canvas id="trahc"></canvas>
      </div>
      <br>

      <div class="sdata" style="display:none">
        <ol id="hhh">
        </ol>
      </div>
      <br>

      <div class="retour" style="display:none">
        <button id="retour" onclick="retour()">Retour</button>
      </div>
      <br>

      <div class="tracebt" style="display:none">
        <button id="tracebt" onclick="tracebt()">Trace?</button>
      </div>

      <script type="text/javascript" src="projet.js"></script>
    </body>
</html>
