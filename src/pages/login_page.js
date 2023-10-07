const { expect } = require('@playwright/test');
const PlaywrightWrapper = require('../helper/wrapper/PlaywrightWrappers');
const data = require('../helper/util/test-data/test_data.json');


class LoginPage {
    constructor(page) {
        this.page = page;
        this.base = new PlaywrightWrapper(page);
        this.Elements = {
            loginLink:"button[class='mat-focus-indicator mat-button mat-button-base ng-star-inserted'] span[class='mat-button-wrapper']",
            userInput: "input[formcontrolname='username']",
            passwordInput: "input[formcontrolname='password']",
            loginBtn: 'button[color="primary"]',
            userNameDisplay: "xpath=//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]",
            errorMessage: '#mat-error-0'
        };
    }

    async clickLoginLink() {
        await this.page.locator(this.Elements.loginLink).click();
    }
    async enterUserName(user) {
        await this.page.locator(this.Elements.userInput).fill(user);
    }

    async enterPassword(password) {
        await this.page.locator(this.Elements.passwordInput).fill(password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }

    async verifyLoginSuccesseful () {
        await expect(this.page.locator(this.Elements.userNameDisplay)).toContainText('georgel');
    }

    async getErrorMessage() {
        await expect(this.page.locator(this.Elements.errorMessage)).toHaveText('Username or Password is incorrect.');
    }

    async userLogin() {
        const user = data.existingUser.username;
        const password = data.existingUser.password;
        await this.clickLoginLink();
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
        await this.verifyLoginSuccesseful();
    }
}

module.exports = LoginPage;
