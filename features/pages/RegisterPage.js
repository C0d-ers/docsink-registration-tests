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
    this.otpInput = By.css("#otp-input");
    //both register and confirm Button have the same locator, but this needs improvement by providing a better lcoator like [name='register'] or [name='confirm']
    this.registerButton = By.css("[type='submit']");
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
    //could be improved by providing a better locator - but that requires changes in frondend-code
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

  async getAllErrorMessages() {
    //itarates through defined indices, could be improved by providing a better locator - but that requires changes in frondend-code
    const elements = await this.driver.findElements(By.css('.text-sm'));
    const indicesToVerify = [1, 2, 3, 5, 6, 7, 8, 11];
    const messages = [];

    for (let i = 0; i < elements.length; i++) {
      if (indicesToVerify.includes(i)) {
        messages.push(await elements[i].getText());
      }
    }
    return messages;
  }

  async getInvalidEmailErrorMessage(index) {
    const elements = await this.driver.findElements(By.css('.text-sm'));
    return await elements[index].getText();
  }
}

module.exports = RegisterPage;
