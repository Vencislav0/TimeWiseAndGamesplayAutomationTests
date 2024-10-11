# TimeWise and Gamesplay Automation Tests

![License](https://img.shields.io/badge/license-MIT-blue.svg)

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

**TimeWise and Gamesplay Automation Tests** is a robust suite designed to automate testing for the TimeWise application and its integration with various games. The project focuses on ensuring the application's reliability and performance through automated testing methodologies.

## Features

- **Comprehensive Test Coverage**: Includes unit tests, integration tests, and end-to-end tests.
- **Cross-Browser Testing**: Supports testing across multiple web browsers.
- **Easy Configuration**: Simple setup and configuration process.
- **Extensible Architecture**: Easily add or modify tests as requirements evolve.
- **CI/CD Friendly**: Integrates smoothly with CI/CD pipelines for automated testing.

## Technologies Used

- **Programming Language**: [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- **Testing Framework**: [QUnit](https://qunitjs.com/)
- **Web Automation**: [Playwright](https://playwright.dev/)
- **API Testing**: [QUnit](https://qunitjs.com/)
- **Version Control**: [Git](https://git-scm.com/)
- **Continuous Integration**: [GitHub Actions](https://docs.github.com/en/actions)

## Getting Started

To set up the project on your local machine, follow these instructions.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (including npm)
- [Git](https://git-scm.com/downloads)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Vencislav0/TimeWiseAndGamesplayAutomationTests.git
   cd TimeWiseAndGamesplayAutomationTests
2. Install the required packages

   ```bash
   npm install

## Usage
  To run the tests, use the following command:
```bash
npm test
```
You can also specify particular test files or directories:

```bash
npm test -- tests/unit
```
## Running Tests

Tests can be categorized and executed based on the type:

-**Integration Tests: For integration tests, use**:
```bash
npm test -- tests/integration
```
-**End-to-End Tests: To run end-to-end tests**:
```bash
npm test -- tests/e2e
```
### Default QUnit Reporting

By default, QUnit displays the test results in the browser console and a basic HTML report on the page itself. You can run your tests in a browser by opening the HTML file where you include QUnit.

## Acknowledgments

- [QUnit](https://qunitjs.com/) - for the testing framework.
- [Playwright](https://playwright.dev/) - for web automation.
- [QUnit](https://qunitjs.com/) - for API testing.
- [GitHub](https://github.com/) - for version control and collaboration.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
