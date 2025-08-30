import { expect, Locator, Page } from "@playwright/test";
import { BaseBage } from "./BasePage";
import { Logger } from "../base/Logger";
import { Account_Service_Menu_items } from "../../enumsHelper/AccountServiceMenuItems";

export class TransferPage extends BaseBage {
  readonly transferPageTitle: Locator;
  readonly amount_label: Locator;
  readonly amount_input: Locator;
  readonly fromAccount_Dropdown: Locator;
  readonly toAccount_Dropdown: Locator;
  readonly transferButton: Locator;
  readonly transferCompletedMsg: Locator;
  readonly transerAmount: Locator;
  constructor({ page }: { page: Page }) {
    super({ page });
    this.transferPageTitle = page.getByRole("heading", {
      name: "Transfer Funds",
    });
    this.amount_label = page.getByText("Amount:");
    this.amount_input = page.locator("#amount");
    this.fromAccount_Dropdown = page.locator("#fromAccountId");
    this.toAccount_Dropdown = page.locator("#toAccountId");
    this.transferButton = page.getByRole("button", { name: "Transfer" });
    this.transerAmount = page.locator("(//div[@id='showResult']//p)[1]");
    this.transferCompletedMsg = page.getByRole("heading", {
      name: "Transfer Complete!",
    });
  }

  /**
   * verify transerPage visibility
   */

  async verifyTranserPageVisibility() {
    await Logger.STEP("verify transerPage visibility", async () => {
      await this.verifyLocatorVisibility(this.amount_label);
      await this.verifyLocatorVisibility(this.amount_input);
      await this.verifyLocatorVisibility(this.fromAccount_Dropdown);
      await this.verifyLocatorVisibility(this.toAccount_Dropdown);
      await this.verifyLocatorVisibility(this.transferButton);
    });
  }

  /**
   * make transactions
   */

  async makeTransactions(amount: string, latestAccount: string) {
    await Logger.STEP("make transactions", async () => {
      await this.sendText(this.amount_input, amount);
      await this.fromAccount_Dropdown.selectOption({ value: latestAccount });
      await this.click(this.transferButton);
      await this.verifyLocatorVisibility(this.transferCompletedMsg);
      await this.verifyLocatorVisibility(this.transerAmount);
      expect(this.transerAmount).toContainText(amount);
    });
  }

  /**
   * Go to overview page
   */

  async goToAccountOverViewPage() {
    await Logger.STEP("go to open new account", async () => {
      // for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
      //   if (
      //     (await this.getText(this.account_service_menuItems.nth(i))) ===
      //     Account_Service_Menu_items.ACCOUNT_OVERVIEW
      //   ) {
      //     await this.click(this.account_service_menuItems.nth(i));
      //     break;
      //   }
      // }
      await this.click(this.overView_accountLink);
    });
  }
}
