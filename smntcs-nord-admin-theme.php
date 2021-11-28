<?php
/**
 * Plugin Name:       SMNTCS Nord Admin Theme
 * Plugin URI:        https://github.com/nielslange/smntcs-nord-admin-theme/
 * Description:       Adds an admin theme based on the Nord Theme color scheme.
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Niels Lange
 * Author URI:        https://nielslange.de/
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       smntcs-nord-admin-theme
 */

function smntcs_wp_admin_css_color() {
    $suffix  = is_rtl() ? '-rtl' : '';
    $suffix .= SCRIPT_DEBUG ? '' : '.min';

    wp_admin_css_color(
        'nord',
        __('Nord', 'smntcs-nord-admin-theme'),
        plugins_url( "/nord/colors$suffix.css", __FILE__ ),
        array( '#3B4252', '#5E81AC', '#81A1C1', '#88C0D0' ),
        array(
        'base'    => '#a7aaad',
        'focus'   => '#72aee6',
        'current' => '#fff',
        )
    );
}

add_action('admin_init', 'smntcs_wp_admin_css_color');
