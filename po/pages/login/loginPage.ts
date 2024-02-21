import LoginSelectors from './login.selector';
import { BasePage } from "../../base/basePage";
export default class LoginPage extends BasePage {
    loginSelectors = new LoginSelectors();
    
    async loginToPage(emailAdd: string, password: string){
        await this.page.locator(this.loginSelectors.EMAIL_TXTBOX).fill(emailAdd);
        await this.page.locator(this.loginSelectors.PASSWORD_TXTBOX).fill(password);
        await this.page.locator(this.loginSelectors.LOGIN_BTN).click();
    }
}