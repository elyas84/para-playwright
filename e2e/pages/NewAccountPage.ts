import { expect, Locator, Page } from "@playwright/test";
import { BaseBage } from "./BasePage";
import { Logger } from "../base/Logger";
import { Account_Service_Menu_items } from "../../enumsHelper/AccountServiceMenuItems";

export class NewAccountPage extends BaseBage {
  readonly newAccountPageTitle: Locator;
  readonly accountypeDropdownLabel: Locator;
  readonly accountIdDropdrownLabel: Locator;
  readonly createAccount_button: Locator;
  readonly accountTypeDropdown: Locator;
  readonly accountIdDropdown: Locator;
  readonly accountsuccessTitle: Locator;
  readonly accountSuccessParagraph: Locator;
  readonly newAccountId: Locator;

  constructor({ page }: { page: Page }) {
    super({ page });
    this.newAccountPageTitle = page.getByRole("heading", {
      name: "Open New Account",
    });
    this.accountypeDropdownLabel = page.getByText("What type of Account would");
    this.accountIdDropdrownLabel = page.getByText(
      "A minimum of $100.00 must be"
    );
    this.createAccount_button = page.getByRole("button", {
      name: "Open New Account",
    });
    this.accountTypeDropdown = page.locator("//select[@id='type']");
    this.accountIdDropdown = page.locator("//select[@id='fromAccountId']");
    this.accountsuccessTitle = page.getByRole("heading", {
      name: "Account Opened!",
    });
    this.accountSuccessParagraph = page.getByText(
      "Congratulations, your account"
    );
    this.newAccountId = page.locator("//a[@id='newAccountId']");
  }

  /**
   * verify account page / tab visibility
   */

  async verifyNewAccountPageVisibility() {
    await Logger.STEP("verify account page / tab visibility", async () => {
      await this.waitForSecond(2);
      await this.verifyLocatorVisibility(this.newAccountPageTitle);
      await this.verifyLocatorVisibility(this.accountypeDropdownLabel);
      await this.verifyLocatorVisibility(this.accountIdDropdrownLabel);
      await this.verifyLocatorVisibility(this.createAccount_button);
      await this.verifyLocatorVisibility(this.accountTypeDropdown);
      await this.verifyLocatorVisibility(this.accountIdDropdown);
    });
  }

  /**
   * verify default value of the dropdown
   */

  async getDefaultAccoutType() {
    await Logger.STEP("verify default value of the dropdown", async () => {
      let defaultValue = await this.accountTypeDropdown.inputValue();
      return defaultValue;
    });
  }
  /**
   * get default account id
   */
  async getDefaultAccoutId() {
    await Logger.STEP("get default account id", async () => {
      let defaultValue = await this.accountIdDropdown.inputValue();
      return defaultValue;
    });
  }

  /**
   * open new account feature
   */

  async createNewAccount(savingAccount: boolean) {
    return await Logger.STEP("open new account feature", async () => {
      let newId: string | undefined = undefined;
      if (savingAccount) {
        let defaultAccountType = await this.getDefaultAccoutType();
        // select saving
        await this.accountTypeDropdown.selectOption({ label: "SAVINGS" });
        let newType = await this.accountTypeDropdown.inputValue();
        expect(newType).not.toEqual(defaultAccountType);
        await this.click(this.createAccount_button);
        await this.waitForSecond(2);
        this.verifyLocatorVisibility(this.accountsuccessTitle);
        this.verifyLocatorVisibility(this.accountSuccessParagraph);
        this.verifyLocatorVisibility(this.newAccountId);
        await this.waitForSecond(2);
        newId = await this.getText(this.newAccountId);
      } else {
        let defaultAccountType = await this.getDefaultAccoutType();
        expect("CHECKINH").toEqual(defaultAccountType);
      }
      return newId;

      // let newId: string = "";
      // if (savingAccount) {
      //   let defaultAccountType = await this.getDefaultAccoutType();
      //   // select saving
      //   await this.accountTypeDropdown.selectOption({ label: "SAVINGS" });
      //   let newType = await this.accountTypeDropdown.inputValue();
      //   expect(newType).not.toEqual(defaultAccountType);
      //   await this.click(this.createAccount_button);
      //   await this.watiForSecond(2);
      //   this.verifyLocatorVisibility(this.accountsuccessTitle);
      //   this.verifyLocatorVisibility(this.accountSuccessParagraph);
      //   this.verifyLocatorVisibility(this.newAccountId);
      //   await this.watiForSecond(2);
      //   newId = await this.getText(this.newAccountId);
      // } else {
      //   let defaultAccountType = await this.getDefaultAccoutType();
      //   expect("CHECKINH").toEqual(defaultAccountType);
      // }
      // return newId;
    });
  }

  /**
   * go to accout overview page
   */

  async goToAccountOverViewPage() {
    await Logger.STEP("go to accout overview page", async () => {
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        if (
          (await this.getText(this.account_service_menuItems.nth(i))) ===
          Account_Service_Menu_items.ACCOUNT_OVERVIEW
        ) {
          await this.click(this.account_service_menuItems.nth(i));
          break;
        }
      }
    });
  }
}
