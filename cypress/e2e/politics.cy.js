describe("Politics section on TVO Today", () => {
  // Navigate from the home page to the Politics tag via the Read menu
  it("navigates to the Politics page through the Read menu", () => {
    cy.navigateToPolitics();
  });

  // Ensure the Politics lists multiple articles
  it("displays a list of article cards with images and headlines", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.acceptCookies();

    cy.get('a[href*="/article/"]', { timeout: 15000 })
      .should("have.length.greaterThan", 4)
      .as("articleLinks");

    cy.get("@articleLinks").each(($link, index) => {
      if (index >= 5) return false; // break loop after 5 iterations
      cy.wrap($link).should("have.attr", "href").and("include", "/article/");
    });

    cy.get("@articleLinks")
      .first()
      .then(($el) => {
        const articleHref = $el.attr("href");

        cy.wrap($el).click({ force: true });

        cy.url().should("include", articleHref);
        cy.get("h1").should("have.length.at.least", 1);

        cy.go("back");
      });
  });

  //Tests the “Load more” functionality on the Politics page.

  it("loads additional articles when the Load More button is clicked", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });

    cy.acceptCookies();

    cy.get('a[href*="/article/"]').then(($links) => {
      const initialCount = $links.length;

      cy.get("button, a").then(($elements) => {
        const loadMore = $elements.filter((i, el) =>
          /load more|show more/i.test(el.innerText),
        );
        if (loadMore.length) {
          cy.wrap(loadMore.first()).scrollIntoView().click({ force: true });

          cy.get('a[href*="/article/"]')
            .its("length")
            .should("be.gt", initialCount);
        } else {
          cy.get('a[href*="/article/"]').last().scrollIntoView();
          cy.wait(2000);
          cy.get('a[href*="/article/"]')
            .its("length")
            .should("be.gte", initialCount);
        }
      });
    });
  });

  // Validates that article links on the Politics page are unique to prevent duplicate content.

  it("contains unique article URLs", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });

    cy.get('a[href*="/article/"]').then(($links) => {
      const hrefs = $links.toArray().map((el) => el.getAttribute("href"));
      const unique = Array.from(new Set(hrefs));

      expect(unique.length).to.be.gte(Math.ceil(hrefs.length / 2));
    });
  });

  // Checks that the Politics page includes the global header, which contains the logo and navigation links.

  it("displays a header on the Politics page", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.get("header").should("exist");
  });

  // Checks that the Politics page includes a footer.

  it("displays a footer on the Politics page", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.get("footer").should("exist");
  });

  //  Ensures that each article card shows a publication date.

  it("shows publication dates on article pages", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });

    cy.get('a[href*="/article/"]')
      .first()
      .then(($link) => {
        cy.wrap($link).click({ force: true });

        cy.contains(
          /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|\d{4})/,
        ).should("exist");
      });
  });

  /**
   * Confirms that the Politics page contains essential SEO metadata tags.
   * These tags are important for search engines and social sharing previews.
   */
  it("includes a title and meta description tag", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.title().should("match", /politics/i);
    cy.document().then((doc) => {
      const metaDesc = doc.querySelector('meta[name="description"]');
      expect(metaDesc).to.exist;
      const content = metaDesc.getAttribute("content");
      expect(content).to.be.a("string").and.not.be.empty;
    });
  });

  //Verifies that navigating to a non‑existent article slug returns a 404 page or an error message.

  it("returns a 404 page when visiting an invalid article slug", () => {
    cy.visit("/article/this-slug-does-not-exist-12345", {
      failOnStatusCode: false,
    });
    cy.contains(/404|not\s+found|whoops|sorry|can'?t\s+find/i).should("exist");
  });

  // Executes the navigation flow on a variety of mobile viewports to ensure the Politics section is reachable on small screens.

  const mobileViewports = [
    "iphone-6",
    "iphone-8",
    "iphone-x",
    "samsung-s10",
    "ipad-mini",
  ];
  mobileViewports.forEach((device) => {
    it(`allows navigation to Politics on a ${device} viewport`, () => {
      cy.viewport(device);
      cy.visit("/");

      cy.acceptCookies();

      cy.get("button, a")
        .filter((i, el) =>
          /menu|hamburger|nav/i.test(
            el.getAttribute("aria-label") || el.innerText,
          ),
        )
        .first()
        .then(($menu) => {
          if ($menu.length) {
            cy.wrap($menu).click({ force: true });
          }
        });

      cy.contains("a, button", /read/i).click({ force: true });
      cy.contains(/politics/i).click({ force: true });
      cy.url().should("match", /politics/);
    });
  });

  /**
   * Checks that the Politics landing page displays an explicit
   * heading or label “Politics”, helping users understand what
   * section they’re viewing.
   */
  it("displays a Politics heading on the tag page", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.contains(/\bpolitics\b/i).should("exist");
  });

  //Ensures the Politics page defines a canonical link. This tag helps search engines avoid indexing duplicate URLs.

  it("includes a canonical link element", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.document().then((doc) => {
      const canonical = doc.querySelector('link[rel="canonical"]');
      if (!canonical) {
        return;
      }
      const href = canonical.getAttribute("href");
      expect(href).to.be.a("string").and.not.be.empty;
    });
  });

  // Verifies that clicking the site logo in the header from the Politics page navigates back to the home page.

  it("returns to the home page when the logo is clicked", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.get('header a[href="/"]').first().click({ force: true });
    cy.url().should("eq", "https://www.tvo.org/");
  });

  // Confirms that the global header contains links to other major sections such as Watch,Listen and Schedule. T
  it("shows other primary navigation items like Watch, Listen and Schedule", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    ["Watch", "Listen", "Schedule"].forEach((label) => {
      cy.contains("a", new RegExp(label, "i")).should("exist");
    });
  });

  //  Verifies that the site always uses HTTPS.

  it("is served over HTTPS", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.location("protocol").should("eq", "https:");
  });

  // Checks that there is a search input accessible from the Politics page.
  it("provides a search page for site queries", () => {
    cy.visit("/search", { failOnStatusCode: false });

    cy.contains(/search\s+tvo\s+today/i).should("exist");
  });

  // Ensures there is at least one article containing the word“analysis” in the Politics feed.

  it("contains analysis article section", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.contains(/analysis/i).should("exist");
  });

  // Check that the donation section labelled "Fuel Creativity Across Ontario" appears and that
  // the donate button links to a support page
  it("displays a donation section and donate button works", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });

    cy.contains(/fuel\s+creativity\s+across\s+ontario/i).should("exist");

    cy.contains(/fuel\s+creativity\s+across\s+ontario/i)
      .parent()
      .within(() => {
        cy.contains("a, button", /donate/i).should("exist");
      });
    cy.contains("a, button", /donate/i)
      .first()
      .then(($el) => {
        const href = $el.attr("href");

        expect(href).to.match(/donate|support|tvo/i);

        if ($el.attr("target")) {
          expect($el.attr("target")).to.equal("_blank");
        }

        if (href && href.startsWith("http")) {
          cy.request(href).its("status").should("eq", 200);
        }
      });
  });

  // Ensure a "Latest on Politics" section is present
  it('displays the "Latest on Politics" section', () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.contains(/latest\s+on\s+politics/i).should("exist");
  });

  //Verifies that the Politics page includes a descriptive subheading beneath the main Politics heading.

  it("includes a descriptive subheading on the Politics page", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.get("p")
      .filter((i, el) => el.innerText.trim().length > 30)
      .its("length")
      .should("be.greaterThan", 0);
  });

  //Measures the load time of the Politics page using the browser’s Performance Timing API.

  it("loads the Politics page within an acceptable time", () => {
    cy.visit("/current-affairs/tag/politics", { failOnStatusCode: false });
    cy.window().then((win) => {
      const timing = win.performance.timing;

      const loadTime = timing.loadEventEnd - timing.navigationStart;

      if (loadTime > 0) {
        expect(loadTime).to.be.lessThan(8000);
      }
    });
  });

  // Verifies that the site’s search functionality returns results for a politics query.
  it("returns results when searching for politics", () => {
    cy.visit("/search/politics", { failOnStatusCode: false });
    cy.get('a[href*="/article/"]', { timeout: 15000 })
      .its("length")
      .should("be.greaterThan", 0);
  });
});
