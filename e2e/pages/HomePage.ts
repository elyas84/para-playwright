import { expect, Locator, Page } from "@playwright/test";
import { BaseBage } from "./BasePage";
import { Logger } from "../base/Logger";

export class HomePage extends BaseBage {
  readonly loginForm_Label: Locator;
  readonly username_Label: Locator;
  readonly password_Label: Locator;
  readonly login_button: Locator;
  readonly username_input: Locator;
  readonly password_input: Locator;
  readonly registerLink: Locator;
  readonly errorMsg: Locator;

  constructor({ page }: { page: Page }) {
    super({ page });
    this.loginForm_Label = page.getByRole("heading", {
      name: "Customer Login",
    });
    this.username_Label = page.getByText("Username");
    this.password_Label = page.getByText("Password");
    this.login_button = page.getByRole("button", { name: "Log In" });
    this.username_input = page.locator('input[name="username"]');
    this.password_input = page.locator('input[name="password"]');
    this.registerLink = page.getByRole("link", { name: "Register" });
    this.errorMsg = page.getByText("An internal error has");
  }

  /**
   * verify home page visibility
   */
  async verifyHomePageVisibility() {
    await Logger.STEP("verify home page visibility", async () => {
      await this.verifyLocatorVisibility(this.brand);
      await this.verifyLocatorVisibility(this.brand);
      await this.verifyLocatorVisibility(this.loginForm_Label);
      await this.verifyLocatorVisibility(this.username_Label);
      await this.verifyLocatorVisibility(this.password_Label);
      await this.verifyLocatorVisibility(this.login_button);
      await this.verifyLocatorVisibility(this.username_input);
      await this.verifyLocatorVisibility(this.password_input);
      await this.verifyLocatorVisibility(this.registerLink);
    });
  }

  /**
   * navigate to register page / tab
   */
  async goToRegiserPage() {
    await Logger.STEP("navigate to register page / tab", async () => {
      await this.click(this.registerLink);
    });
  }

  /**
   * login
   */

  async login(username: string, password: string) {
    await Logger.STEP("Perform login", async () => {
      await this.sendText(this.username_input, username);
      await this.waitForSecond(1);
      await this.sendText(this.password_input, password);
      await this.waitForSecond(1);
      await this.click(this.login_button);
      expect(this.errorMsg).not.toBeVisible();
      await this.waitForSecond(2);
    });
  }
}
