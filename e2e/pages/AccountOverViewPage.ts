import { expect, Locator, Page } from "@playwright/test";
import { BaseBage } from "./BasePage";
import { Logger } from "../base/Logger";
import { Account_Table_Header } from "../../enumsHelper/TableHeaderInfo";
import { Account_Service_Menu_items } from "../../enumsHelper/AccountServiceMenuItems";

export class AccountOverViewPage extends BaseBage {
  readonly accountOverViewPageTitle: Locator;
  readonly accountTable_header: Locator;
  readonly accountID_list: Locator;
  readonly accountBalance_list: Locator;
  readonly accountAvailableAmount_list: Locator;
  readonly account_total: Locator;

  constructor({ page }: { page: Page }) {
    super({ page });
    this.accountOverViewPageTitle = page.getByRole("heading", {
      name: "Accounts Overview",
    });
    this.accountTable_header = page.locator("//thead//th");
    this.accountID_list = page.locator("//tbody/tr/td[1]");
    this.accountBalance_list = page.locator("//tbody/tr/td[2]");
    this.accountAvailableAmount_list = page.locator("//tbody/tr/td[3]");
    this.account_total = page.locator(
      "//b[text()='Total']/parent::td/following-sibling::td/b"
    );
  }

  /**
   * Account overview page visibility
   */

  async verifyAccountPageOverViewPageVisibility() {
    await Logger.STEP("Account overview page visibility", async () => {
      await this.waitForSecond(2);
      const actualTableHeader: string[] = [];
      await this.verifyLocatorVisibility(this.accountOverViewPageTitle);
      for (let i = 0; i < (await this.accountTable_header.count()); i++) {
        await this.verifyLocatorVisibility(this.accountTable_header.nth(i));
        let header = await this.getText(this.accountTable_header.nth(i));
        if (!header) {
          throw new Error();
        } else {
          actualTableHeader.push(header);
        }
      }
      // assetion
      const enumValues = Object.values(Account_Table_Header);
      expect(actualTableHeader).toEqual(enumValues);
    });
  }
  /**
   * verify account id is created
   */

  async verifyLatestCreatedAccountId(createdAccount: string): Promise<string> {
    return await Logger.STEP("verify account id is created", async () => {
      await this.waitForSecond(2);
      let accountId: string = "";
      for (let i = 0; i < (await this.accountID_list.count()); i++) {
        let text = await this.getText(this.accountID_list.nth(i));
        if (text === createdAccount) {
          text = accountId;
          break;
        }
      }
      await this.waitForSecond(2);
      return accountId;
    });
  }

  /**
   * get default balance
   */

  async getCheckingAccountBalance(lastestAccount: string) {
    return await Logger.STEP("get default balance", async () => {
      await this.verifyLocatorVisibility(
        this.page.locator(
          `(//a[text()='${lastestAccount}']/parent::td/parent::tr/preceding-sibling::tr/td)[2]`
        )
      );
      let checkingAccountBalance = await this.getText(
        this.page.locator(
          `(//a[text()='${lastestAccount}']/parent::td/parent::tr/preceding-sibling::tr/td)[2]`
        )
      );
      return checkingAccountBalance;
    });
  }

  /**
   * get default balance
   */

  async getSavingAccountBalance(lastestAccount: string) {
    return await Logger.STEP("get default balance", async () => {
      await this.verifyLocatorVisibility(
        this.page.locator(
          `//a[text()='${lastestAccount}']/parent::td/following-sibling::td[1]`
        )
      );
      let savingAccountBalance = await this.getText(
        this.page.locator(
          `//a[text()='${lastestAccount}']/parent::td/following-sibling::td[1]`
        )
      );
      return savingAccountBalance;
    });
  }

  /**
   * go to transer page
   */

  async goToTranserPage() {
    await Logger.STEP("go to transer page", async () => {
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        if (
          (await this.getText(this.account_service_menuItems.nth(i))) ===
          Account_Service_Menu_items.TRANSFER_FUNDS
        ) {
          await this.click(this.account_service_menuItems.nth(i));
          break;
        }
      }
    });
  }

  /**
   * compare blance
   */

  async compareBalances(
    checkingBefore: string,
    checkingAfter: string,
    savingsBefore: string,
    savingsAfter: string,
    transferAmout: string
  ) {
    await Logger.STEP("compare blance", async () => {
      await this.waitForSecond(2);
      expect(checkingBefore).not.toBe(checkingAfter);
      expect(savingsBefore).not.toBe(savingsAfter);
      const checkingBeforeInNum = checkingBefore.split("$")[1];
      const checkingAfterInNum = checkingAfter.split("$")[1];
      const savingsBeforeInNum = savingsBefore.split("$")[1];
      const savingsAfterInNum = savingsAfter.split("$")[1];
      expect(Number(checkingAfterInNum)).toBe(
        Number(checkingBeforeInNum) + Number(transferAmout)
      );
      expect(Number(savingsAfterInNum)).toBe(
        Number(savingsBeforeInNum) - Number(transferAmout)
      );
    });
  }
}
