/// <reference types="Cypress" />

import { NavigationMenu } from '../../pages/Navigation';

context('HomePage should', () => {
  beforeEach(() => {
    cy.visit(Cypress.env().baseUrl);
  });

  it("Render Products Wrapper", () => {
    cy.clearSession();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.homeLink);
    });
    cy.get(".products-wrapper").should("exist");
  });

  it("Check active checkbox", () => {
    cy.get("#active").click({force: true});
    cy.get(".product button").first().should("not.be.disabled");
  });

  it("Check promo checkbox", () => {
    cy.get("#promo").click({force: true});
    cy.get(".promo-label").should("exist");
  });


  it("Search term and open/close product details", () => {
    cy.get(".search-bar").type("Incredible Plastic Pizza");
    cy.contains(".product .title", "Incredible Plastic Pizza");
    cy.get('.product .button-blue').eq(0).click();
    cy.get('.product-details').should("exist");
    cy.get('.product-details .close').click();
    cy.get('.product-details').should('not.exist')
  });

  it('Check not found products', ()=> {
    cy.get(".search-bar").type("asdasd");
    cy.get(".not-found").should('exist');
  })

  it('Check pagination', ()=> {
    cy.get('.pagination li').last().click()
    cy.get('.pagination li').last().prev().should('have.class', 'active')
  })

  it('Check login button', ()=> {
    cy.clearSession();
    cy.get('.log-in-btn').click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.loginLink);
    });
    cy.get('form').should('exist');
    cy.get('.col-right .close').click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq(NavigationMenu.homeLink);
    });
  })


});
