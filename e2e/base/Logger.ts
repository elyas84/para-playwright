import { Locator } from "@playwright/test";

export class Logger {
  /**
   *
   * @param meesage
   * @param locator
   * @param callback
   */
  static async INFO(
    meesage: string,
    locator: Locator,
    callback: () => Promise<void> | any
  ) {
    console.log(`${meesage} | ${locator}`);
    await callback();
    console.log(`locator found ${locator}`);
  }

  /**
   *
   * @param meesage
   * @param callback
   * @returns
   */
  static async STEP(meesage: string, callback: () => Promise<void> | any) {
    console.log(`message ${meesage}`);
    const result = await callback();
    return result;
  }

  /**
   *
   * @param meesage
   * @param locator
   */
  static async ERROR(meesage?: string, locator?: Locator) {
    console.log(`[Error occured] ${meesage} on locator ${locator}`);
    throw new Error();
  }
}
