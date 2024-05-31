<?php 
/**
 * Package pays
 * Version 1.0.0
 */
/*
Plugin name: Pays
Plugin uri: 
Version: 1.0.0
Description: Permet d'afficher les destinations selon le pays choisit
*/
function ec_pays_enqueue()
{
$version_css = filemtime(plugin_dir_path( __FILE__ ) . "style.css");
$version_js = filemtime(plugin_dir_path(__FILE__) . "js/pays.js");
wp_enqueue_style(   'EC_plugin_pays_css',
                     plugin_dir_url(__FILE__) . "style.css",
                     array(),
                     $version_css);

wp_enqueue_script(  'EC_plugin_voyage_js',
                    plugin_dir_url(__FILE__) ."js/voyage.js",
                    array(),
                    $version_js,
                    true);
}
add_action('wp_enqueue_scripts', 'ec_pays_enqueue');

// cration des destionations associées à un pays
function creation_destinations(){
    
}
?>
