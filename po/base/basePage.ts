import {Locator, Page,TestInfo,expect} from "@playwright/test";
import CommonSelectors from './commonSelectors';
// to store all common functions
export abstract class BasePage {
    constructor(readonly page: Page) { }
    commonSelectors = new CommonSelectors();
    async navigate(path: string) {
        await this.page.goto(path);
    }
    async closePage() {
        await this.page.close();
    }
    async context() {
        return this.page.context();
    }
    async wait(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds);
    }
    async screenshot(testInfo: TestInfo) {
        const screenshotBody = await this.page.screenshot();
        await testInfo.attach('screenshot', { body: screenshotBody, contentType: 'image/png' });
    }

    async logout() {
        await this.page.locator(this.commonSelectors.LOGOUT_LINK).click();
    }

    async waitForPageToLoad() {
        await expect(this.page.locator(this.commonSelectors.LOADING_IMAGE)).not.toBeVisible();
    }

    async goToProductPage(productCategory: string) {
        await this.page.locator(`//ul[@class='top-menu']//a[contains(text(),'${productCategory}')]`).click();
    }

    async goToSubProductPage(productCategory: string, productSubCategory: string) {
        await this.page.locator(`//ul[@class='top-menu']//a[contains(text(),'${productCategory}')]`).hover();
        await this.page.locator(`//ul[@class='top-menu']//ul//a[contains(text(),'${productSubCategory}')]`).click();
    }
    async goToShoppingCartPage() {
        await this.page.locator(this.commonSelectors.SHOPPING_CART_LINK).click();
    }
    async clickOnButton(buttonName: string) {
        await this.page.locator(`//input[@value='${buttonName}']`).click({force: true});
    }

    async clickOnLinkInFooter(linkName: string) {
        await this.page.locator(`//div[@class='footer']//a[text()='${linkName}']`).click();
    }
    async clickOnLinkInSidebar(linkName: string) {
        await this.page.locator(`//div[@class='listbox']//a[contains(text(),'${linkName}')]`).click();
    }
    async acceptDialog(){
        this.page.on("dialog", async (alert) => {
            const text = alert.message();
            console.log(text);;
            await alert.accept();
        })
    }
}
