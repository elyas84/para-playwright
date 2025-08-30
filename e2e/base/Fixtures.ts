import dotenv from "dotenv";
dotenv.config();

import { test as base } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProfilePage } from "../pages/ProfilePage";
import { AccountOverViewPage } from "../pages/AccountOverViewPage";
import { NewAccountPage } from "../pages/NewAccountPage";
import { TransferPage } from "../pages/TransferPage";

type fixtures = {
  homePage: HomePage;
  registerPage: RegisterPage;
  profilePage: ProfilePage;
  accountOverViewPage: AccountOverViewPage;
  newAccountPage: NewAccountPage;
  transferPage: TransferPage;
};

export const test = base.extend<fixtures>({
  page: async ({ page }, use, testStatus) => {
    console.log(`======== TEST SETUP =======`);
    // MAKE SURE YOU RUN NPM I AND CREATE A ENV FILE
    let URL = process.env.APP_URL; // https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC
    if (!URL) {
      throw new Error();
    } else {
      await page.goto(URL, { waitUntil: "domcontentloaded" });
    }
    const homePage = new HomePage({ page });
    homePage.verifyHomePageVisibility();
    use(page);
    // screenshot on failures
    if (testStatus.status !== testStatus.expectedStatus) {
      let screenshot = "test-results/screenshot.png";
      await page.screenshot({
        path: screenshot,
        fullPage: true,
      });
    }
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage({ page }));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage({ page }));
  },
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage({ page }));
  },
  accountOverViewPage: async ({ page }, use) => {
    await use(new AccountOverViewPage({ page }));
  },
  newAccountPage: async ({ page }, use) => {
    await use(new NewAccountPage({ page }));
  },
  transferPage: async ({ page }, use) => {
    await use(new TransferPage({ page }));
  },
});
