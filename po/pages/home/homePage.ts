import {expect} from "@playwright/test";
import { BasePage } from "../../base/basePage";
import  CommonSelectors from "../../base/commonSelectors";
export default class HomePage extends BasePage{
    commonSelectors = new CommonSelectors();
    async verifyUserEmailDisplayed(userEmail: string){
        expect(await this.page.locator(this.commonSelectors.CUSTOMER_INFO_LINK).textContent()).toEqual(userEmail)
   }
}