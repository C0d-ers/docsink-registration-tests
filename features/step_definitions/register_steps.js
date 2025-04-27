const { Given, When, Then, After } = require('@cucumber/cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const RegisterPage = require('../pages/RegisterPage');
const { generateRandomEmail, extractOtpFromEmail } = require('../../helpers/maillosaurHelper');
const { faker } = require('@faker-js/faker');

let driver;
let registerPage;
let randomEmail;
const randomFourDigitNumber = faker.number.int({ min: 1000, max: 9999 });
let phoneNumber = "202555"+randomFourDigitNumber;
let passWord = "Password123!";

Given('I am on the registration page', async function () {
  driver = await new Builder().forBrowser('chrome').build();
  registerPage = new RegisterPage(driver);
  this.driver = driver;
  await registerPage.open();
});

When('I enter valid registration details', async function () {
  randomEmail = generateRandomEmail();

  await registerPage.enterFirstName(faker.person.firstName());
  await registerPage.enterLastName(faker.person.lastName());
  await registerPage.enterEmail(randomEmail);
  await registerPage.enterPhone(phoneNumber);
  await registerPage.enterPassword(passWord);
  await registerPage.enterConfirmPassword(passWord);
  await registerPage.enterCompanyName(faker.company.name());
  await registerPage.agreeToTerms();
});

When('I enter a registered email address', async function () {
  await registerPage.enterFirstName(faker.person.firstName());
  await registerPage.enterLastName(faker.person.lastName());
  await registerPage.enterEmail('798j79@ydkwval9.mailosaur.net'); // Static email
  await registerPage.enterPhone(phoneNumber);
  await registerPage.enterPassword(passWord);
  await registerPage.enterConfirmPassword(passWord);
  await registerPage.enterCompanyName(faker.company.name());
  await registerPage.agreeToTerms();
});

When('I submit the registration form', async function () {
  await registerPage.submitRegistration();
});

Then('I should be redirected to enter OTP', async function () {
  const expectedMessage = "Confirm Registration";
  const actualMessage = await registerPage.getConfirmationMessage();
  expect(actualMessage).to.include(expectedMessage);
});

When('I retrieve the OTP from my email and enter it', async function () {
  const otp = await extractOtpFromEmail(randomEmail);
  await registerPage.enterOTP(otp);
  await registerPage.clickConfirm();
});

Then('I should see a success toast message', async function () {
  await driver.sleep(3000);
  const { title, description } = await registerPage.getToastMessage();
  expect(title).to.include("Registration Successful");
  expect(description).to.include("User successfully registered. Please login to continue.");
});

Then('I should see an error toast message', async function () {
  await driver.sleep(3000);
  const errorMessage = await registerPage.getUserExistsToastMessage();
  expect(errorMessage).to.include("User already exists");
});

//exits the browser after each tests
After(async function () {
  if (this.driver) {
    await this.driver.quit();
  }
});
