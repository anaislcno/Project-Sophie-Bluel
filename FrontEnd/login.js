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
    .then((result) => {
      if (result.status != 200) {
        // On sécurise les codes différent de 200 en quittant la function : return
        console.log("La requête nest pas validée");
        return;
      }

      // Status est forcémment == 200
      console.log(
        "Bravo tu as réussi ta requete, tu peux récupérer tes données"
      );
      window.location = "index.html";
    })
    .catch((error) => {
      // si ta requête n'a pas eu de retour
      console.log("il ya eu un problème dans la requête", error);
    });

  // const result = await fetch("http://localhost:5678/api/users/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: loginInfo,
  //   })

  //   if (result.status == 200) {
  //     console.log('Bravo ça a marché !!');
  //   } else {
  //     console.log('Oh non cest raté');
  //   }
});
