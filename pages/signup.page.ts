import { type Page, type Locator } from '@playwright/test';
import { testUser } from '../utils/test-data';

export class SignupPage {
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly passwordInput: Locator;
  readonly daysSelect: Locator;
  readonly monthsSelect: Locator;
  readonly yearsSelect: Locator;
  readonly firstnameInput: Locator;
  readonly lastnameInput: Locator;
  readonly companyInput: Locator;
  readonly addressInput: Locator;
  readonly countrySelect: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;
  readonly createAccountButton: Locator;

  constructor(private page: Page) {
    this.heading = page.getByText('Enter Account Information');
    this.nameInput = page.locator('[data-qa="name"]');
    this.passwordInput = page.locator('[data-qa="password"]');
    this.daysSelect = page.locator('[data-qa="days"]');
    this.monthsSelect = page.locator('[data-qa="months"]');
    this.yearsSelect = page.locator('[data-qa="years"]');
    this.firstnameInput = page.locator('[data-qa="first_name"]');
    this.lastnameInput = page.locator('[data-qa="last_name"]');
    this.companyInput = page.locator('[data-qa="company"]');
    this.addressInput = page.locator('[data-qa="address"]');
    this.countrySelect = page.locator('[data-qa="country"]');
    this.stateInput = page.locator('[data-qa="state"]');
    this.cityInput = page.locator('[data-qa="city"]');
    this.zipcodeInput = page.locator('[data-qa="zipcode"]');
    this.mobileInput = page.locator('[data-qa="mobile_number"]');
    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  async fillAccountDetails(password: string) {
    await this.page.locator('#id_gender1').check();
    await this.passwordInput.fill(password);
    await this.daysSelect.selectOption(testUser.birth_date);
    await this.monthsSelect.selectOption(testUser.birth_month);
    await this.yearsSelect.selectOption(testUser.birth_year);
  }

  async fillAddressDetails() {
    await this.firstnameInput.fill(testUser.firstname);
    await this.lastnameInput.fill(testUser.lastname);
    await this.companyInput.fill(testUser.company);
    await this.addressInput.fill(testUser.address1);
    await this.countrySelect.selectOption(testUser.country);
    await this.stateInput.fill(testUser.state);
    await this.cityInput.fill(testUser.city);
    await this.zipcodeInput.fill(testUser.zipcode);
    await this.mobileInput.fill(testUser.mobile_number);
  }

  async submit() {
    await this.createAccountButton.click();
  }

  async fillAndSubmit(password: string) {
    await this.fillAccountDetails(password);
    await this.fillAddressDetails();
    await this.submit();
  }
}
