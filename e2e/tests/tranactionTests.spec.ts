import {
  ADDRESS,
  CITY,
  CONFIRM,
  FIRSTNAME,
  LASTNAME,
  PASSWORD,
  PHONE,
  SSN,
  STATE,
  USERNAME,
  ZIP,
} from "../base/AppData";
import { test } from "../base/Fixtures";

test.describe("S&P QA Technical Test UI", async () => {
  test("Flow 1 | Registration", async ({
    homePage,
    registerPage,
    profilePage,
  }) => {
    await homePage.goToRegiserPage();
    await registerPage.verifyRegisterPageVisibility();
    await registerPage.register(
      FIRSTNAME,
      LASTNAME,
      ADDRESS,
      CITY,
      STATE,
      ZIP,
      PHONE,
      SSN,
      USERNAME,
      PASSWORD,
      CONFIRM
    );

    await profilePage.verifyProfilePageVisibility();
    await profilePage.verifyUserSignedUp(USERNAME);
    await profilePage.goToProfileUpdatePage();

    await profilePage.verifyUserInfo(
      FIRSTNAME,
      LASTNAME,
      ADDRESS,
      CITY,
      STATE,
      ZIP,
      PHONE
    );

    await profilePage.updateProfile({
      firstname: "niko_02",
      phone: "7894569779",
    });
    await profilePage.logout();
    await homePage.verifyHomePageVisibility();
  });

  test("Flow 2 | Open Account, create transfer funds and validate", async ({
    homePage,
    newAccountPage,
    accountOverViewPage,
    transferPage,
    profilePage,
  }) => {
    await homePage.login(USERNAME, PASSWORD);
    await profilePage.goToOpenNewAccountPage();
    await newAccountPage.verifyNewAccountPageVisibility();
    let newAccountId = await newAccountPage.createNewAccount(true);
    await newAccountPage.goToAccountOverViewPage();
    await accountOverViewPage.verifyAccountPageOverViewPageVisibility();
    await accountOverViewPage.verifyLatestCreatedAccountId(await newAccountId);
    let transactionIn_dollars: string = "";
    // we are required to perform same action two times.
    for (let i = 0; i < 2; i++) {
      if (i == 0) {
        let defaultChecking =
          await accountOverViewPage.getCheckingAccountBalance(
            await newAccountId
          );
        let defaultSaving = await accountOverViewPage.getSavingAccountBalance(
          await newAccountId
        );
        await accountOverViewPage.goToTranserPage();
        await transferPage.verifyTranserPageVisibility();
        transactionIn_dollars = "20";
        await transferPage.makeTransactions(
          transactionIn_dollars,
          await newAccountId
        );
        await transferPage.goToAccountOverViewPage();
        let updatedChecking =
          await accountOverViewPage.getCheckingAccountBalance(
            await newAccountId
          );
        let updatedSaving = await accountOverViewPage.getSavingAccountBalance(
          await newAccountId
        );
        await accountOverViewPage.compareBalances(
          defaultChecking,
          updatedChecking,
          defaultSaving,
          updatedSaving,
          transactionIn_dollars
        );
      } else {
        let defaultChecking =
          await accountOverViewPage.getCheckingAccountBalance(
            await newAccountId
          );
        let defaultSaving = await accountOverViewPage.getSavingAccountBalance(
          await newAccountId
        );
        await accountOverViewPage.goToTranserPage();
        await transferPage.verifyTranserPageVisibility();
        transactionIn_dollars = "10";
        await transferPage.makeTransactions(
          transactionIn_dollars,
          await newAccountId
        );
        // await transferPage.waitForSecond(1);
        await transferPage.goToAccountOverViewPage();
        let updatedChecking =
          await accountOverViewPage.getCheckingAccountBalance(
            await newAccountId
          );
        let updatedSaving = await accountOverViewPage.getSavingAccountBalance(
          await newAccountId
        );
        await accountOverViewPage.compareBalances(
          defaultChecking,
          updatedChecking,
          defaultSaving,
          updatedSaving,
          transactionIn_dollars
        );
      }
    }
    await accountOverViewPage.logout();
  });
});
