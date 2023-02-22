const reponse = await fetch ('http://localhost:5678/api/works');
const works = await reponse.json();

// Fonction qui génère toute la page web
function generateWorks(works){
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

buttonAll.addEventListener("click", function() {
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(works);
})

// Filtre : Objects

const buttonObjects = document.querySelector("#btn-object");

buttonObjects.addEventListener("click", function () {
    const worksObjectsFilter = works.filter(function (work) {
        return work.category.name === "Objets";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksObjectsFilter)
});

// Filtre : Appartements 

const buttonAppart = document.querySelector("#btn-apt");

buttonAppart.addEventListener("click", function () {
    const worksAppartFilter = works.filter(function (work) {
        return work.category.name === "Appartements";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksAppartFilter)
});

// Filtre : Hôtels/Restaurants

const buttonHotel = document.querySelector("#btn-hotels");

buttonHotel.addEventListener("click", function () {
    const worksHotelFilter = works.filter(function (work) {
        return work.category.name === "Hotels & restaurants";
    });
    document.querySelector(".gallery").innerHTML = "";
    generateWorks(worksHotelFilter)
});