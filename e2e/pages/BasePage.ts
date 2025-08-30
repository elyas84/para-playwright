import { expect, Locator, Page } from "@playwright/test";
import { Logger } from "../base/Logger";
import { Account_Service_Menu_items } from "../../enumsHelper/AccountServiceMenuItems";

export abstract class BaseBage {
  readonly firstname_label: Locator;
  readonly lastname_label: Locator;
  readonly address_label: Locator;
  readonly city_label: Locator;
  readonly state_label: Locator;
  readonly zipCode_label: Locator;
  readonly phone_label: Locator;
  readonly SSN_label: Locator;
  readonly username_label: Locator;
  readonly password_label: Locator;
  readonly confirm_label: Locator;
  readonly register_button: Locator;
  readonly firstname_input: Locator;
  readonly lastname_input: Locator;
  readonly address_input: Locator;
  readonly city_input: Locator;
  readonly state_input: Locator;
  readonly zipCode_input: Locator;
  readonly phone_input: Locator;
  readonly SSN_input: Locator;
  readonly username_input: Locator;
  readonly password_input: Locator;
  readonly confirm_input: Locator;
  readonly account_service_menuItems: Locator;
  readonly brand: Locator;
  readonly overView_accountLink: Locator;
  page: Page;

  constructor({ page }: { page: Page }) {
    this.page = page;
    this.brand = page.getByRole("img", { name: "ParaBank" });
    this.firstname_label = page.getByText("First Name:");
    this.lastname_label = page.getByText("Last Name:");
    this.address_label = page.getByText("Address");
    this.city_label = page.getByText("City:");
    this.state_label = page.getByText("State:");
    this.zipCode_label = page.getByText("Zip Code:");
    this.phone_label = page.getByText("Phone #:");
    this.SSN_label = page.getByText("SSN:");
    this.username_label = page.getByText("Username:");
    this.password_label = page.getByText("Password:");
    this.confirm_label = page.getByText("Confirm:");
    this.register_button = page.getByRole("button", { name: "Register" });
    this.firstname_input = page.locator('[id="customer.firstName"]');
    this.lastname_input = page.locator('[id="customer.lastName"]');
    this.address_input = page.locator('[id="customer.address.street"]');
    this.city_input = page.locator('[id="customer.address.city"]');
    this.state_input = page.locator('[id="customer.address.state"]');
    this.zipCode_input = page.locator('[id="customer.address.zipCode"]');
    this.phone_input = page.locator('[id="customer.phoneNumber"]');
    this.SSN_input = page.locator('[id="customer.ssn"]');
    this.username_input = page.locator('[id="customer.username"]');
    this.password_input = page.locator('[id="customer.password"]');
    this.confirm_input = page.locator("#repeatedPassword");
    this.account_service_menuItems = page.locator(
      "//h2/following-sibling::ul/li/a"
    );
    this.overView_accountLink = page.getByRole("link", {
      name: "Accounts Overview",
    });
  }

  /**
   *
   * @param timeout
   */
  async waitForSecond(timeout: number) {
    await Logger.STEP(`wait for second(s) ${timeout}`, async () => {
      try {
        await this.page.waitForTimeout(timeout * 1000);
      } catch (error) {
        console.log(error);
      }
    });
  }

  /**
   *
   * @param locator
   */
  async verifyLocatorVisibility(locator: Locator) {
    try {
      await Logger.INFO("verify locator visibility", locator, async () => {
        await expect(async () => {
          await expect(locator).toBeVisible({ timeout: 300 });
        }).toPass();
      });
    } catch (error) {
      await Logger.ERROR(error);
    }
  }

  /**
   *
   * @param locator
   */
  async click(locator: Locator) {
    try {
      await this.verifyLocatorVisibility(locator);
      await Logger.INFO("perform click", locator, async () => {
        await locator.click();
      });
    } catch (error) {
      await Logger.ERROR(error);
    }
  }

  /**
   *
   * @param locator
   * @param text
   */
  async sendText(locator: Locator, text: string) {
    try {
      await this.verifyLocatorVisibility(locator);
      await Logger.INFO("send text", locator, async () => {
        await locator.fill(text);
      });
    } catch (error) {
      await Logger.ERROR(error);
    }
  }

  /**
   *
   * @param locator
   * @returns
   */
  async getText(locator: Locator) {
    let text: string | null = "";
    try {
      await this.verifyLocatorVisibility(locator);
      await Logger.INFO("get text", locator, async () => {
        text = await locator.textContent();
      });
      return text;
    } catch (error) {
      await Logger.ERROR(error);
    }
  }

  /**
   * Logout
   */
  async logout() {
    await Logger.STEP("Logout", async () => {
      await this.waitForSecond(2);
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        if (
          (await this.getText(this.account_service_menuItems.nth(i))) ===
          Account_Service_Menu_items.LOGOUT
        ) {
          await this.click(this.account_service_menuItems.nth(i));
          break;
        }
      }
    });
  }
}
