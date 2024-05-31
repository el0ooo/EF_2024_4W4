(function () {
    console.log("rest API");
    // URL de l'API REST de WordPress
    let boutons_pays = document.querySelectorAll(".cat_pays");
    let restapi = document.querySelector(".contenu__restapi__pays");

    boutons_pays.forEach(elm => {
        elm.addEventListener("click", function (e) {
            let pays = e.target.id.split('_')[1]; // Extract the category ID from the button ID
            console.log("Selected category:", pays);

            let url = `https://gftnth00.mywhc.ca/tim35/wp-json/wp/v2/posts?categories=${pays}`;

            // Effectuer la requête HTTP en utilisant fetch()
            fetch(url)
                .then(function (response) {
                    // Vérifier si la réponse est OK (statut HTTP 200)
                    if (!response.ok) {
                        throw new Error(
                            "La requête a échoué avec le statut " + response.status
                        );
                    }

                    // Analyser la réponse JSON
                    return response.json();
                })
                .then(function (data) {
                    // La variable "data" contient la réponse JSON
                    console.log(data);
                    restapi.innerHTML = ""; // Clear previous content

                    // Maintenant, vous pouvez traiter les données comme vous le souhaitez
                    // Par exemple, extraire les titres des articles comme dans l'exemple précédent
                    data.forEach(function (article) {
                        let titre = article.title.rendered;
                        let contenu = article.content.rendered;
						let lien = article.link;
                        let categories = article.categories;
                        let image = article.better_featured_image.source_url;

                        contenu = contenu.split('\.', 1)[0];

                        let carte = document.createElement("div");
                        carte.classList.add("restapi__carte");
                    
                        carte.innerHTML = `
                            <img src="${image}" alt="${titre}">
                            <div class="info_destination">
                                <h2>${titre}</h2>
                                <p>${contenu}</p>
                                <p><a href= "${lien}">Voir la suite</a></p>
                            </div>
                        `;
                        restapi.appendChild(carte);
                    });
                })
                .catch(function (error) {
                    // Gérer les erreurs
                    console.error("Erreur lors de la récupération des données :", error);
                });
        });
    });
})();
