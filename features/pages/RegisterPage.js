const { By, until } = require('selenium-webdriver');

class RegisterPage {
  constructor(driver) {
    this.driver = driver;
    
    this.firstNameInput = By.css("[name='first_name']");
    this.lastNameInput = By.css("[name='last_name']");
    this.emailInput = By.css("[name='email']");
    this.phoneInput = By.css("[name='phoneNumber']");
    this.passwordInput = By.css("[name='password']");
    this.confirmPasswordInput = By.css("[name='confirmPassword']");
    this.companyNameInput = By.css("[name='company_name']");
    this.agreeCheckbox = By.css("#checkbox-tos");
    this.registerButton = By.css("[type='submit']");
    this.otpInput = By.css("#otp-input");
    this.confirmButton = By.css("[type='submit']");
  }

  async open() {
    await this.driver.get('https://dev.docs.ink/register');
  }

  async enterFirstName(firstName) {
    await this.driver.findElement(this.firstNameInput).sendKeys(firstName);
  }

  async enterLastName(lastName) {
    await this.driver.findElement(this.lastNameInput).sendKeys(lastName);
  }

  async enterEmail(email) {
    await this.driver.findElement(this.emailInput).sendKeys(email);
  }

  async enterPhone(phone) {
    await this.driver.findElement(this.phoneInput).sendKeys(phone);
  }

  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).sendKeys(password);
  }

  async enterConfirmPassword(confirmPassword) {
    await this.driver.findElement(this.confirmPasswordInput).sendKeys(confirmPassword);
  }

  async enterCompanyName(companyName) {
    await this.driver.findElement(this.companyNameInput).sendKeys(companyName);
  }

  async agreeToTerms() {
    await this.driver.findElement(this.agreeCheckbox).click();
  }

  async submitRegistration() {
    await this.driver.findElement(this.registerButton).click();
  }

  async enterOTP(otp) {
    await this.driver.findElement(this.otpInput).sendKeys(otp);
  }

  async clickConfirm() {
    await this.driver.findElement(this.confirmButton).click();
  }

  async getConfirmationMessage() {
    const element = await this.driver.wait(until.elementLocated(By.css('.font-semibold.tracking-tight.text-2xl')));
    return await element.getText();
  }
  async getToastMessage() {
    const toastElement = await this.driver.wait(until.elementLocated(By.css('li[data-sonner-toast]')), 10000);
    const title = await toastElement.findElement(By.css('div[data-title]')).getText();
    const description = await toastElement.findElement(By.css('div[data-description]')).getText();
    return { title, description };
  }

  async getUserExistsToastMessage() {
    const element = await this.driver.wait(until.elementLocated(By.css('li[data-type="error"][data-visible="true"]')), 10000);
    return await element.getText();
  }
  
}

module.exports = RegisterPage;
