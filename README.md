
# TVO Politics Test Suite

This repository contains Cypress end-to-end tests to validate the functionality of the Politics section on [TVO Today](https://www.tvo.org/).


### 1. Clone the repository and install dependencies

```bash
git clone https://github.com/cs-surya/TvoPoliticsTest.git
cd TvoPoliticsTest
npm install
````
### 2. Run the tests

To run all tests in headless mode:

```bash
npx cypress run
```
---

## Test Coverage

This suite includes 26 automated tests that cover the following areas:

### Navigation

* Navigates to the Politics page via the "Read" menu
* Returns to the home page when clicking the site logo

### Responsiveness

* Validates navigation and layout on mobile viewports (iPhone 6/8/X, Samsung S10, iPad Mini)

### Content and Structure

* Presence of article cards with valid images, headlines, and links
* Visibility of sections such as:

  * "Latest on Politics"
  * "Analysis"
  * "Fuel Creativity Across Ontario"
* Header and footer are consistently displayed
* Includes descriptive subheading and a canonical link

### Functionality

* "Donate Today" button exists and opens a valid external page in a new tab
* Articles load properly, and "Load More" fetches additional content
* Unique article URLs are present
* Publication dates are shown on articles
* Search page is accessible and returns results for "politics"

### Error Handling

* Visiting a non-existent article slug returns a proper 404 page

### Performance

* Measures and asserts acceptable Politics page load times (under 8 seconds)


