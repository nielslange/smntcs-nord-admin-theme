import { test, expect } from '@playwright/test';

test.describe( 'SMNTCS Nord Admin Theme', () => {
	test.beforeEach( async ( { page } ) => {
		// Log in to WordPress admin
		await page.goto( '/wp-login.php' );
		await page.fill( '#user_login', 'admin' );
		await page.fill( '#user_pass', 'password' );
		await page.click( '#wp-submit' );
		await page.waitForURL( '**/wp-admin/' );
	} );

	test( 'should apply Nord theme colors to admin interface', async ( {
		page,
	} ) => {
		// Navigate to profile page to change admin color scheme
		await page.goto( '/wp-admin/profile.php' );

		// Select Nord theme
		await page.click( 'input[name="admin_color"][value="nord"]' );
		await page.click( '#submit' );

		// Verify theme is applied
		await page.reload();
		const selectedTheme = await page.$eval(
			'input[name="admin_color"]:checked',
			( el: HTMLInputElement ) => el.value
		);
		expect( selectedTheme ).toBe( 'nord' );
	} );

	test( 'should have correct plugin settings link', async ( { page } ) => {
		// Navigate to plugins page
		await page.goto( '/wp-admin/plugins.php' );

		// Find the plugin row
		const pluginRow = page.locator(
			'tr[data-plugin="smntcs-nord-admin-theme/smntcs-nord-admin-theme.php"]'
		);

		// Verify settings link exists and points to profile page
		const settingsLink = pluginRow.locator( 'a[href*="profile.php"]' );
		await expect( settingsLink ).toBeVisible();
		await expect( settingsLink ).toHaveText( 'Settings' );
	} );

	test( 'should apply correct color scheme values', async ( { page } ) => {
		// Navigate to profile page and select Nord theme
		await page.goto( '/wp-admin/profile.php' );
		await page.click( 'input[name="admin_color"][value="nord"]' );
		await page.click( '#submit' );

		// Wait for the theme to be applied
		await page.waitForLoadState( 'networkidle' );

		// Verify color scheme values
		const adminMenuBack = page.locator( '#adminmenuback' );
		const currentSubmenu = page.locator( 'a.wp-has-current-submenu' );

		await expect( adminMenuBack ).toHaveCSS(
			'background-color',
			'rgb(59, 66, 82)'
		);
		await expect( currentSubmenu ).toHaveCSS(
			'background-color',
			'rgb(94, 129, 172)'
		);
	} );
} );
