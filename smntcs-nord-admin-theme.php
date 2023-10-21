<?php
/**
 * Plugin Name:           SMNTCS Nord Admin Theme
 * Plugin URI:            https://github.com/nielslange/smntcs-nord-admin-theme/
 * Description:           Adds an admin theme based on the <a href="https://www.nordtheme.com/">Nord Theme</a> color scheme.
 * Author:                Niels Lange
 * Author URI:            https://nielslange.de
 * Text Domain:           smntcs-nord-admin-theme
 * Version:               1.4
 * Requires at least:     5.2
 * Requires PHP:          5.6
 * License:               GPL-2.0-or-later
 * License URI:           https://www.gnu.org/licenses/gpl-2.0.html
 *
 * @package SMNTCS_Nord_Admin_Theme
 */

defined( 'ABSPATH' ) || exit;

/**
 * SMNTCS_Nord_Admin_Theme main class.
 */
class SMNTCS_Nord_Admin_Theme {

	/**
	 * Initialise the plugin.
	 *
	 * @return void
	 * @since 1.2.0
	 */
	public static function init() {
		add_action( 'admin_init', array( __CLASS__, 'load_admin_css' ) );
		add_action( 'plugin_action_links_' . plugin_basename( __FILE__ ), array( __CLASS__, 'add_plugin_settings_link' ) );
	}

	/**
	 * Initialise the plugin.
	 *
	 * @return void
	 * @since 1.0.0
	 */
	public static function load_admin_css() {
		$suffix  = is_rtl() ? '-rtl' : '';
		$suffix .= SCRIPT_DEBUG ? '' : '.min';

		wp_admin_css_color(
			'nord',
			__( 'Nord', 'smntcs-nord-admin-theme' ),
			plugins_url( "/nord/colors$suffix.css", __FILE__ ),
			array(
				'#3B4252',
				'#5E81AC',
				'#81A1C1',
				'#88C0D0',
			),
			array(
				'base'    => '#a7aaad',
				'focus'   => '#72aee6',
				'current' => '#fff',
			)
		);
	}

	/**
	 * Add settings link on plugin page
	 *
	 * @param array $url The original URL.
	 * @return array The updated URL.
	 * @since 1.0.0
	 */
	public static function add_plugin_settings_link( $url ) {
		$admin_url     = admin_url( 'profile.php' );
		$settings_link = '<a href="' . $admin_url . '">' . __( 'Settings', 'smntcs-nord-admin-theme' ) . '</a>';
		array_unshift( $url, $settings_link );

		return $url;
	}
}

SMNTCS_Nord_Admin_Theme::init();
