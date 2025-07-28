# TVO Politics Test Suite

This repo holds my Cypress tests for the Politics section of [TVO Today](https://www.tvo.org). 


## Getting Started
**1.Clone the repo and install dependencies**
   git clone https://github.com/cs-surya/TvoPoliticsTest.git
   cd TvoPoliticsTest
   npm install

**2.Run the tests**
npx cypress run

Test Coverage
This project includes 26 automated Cypress tests that validate the functionality of the Politics section on TVO Today. Covered areas:

1)Navigation to the Politics page via the Read menu

2)Responsive layout on mobile devices (iPhone, Samsung, iPad)

3)Presence of:

.Article cards with valid headlines, images, and links

."Latest on Politics", "Analysis", and "Fuel Creativity Across Ontario" sections

4)unctional “Donate Today” button (opens support page in new tab)

5)Load More functionality for articles

6)Header and footer visibility

7)Unique article URLs and publication dates

8)Proper 404 handling for invalid articles

9)Search functionality and results

10)Performance: Page loads within acceptable time limit

These tests ensure the Politics section works as expected across screen sizes and core features are reliable.
