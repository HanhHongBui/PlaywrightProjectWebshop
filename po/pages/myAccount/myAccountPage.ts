import {expect} from "@playwright/test";
import { BasePage } from "../../base/basePage";
import  MyAccountSelectors from "./myAccount.selector";
export default class MyAccountPage extends BasePage{
    myAccountSelectors = new MyAccountSelectors();

    async fillInAccountInfo(textBoxName: string, textBoxvalue: string){
        await this.page.locator(`//label[contains(text(),'${textBoxName}')]//following-sibling::input`).fill(textBoxvalue);
    }
    async selectCountry(country: string){
        await this.page.locator(this.myAccountSelectors.CONTRY_DROPDOWN_LIST).selectOption(country);
    }
    async addNewAddress(addAddress: any){
        await this.fillInAccountInfo("First name",addAddress.firstName);
        await this.fillInAccountInfo("Last name",addAddress.lastName);
        await this.fillInAccountInfo("Email",addAddress.email);
        await this.selectCountry(addAddress.country);
        await this.fillInAccountInfo("City",addAddress.city);
        await this.fillInAccountInfo("Address 1",addAddress.address1);
        await this.fillInAccountInfo("Zip / postal code",addAddress.zipCode);
        await this.fillInAccountInfo("Phone number",addAddress.phoneNumber);
        await this.fillInAccountInfo("Fax number",addAddress.faxNumber);
    }
  
}