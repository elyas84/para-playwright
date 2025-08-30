import { Locator, Page } from "@playwright/test";
import { BaseBage } from "./BasePage";
import { Logger } from "../base/Logger";
export class RegisterPage extends BaseBage {
  readonly regiserPageHeader: Locator;
  readonly regiserPageParagraph: Locator;
  constructor({ page }: { page: Page }) {
    super({ page });
    this.regiserPageHeader = page.getByRole("heading", {
      name: "Signing up is easy!",
    });
    this.regiserPageParagraph = page.getByText("If you have an account with");
   
  }

  /**
   * Verify register page visibility
   */
  async verifyRegisterPageVisibility() {
    await Logger.STEP("Verify register page visibility", async () => {
      await this.verifyLocatorVisibility(this.regiserPageHeader);
      await this.verifyLocatorVisibility(this.regiserPageParagraph);
      await this.verifyLocatorVisibility(this.firstname_label);
      await this.verifyLocatorVisibility(this.address_label);
      await this.verifyLocatorVisibility(this.city_label);
      await this.verifyLocatorVisibility(this.state_label);
      await this.verifyLocatorVisibility(this.zipCode_label);
      await this.verifyLocatorVisibility(this.phone_label);
      await this.verifyLocatorVisibility(this.SSN_label);
      await this.verifyLocatorVisibility(this.username_label);
      await this.verifyLocatorVisibility(this.password_label);
      await this.verifyLocatorVisibility(this.confirm_label);
      await this.verifyLocatorVisibility(this.register_button);
      await this.verifyLocatorVisibility(this.firstname_input);
      await this.verifyLocatorVisibility(this.lastname_input);
      await this.verifyLocatorVisibility(this.city_input);
      await this.verifyLocatorVisibility(this.state_input);
      await this.verifyLocatorVisibility(this.zipCode_input);
      await this.verifyLocatorVisibility(this.phone_input);
      await this.verifyLocatorVisibility(this.SSN_input);
      await this.verifyLocatorVisibility(this.username_input);
      await this.verifyLocatorVisibility(this.password_input);
      await this.verifyLocatorVisibility(this.confirm_input);
    });
  }

  /**
   * Register
   */

  async register(
    firstName: string,
    lastName: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string,
    SSN: string,
    username: string,
    password: string,
    confirm: string
  ) {
    await Logger.STEP("", async () => {
      await this.sendText(this.firstname_input, firstName);
      await this.sendText(this.lastname_input, lastName);
      await this.sendText(this.address_input, address);
      await this.sendText(this.city_input, city);
      await this.sendText(this.state_input, state);
      await this.sendText(this.zipCode_input, zipCode);
      await this.sendText(this.phone_input, phone);
      await this.sendText(this.SSN_input, SSN);
      await this.sendText(this.username_input, username);
      await this.sendText(this.password_input, password);
      await this.sendText(this.confirm_input, confirm);
      await this.waitForSecond(1);
      await this.click(this.register_button);
    });
  }
}
