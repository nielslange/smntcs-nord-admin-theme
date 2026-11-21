/**
 * The plugin adds a «Nord» admin colour scheme to Users → Profile. The specs pick it, check the admin uses its
 * colours, and switch back to the default scheme afterwards.
 */
import { test, expect } from '@wordpress/e2e-test-utils-playwright';

async function pickScheme( page, scheme ) {
	await page.goto( '/wp-admin/profile.php' );
	await page.locator( `input[name="admin_color"][value="${ scheme }"]` ).check();
	await page.locator( '#submit' ).click();
	await expect( page.locator( '#message' ) ).toContainText( 'Profile updated' );
}

test.describe( 'Nord Admin Theme', () => {
	test.afterAll( async ( { browser } ) => {
		const page = await browser.newPage();
		await pickScheme( page, 'fresh' );
		await page.close();
	} );

	test( 'adds a Settings link to the profile screen', async ( { page } ) => {
		await page.goto( '/wp-admin/plugins.php' );
		const link = page
			.locator( 'tr[data-slug="smntcs-nord-admin-theme"]' )
			.getByRole( 'link', { name: 'Settings' } );
		await expect( link ).toHaveAttribute( 'href', /\/wp-admin\/profile\.php$/ );
	} );

	test( 'offers the Nord scheme and keeps it selected', async ( { page } ) => {
		await pickScheme( page, 'nord' );
		await page.reload();
		await expect(
			page.locator( 'input[name="admin_color"][value="nord"]' )
		).toBeChecked();
		await expect( page.locator( '#colors-css' ) ).toHaveAttribute(
			'href',
			/smntcs-nord-admin-theme\/nord\/colors(\.min)?\.css/
		);
	} );

	test( 'colours the admin menu in Nord', async ( { page } ) => {
		await pickScheme( page, 'nord' );
		await page.goto( '/wp-admin/' );
		await expect( page.locator( '#adminmenuback' ) ).toHaveCSS(
			'background-color',
			'rgb(59, 66, 82)'
		);
		await expect(
			page.locator( '#adminmenu a.wp-has-current-submenu' ).first()
		).toHaveCSS( 'background-color', 'rgb(94, 129, 172)' );
	} );
} );
