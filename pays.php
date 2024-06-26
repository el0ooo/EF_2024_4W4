<?php 
/**
 * Package pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: https://github.com/el0ooo/EF_2024_4W4
Version: 1.0.0
Description: Permet d'afficher les destinations selon le pays choisit
*/

function ec_pays_enqueue() {
    $version_css = filemtime(plugin_dir_path(__FILE__) . "style.css");
    $version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
    wp_enqueue_style('EC_plugin_pays_css', plugin_dir_url(__FILE__) . "style.css", array(), $version_css);
    wp_enqueue_script('EC_plugin_voyage_js', plugin_dir_url(__FILE__) . "js/pays.js", array(), $version_js, true);
}
add_action('wp_enqueue_scripts', 'ec_pays_enqueue');

// Creation des destinations associées à un pays
function creation_destinations() {
    $contenu = '<div class="boutton__restapi__pays">
        <button class="cat_pays" id="France">France</button>
        <button class="cat_pays" id="États-Unis">États-Unis</button>
        <button class="cat_pays" id="Canada">Canada</button>
        <button class="cat_pays" id="Chili">Chili</button>
        <button class="cat_pays" id="Argentine">Argentine</button>
        <button class="cat_pays" id="Belgique">Belgique</button>
        <button class="cat_pays" id="Maroc">Maroc</button>
        <button class="cat_pays" id="Mexique">Mexique</button>
        <button class="cat_pays" id="Japon">Japon</button>
        <button class="cat_pays" id="Italie">Italie</button>
        <button class="cat_pays" id="Islande">Islande</button>
        <button class="cat_pays" id="Chine">Chine</button>
        <button class="cat_pays" id="Grèce">Grèce</button>
        <button class="cat_pays" id="Suisse">Suisse</button>
        </div>
        <div class="contenu__restapi__pays"></div>';
    return $contenu;
}

add_shortcode('EC_pays', 'creation_destinations');

// rajouter les images de mise a l'avant 
function ajouter_image_mise_avant($data, $post, $context) {
    $featured_image_id = $data->data['featured_media'];
    $featured_image_url = wp_get_attachment_image_src($featured_image_id, 'full');

    if ($featured_image_url) {
        $data->data['featured_image_url'] = $featured_image_url[0];
    } else {
        $data->data['featured_image_url'] = "https://via.placeholder.com/150";
    }

    return $data;
}
add_filter('rest_prepare_post', 'ajouter_image_mise_avant', 10, 3);
?>
