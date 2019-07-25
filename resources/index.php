<?php

/**
 * Plugin Name: PluginNameBeauty
 * Description: PluginNameBeauty is a breathtaking plugin
 * Version: 1.0.2
 * Author: You,the best
 *
 * @package plugin-prefix
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load all translations for our plugin from the MO file.
*/
add_action( 'init', '__registerBlockFunctionName____load_textdomain' );

function __registerBlockFunctionName____load_textdomain() {
	load_plugin_textdomain( 'plugin-prefix', false, basename( __DIR__ ) . '/languages' );
}

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function __registerBlockFunctionName____register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'plugin-prefix-esnext',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	wp_register_style(
		'plugin-prefix-esnext-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'plugin-prefix-esnext',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'plugin-prefix/plugin-name-internal', array(
		'style' => 'plugin-prefix-esnext',
		'editor_style' => 'plugin-prefix-esnext-editor',
		'editor_script' => 'plugin-prefix-esnext',
	) );

}
add_action( 'init', '__registerBlockFunctionName____register_block' );
