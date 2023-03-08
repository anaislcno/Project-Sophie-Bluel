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

const buttonAll = document.querySelector("#btn-all");

buttonAll.addEventListener("click", function () {
  document.querySelector(".gallery").innerHTML = "";
  generateWorks(works);
});

//
const listFilter = document.querySelector("#filter");

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((filters) => {
    for (let filter of filters) {
      const btn = document.createElement("button");
      btn.innerText = filter.name;
      btn.classList.add("btn");

      btn.addEventListener("click", function () {
        const worksObjectsFilter = works.filter(function (work) {
          return work.category.name === filter.name;
        });

        document.querySelector(".gallery").innerHTML = "";
        generateWorks(worksObjectsFilter);
      });

      listFilter.appendChild(btn);
      changeHighlight();
    }
  });

// Highlight sur le filtre sélectionné
function changeHighlight() {
  let buttonFilters = document.getElementById("filter");
  let buttonHighlight = buttonFilters.getElementsByClassName("btn");

  for (let i = 0; i < buttonHighlight.length; i++) {
    buttonHighlight[i].addEventListener("click", function () {
      let buttonSelected = document.getElementsByClassName("active");
      buttonSelected[0].classList.remove("active");
      this.classList.add("active");
    });
  }
}

// MODALE --> Mise en place

// Déclaration des const pour ouvrir/fermer la modale
const modal = document.getElementById("modal1");
const overlay = document.getElementById("overlay");
const buttonModal = document.getElementById("btn-modal");
const closeModal = document.getElementById("close");
const modalAdd = document.getElementById("modal-add");

//  Apparition de la modale qd on clique s/ le bouton
buttonModal.addEventListener("click", function () {
  modal.style.display = "flex";
  overlay.style.display = "flex";
  modalAdd.style.display = "none";
});

//La modale se ferme si on clique sur la croix
closeModal.addEventListener("click", function () {
  modal.style.display = "none";
  overlay.style.display = "none";
});

// La modale se ferme si on clique en dehors
window.addEventListener("click", function (event) {
  if (event.target == overlay) {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
});

//La modale se ferme avec esc
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    modal.style.display = "none";
    overlay.style.display = "none";
  }
});

// Formulaire modale
const buttonNewProject = document.getElementById("cta-edit");
const modalGallery = document.getElementById("modal-gallery");

buttonNewProject.addEventListener("click", function () {
  modalGallery.style.display = "none";
  modalAdd.style.display = "block";
});

// Retour à la galerie modale
const buttonReturn = document.getElementById("return");

buttonReturn.addEventListener("click", function () {
  modalGallery.style.display = "block";
  modalAdd.style.display = "none";
});

// Affichage du mode d'édition

function enableEditingMode() {
  const token = window.localStorage.getItem("accessToken");

  if (token == null) {
    // User pas co
    console.log("Vous devez vous connecter d'abord");
  } else {
    // User co
    console.log("Vous êtes connecté !");

    document.getElementById("edition-mode").style.display = "flex";

    Array.from(document.getElementsByClassName("btn-modif")).forEach(function (
      element
    ) {
      element.style.display = "block";
    });

    //Ajout du processus de logout

    document.getElementById("nav-login").style.display = "none";
    document.getElementById("nav-logout").style.display = "flex";

    const logout = document.getElementById("nav-logout");

    logout.addEventListener("click", function () {
      window.localStorage.clear("accessToken");
    });
  }
}

enableEditingMode();

// Grid modale
// Fonction qui génère

function generateWorksGrid(works) {
  // Boucle pour tous les éléments
  for (let i = 0; i < works.length; i++) {
    const article = works[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const divEditGallery = document.querySelector("#edit-gallery");
    // Création d’une balise dédiée à un projet
    const worksElement = document.createElement("figure");
    worksElement.classList.add("figure-element");

    // Création des balises
    const imageUrlElement = document.createElement("img");
    imageUrlElement.src = article.imageUrl;
    imageUrlElement.alt = article.imageUrl;
    const titleElement = document.createElement("figcaption");
    titleElement.innerText = "éditer";

    const buttonDelete = document.createElement("i");
    buttonDelete.classList.add("fa-solid", "fa-trash-can", "btn-delete");
    // On rattache la balise article a la div
    divEditGallery.appendChild(worksElement);
    // On rattache l’image à la figure

    worksElement.appendChild(imageUrlElement);
    worksElement.appendChild(titleElement);
    worksElement.appendChild(buttonDelete);

    // Boutton de suppression
    buttonDelete.addEventListener("click", function (event) {
      const token = window.localStorage.getItem("accessToken");
      event.preventDefault();
      const deleteMethod = {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
        },
      };
      fetch("http://localhost:5678/api/works/" + article.id, deleteMethod);
    });
  }
}

// Affichage de la page
generateWorksGrid(works);

// Visualition img formulaire

imageInput.onchange = (evt) => {
  const [file] = imageInput.files;
  if (file) {
    preview.src = URL.createObjectURL(file);
  }
  if (file != null) {
    preview.style.display = "block";
    const displayPreview = document.getElementById("hide");
    displayPreview.style.display = "none";
  }
};

// const displayPreview = document.getElementsByClassName("file-upload");
// const hideBtn = document.getElementById("hide");

// displayPreview.addEventListener("click", function () {
//   hideBtn.style.display = "none";
// });
