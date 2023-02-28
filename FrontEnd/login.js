const loginForm = document.querySelector(".login-form");
loginForm.addEventListener("submit", async function (event) {
  // Pour ne pas que le navigateur charge une nouvelle page
  event.preventDefault();
  // Création de l'objet du nouvel utilisateur
  const user = {
    email: event.target.querySelector("[name=mail]").value,
    password: event.target.querySelector("[name=password]").value,
  };

  // Création de la charge utile au format JSON
  const loginInfo = JSON.stringify(user);
  // Appel de la fonction fetch avec toutes les infos nécessaires

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: loginInfo,
  })
    .then(async (result) => {
      if (result.status != 200) {
        // On sécurise les codes différents de 200 en quittant la function avec return
        console.log("La requête n'est pas validée");
        document.getElementById("err").innerHTML =
          "Erreur dans l'identifiant ou le mot de passe";
        document.getElementById("err").style.display = "block";
        return;
      }

      // Status est forcémment == 200
      console.log(
        "Bravo tu as réussi ta requête, tu peux récupérer tes données"
      );

      const jsonResponse = await result.json(); // tu récupére les données de la réponse

      //tu stock le token dans le localstorage
      window.localStorage.setItem("accessToken", jsonResponse.token);

      // Redirection vers la page d'acceuil en cas de succès
      window.location = "index.html";
    })
    .catch((error) => {
      // Si la requête ne fonctionne pas
      console.log("Il ya eu un problème dans la requête", error);
    });
});
