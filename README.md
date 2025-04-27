# 📄 Docs.Ink - Registration Test Automation
This project automates the **User Registration** functionality of [Docs.Ink](https://dev.docs.ink/register) using **Selenium WebDriver** with **Cucumber.js**.

## 📦 Tech Stack
- **Node.js**: JavaScript runtime for building and executing the tests
- **Selenium WebDriver**: Automation framework for browser interaction
- **Cucumber.js**: BDD framework for writing tests in Gherkin syntax
- **ChromeDriver**: WebDriver implementation for controlling Chrome
- **Gherkin**: Language for writing feature files

## 🚀 Setup Instructions
### 1. Clone the Repository
```bash
cd <path-to-your-folder>
git clone https://github.com/C0d-ers/docsink-registration-tests.git
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Execute Tests
- Run all scenarios:
```bash
npx cucumber-js
```
- Run a specific feature file:
```bash
npx cucumber-js path/to/the.feature
```

## 🏗️ Project Structure
| Folder/File | Purpose |
| ----------- | ------- |
| `features/` | Gherkin feature files (`*.feature`) |
| `features/step_definitions/` | Step definitions written in JavaScript |
| `features/support/` | Hooks and environment setup |
| `pages/` | Page Object Models (POM) for different pages |
| `package.json` | Project dependencies and test runner configuration |

## 📝 Notes
- Make sure your **Chrome browser** version matches your **ChromeDriver** version.
- Recommended **Node.js** version: `>=16.x`.

## 👨‍💻 Author
- **Email**: bjay.chaudhary.01@gmail.com
