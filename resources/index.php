<?php

/**
 * Plugin Name: __pluginName__
 * Plugin URI: DIY
 * Description: TODO
 * Version: TODO
 * Author: YOU
 *
 * @package __pluginPrefixInternal__
 */

defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function __registerBlockFunctionName___register_block() {

	if ( ! function_exists( 'register_block_type' ) ) {
		// Gutenberg is not active.
		return;
	}

	wp_register_script(
		'__pluginPrefixInternal__-__pluginNameInternal__',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	wp_register_style(
		'__pluginPrefixInternal__-__pluginNameInternal__-editor',
		plugins_url( 'editor.css', __FILE__ ),
		array( 'wp-edit-blocks' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' )
	);

	wp_register_style(
		'__pluginPrefixInternal__-__pluginNameInternal__-style',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( '__pluginPrefixInternal__/__pluginNameInternal__', array(
		'style' => '__pluginPrefixInternal__-__pluginNameInternal__',
		'editor_style' => '__pluginPrefixInternal__-__pluginNameInternal__-editor',
		'editor_script' => '__pluginPrefixInternal__-__pluginNameInternal__-style',
	) );

}
add_action( 'init', '__registerBlockFunctionName___register_block' );
