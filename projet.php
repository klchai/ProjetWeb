<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Test of Projet Web</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <script type="text/javascript" src="projet.js"></script>
    </head>
    <body>
        <nav class="fixed-nav-bar">
        </nav>
                
        <h1 id="change"> Se connecter </h1>
        <form method="post" action="page1.php">
          <h5>Adresse Mail</h5>
          <input type="text" name="adresse" required>
          <br>
          <h5>Mot de passe </h5>
          <input type="text" name="mot" required>
          <br>
          <br>
          <button type="submit" class="w3-button w3-light-blue">Se connecter</button>
          <br>
        </form>

        <hr>
        <br>
        <form action="https://tp-ssh1.dep-informatique.u-psud.fr/~shenjin.lyu/Web/ProjetWeb/creercompte.php">
            <button id="b" type="submit" class="w3-button w3-light-blue">Se créer un compte</button>
        </form>

    </body>
</html>