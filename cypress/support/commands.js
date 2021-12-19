// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add( 'login', () => {
	cy.viewport( 1000, 1400 );
	cy.visit( 'http://localhost:8888/wp-login.php' ).wait( 500 );
	cy.get( '#user_login' ).type( 'admin' );
	cy.get( '#user_pass' ).type( 'password' );
	cy.get( '#wp-submit' ).click();
} );

Cypress.Commands.add( 'checkPluginActivation', () => {
	cy.viewport( 1000, 1400 );
	cy.visit( 'http://localhost:8888/wp-admin/plugins.php' ).wait( 500 );
	cy.get( 'tr[data-slug="smntcs-nord-admin-theme"]' ).then( ( $link ) => {
		if ( $link.hasClass( 'inactive' ) ) {
			cy.get(
				'tr[data-slug="smntcs-nord-admin-theme"] .activate a'
			).click();
		}
	} );
} );

Cypress.Commands.add( 'activateNordAdminTheme', () => {
	cy.viewport( 1000, 1400 );
	cy.visit( 'http://localhost:8888/wp-admin/profile.php' ).wait( 500 );
	cy.get( 'input#admin_color_nord' ).click();
	cy.get( '#submit' ).click();
} );

Cypress.Commands.add( 'checkNordAdminTheme', () => {
	cy.viewport( 1000, 1400 );
	cy.visit( 'http://localhost:8888/wp-admin/index.php' ).wait( 500 );
	cy.get(
		'#adminmenu li.wp-has-current-submenu a.wp-has-current-submenu'
	).should( 'have.css', 'background-color', 'rgb(94, 129, 172)' );
} );
