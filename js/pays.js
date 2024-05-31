(function () {
    console.log("rest API");
    // URL de l'API REST de WordPress
    let boutons_pays = document.querySelectorAll(".cat_pays");
    let restapi = document.querySelector(".contenu__restapi__pays");

    boutons_pays.forEach(elm => {
        elm.addEventListener("click", function (e) {
            let pays = e.target.id; // Extract the country name from the button ID
            console.log("Pays sélectionné: ", pays);

            // URL de l'API REST avec le paramètre de recherche pour le pays
            let url = `https://gftnth00.mywhc.ca/tim35/wp-json/wp/v2/posts?search=${pays}&_embed=true`;

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
                    restapi.innerHTML = ""; // Clear previous content
                     if (pays === "États-Unis" && data.length > 0) {
                        data.splice(0, 1);
                    }
                    // La variable "data" contient la réponse JSON
                    console.log(data);
                    // Maintenant, vous pouvez traiter les données comme vous le souhaitez
                    // Par exemple, extraire les titres des articles comme dans l'exemple précédent
                    data.forEach(function (article) {
                        let titre = article.title.rendered;
                        let contenu = article.content.rendered;
                        let lien = article.link;
                        
                         // Accéder au lien de l'image mise en avant
                         let imageURL = article._embedded["wp:featuredmedia"][0].source_url;
                         if (!imageURL) {
                             imageURL = "https://via.placeholder.com/150";
                         }
                         
                        contenu = contenu.split('\.', 1)[0];

                        let carte = document.createElement("div");
                        carte.classList.add("restapi__carte__pays");

                        carte.innerHTML = `
                            <img class="img_pays" src="${imageURL}" alt="${titre}">
                            <div class="info_destination">
                                <h2>${titre}</h2>
                                <p>${contenu}</p>
                                <p><a href="${lien}">Voir la suite</a></p>
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
