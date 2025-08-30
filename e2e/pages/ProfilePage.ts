import { expect, Locator, Page } from "@playwright/test";
import { BaseBage } from "./BasePage";
import { Logger } from "../base/Logger";
import { Account_Service_Menu_items } from "../../enumsHelper/AccountServiceMenuItems";

export class ProfilePage extends BaseBage {
  readonly profile_welcome_title: Locator;
  readonly account_success_msg: Locator;
  readonly updateProfilePagetitle: Locator;
  readonly updateProfile_button: Locator;
  readonly profileUpdate_succsessmsg: Locator;
  constructor({ page }: { page: Page }) {
    super({ page });
    this.profile_welcome_title = page.locator("//div[@id='rightPanel']//h1");
    this.account_success_msg = page.getByText("Your account was created");

    this.updateProfilePagetitle = page.getByRole("heading", {
      name: "Update Profile",
    });
    this.updateProfile_button = page.getByRole("button", {
      name: "Update Profile",
    });
    this.profileUpdate_succsessmsg = page.getByText("Your updated address and");
  }

  /**
   * verif profile visibility
   */

  async verifyProfilePageVisibility() {
    await Logger.STEP("verif profile visibility", async () => {
      const actualMenuItems: string[] = [];
      await this.verifyLocatorVisibility(this.profile_welcome_title);
      await this.verifyLocatorVisibility(this.account_success_msg);
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        let menu = await this.getText(this.account_service_menuItems.nth(i));
        if (!menu) {
          throw new Error();
        } else {
          actualMenuItems.push(menu);
        }
      }
      // assetion
      const enumValues = Object.values(Account_Service_Menu_items);
      expect(actualMenuItems).toEqual(enumValues);
    });
  }

  /**
   * verify is user is singed up
   */
  async verifyUserSignedUp(username: string) {
    await Logger.STEP(" verify is user is singed up", async () => {
      let actualUsername = await this.getText(this.profile_welcome_title);
      expect(actualUsername).toContain(username);
    });
  }

  /**
   * update profile
   */

  async updateProfile(fileds: {
    firstname?: string;
    lastname?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phone?: string;
  }) {
    await Logger.STEP("update profile", async () => {
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        if (
          (await this.getText(this.account_service_menuItems.nth(i))) ===
          Account_Service_Menu_items.UPDATE_CONTACT_INFO
        ) {
          await this.click(this.account_service_menuItems.nth(i));
          break;
        }
      }
      /**
       * update user info
       */

      fileds.firstname
        ? await this.sendText(this.firstname_input, fileds.firstname)
        : fileds.lastname
        ? await this.sendText(this.lastname_input, fileds.lastname)
        : fileds.address
        ? await this.sendText(this.address_input, fileds.address)
        : fileds.city
        ? await this.sendText(this.city_input, fileds.city)
        : fileds.state
        ? await this.sendText(this.state_input, fileds.state)
        : fileds.zipCode
        ? await this.sendText(this.zipCode_input, fileds.zipCode)
        : fileds.phone
        ? await this.sendText(this.phone_input, fileds.phone)
        : null;
      await this.waitForSecond(2);
      await this.click(this.updateProfile_button);
      await this.verifyLocatorVisibility(this.profileUpdate_succsessmsg);
    });
  }

  /**
   * verify user info is correct
   */

  //NOTE! CANNOT GET VALUE OF THEM.
  async verifyUserInfo(
    firstname: string,
    lastname: string,
    address: string,
    city: string,
    state: string,
    zipCode: string,
    phone: string
  ) {
    await Logger.STEP("verify user info is correct", async () => {
      await this.waitForSecond(2);
      let actualFnam = await this.firstname_input.inputValue();
      let actualLnam = await this.lastname_input.inputValue();
      let actualAddress = await this.address_input.inputValue();
      let actualCity = await this.city_input.inputValue();
      let actualState = await this.state_input.inputValue();
      let actualZipCode = await this.zipCode_input.inputValue();
      let actualPhone = await this.phone_input.inputValue();
      expect(actualFnam).toEqual(firstname);
      expect(actualLnam).toEqual(lastname);
      expect(actualAddress).toEqual(address);
      expect(actualCity).toEqual(city);
      expect(actualState).toEqual(state);
      expect(actualZipCode).toEqual(zipCode);
      expect(actualPhone).toEqual(phone);
    });
  }

  /**
   * go to open new account
   */

  async goToOpenNewAccountPage() {
    await Logger.STEP("go to open new account", async () => {
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        if (
          (await this.getText(this.account_service_menuItems.nth(i))) ===
          Account_Service_Menu_items.OPEN_NEW_ACCOUNT
        ) {
          await this.click(this.account_service_menuItems.nth(i));
          break;
        }
      }
    });
  }

  /**
   * go to open new account
   */

  async goToProfileUpdatePage() {
    await Logger.STEP("go to open new account", async () => {
      for (let i = 0; i < (await this.account_service_menuItems.count()); i++) {
        if (
          (await this.getText(this.account_service_menuItems.nth(i))) ===
          Account_Service_Menu_items.UPDATE_CONTACT_INFO
        ) {
          await this.click(this.account_service_menuItems.nth(i));
          break;
        }
      }
    });
  }
}
