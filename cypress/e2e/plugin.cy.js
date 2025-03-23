const plugin = 'SMNTCS Nord Admin Theme';

describe( 'Admin', () => {
	beforeEach( function () {
		cy.login();
	} );

	it( `can ensure the ${ plugin } plugin is activated`, () => {
		cy.checkPluginActivation();
	} );

	it( `can activate ${ plugin } color scheme`, () => {
		cy.activateNordAdminTheme();
	} );

	it( `can see ${ plugin } color scheme`, () => {
		cy.checkNordAdminTheme();
	} );
} );
