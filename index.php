
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
          <form method="post" action="index.php">
              <!-- Adresse Mail -->
              <input type="text" name="adresse" placeholder="username" required>
              <br>
              <br>
              <!-- Mot de passe -->
              <input type="text" name="mot" placeholder="mot de passe" required>
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

      
             

      <div class="panel">
        <h4 id="change"> DEVENEZ MEMBRE DE TEST </h4>
          <form method="post" action="index.php">
            <input type="text" name="adresse" placeholder="adresse mail" required>
            <br>
            <br>
            <input type="text" name="mot" placeholder="mot de passe" required>
            <br>
            <br>
            <input type="text" name="verifmot" placeholder="verifiez mot de passe" required>
            <br>
            <br>
            <button type="submit" class="w3-button w3-light-grey">Se créer</button>
            <br>
          </form>
      </div>
    </body>
</html>