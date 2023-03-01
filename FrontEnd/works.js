const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

// Fonction qui génère toute la page web
function generateWorks(works) {
  // Boucle pour tous les éléments
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const divGallery = document.querySelector(".gallery");
    // Création d’une balise dédiée à un projet
    const worksElement = document.createElement("figure");

    // Création des balises
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = article.imageUrl;
    imageUrlElement.alt = article.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = article.title;

    // On rattache la balise article a la div
    divGallery.appendChild(worksElement);
    // On rattache l’image à la figure
    worksElement.appendChild(imageUrlElement);
    worksElement.appendChild(titleElement);
  }
}

// Premier affichage de la page
generateWorks(works);

// Filtres

// Filtre : Tous

const buttonAll = document.querySelector("#btn-all");

buttonAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(works);
});

// Filtre : Objects

const buttonObjects = document.querySelector("#btn-object");

buttonObjects.addEventListener("click", function () {
  const worksObjectsFilter = works.filter(function (work) {
    return work.category.name === "Objets";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksObjectsFilter);
});

// Filtre : Appartements

const buttonAppart = document.querySelector("#btn-apt");

buttonAppart.addEventListener("click", function () {
  const worksAppartFilter = works.filter(function (work) {
    return work.category.name === "Appartements";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksAppartFilter);
});

// Filtre : Hôtels/Restaurants

const buttonHotel = document.querySelector("#btn-hotels");

buttonHotel.addEventListener("click", function () {
  const worksHotelFilter = works.filter(function (work) {
    return work.category.name === "Hotels & restaurants";
  });
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(worksHotelFilter);
});

// MODALE --> Mise en place
// Déclaration des const pour ouvrir/fermer la modale

const modal = document.getElementById("modal1");
const buttonModal = document.getElementById("btn-modal");
const closeModal = document.getElementById("close");

//  Apparition de la modale qd on clique s/ le bouton

buttonModal.onclick = function () {
  modal.style.display = "flex";
};

//La modale se ferme si on clique sur la croix

closeModal.onclick = function () {
  modal.style.display = "none";
};

// La modale se ferme si on clique en dehors

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//La modale se ferme avec esc

window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
  }
});

function enableEditingMode() {
  const token = window.localStorage.getItem("accessToken");

  if (token == null) {
    // user pas connecté
    console.log("Vous devez vous connecter d'abord");
  } else {
    // le user est connecté
    console.log("Vous êtes connecté !");

    document.getElementById("edition-mode").style.display = "flex";

    Array.from(document.getElementsByClassName("btn-modif")).forEach(function (
      element
    ) {
      element.style.display = "block";
    });

    document.getElementById("nav-login").style.display = "none";
    document.getElementById("nav-logout").style.display = "flex";

    const logout = document.getElementById("nav-logout");

    logout.onclick = function () {
      window.localStorage.clear("accessToken");
    };
  }
}

enableEditingMode();
