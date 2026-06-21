describe('Test ImageGallery product ', () => {
  beforeEach(() => {
    cy.visit('stores/1/products');

    cy.get('#productElementGallery1').then((productElementGallery1) => {
      // Capture the outer width and height of the container
      cy.wrap(productElementGallery1).invoke('outerWidth').as('width1Container');
      cy.wrap(productElementGallery1).invoke('outerHeight').as('height1Container');

      // Capture the outer width and height of the image inside the container
      cy.wrap(productElementGallery1).find('#imageProductGallery1').then((imageProductGallery1) => {
        cy.wrap(imageProductGallery1).invoke('outerWidth').as('width1Image');
        cy.wrap(imageProductGallery1).invoke('outerHeight').as('height1Image');
      });

      // Capture the outer width and height of the text inside the container
      cy.wrap(productElementGallery1).find('#textProductGallery1').then((textElementGallery1) => {
        cy.wrap(textElementGallery1).invoke('outerWidth').as('width1Text');
        cy.wrap(textElementGallery1).invoke('outerHeight').as('height1Text');
      });

      
    });

    // Long Description and Long Name 
    cy.get('#productElementGallery1').get('#editButton1').click()
    cy.get('#inputImageUrl-URL').should('have.value', 'https://matias248.github.io/reactEcommercePortfolio/watch.jpeg').clear();
    cy.get('#inputString-Name').should('have.value', 'Simple Watch').clear().type('WWWWWWWWWWWWWWWWWW');
    cy.get('#inputString-Description').should('have.value', 'Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.').clear().type('WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW');

  
    cy.get('[name="submitButton"]').click(); 
     // Re-capture the dimensions after the changes
     cy.get('#productElementGallery1').then((productElementGallery1) => {
      cy.wrap(productElementGallery1).invoke('outerWidth').as('width2Container');
      cy.wrap(productElementGallery1).invoke('outerHeight').as('height2Container');

      cy.wrap(productElementGallery1).find('#imageProductGallery1').then((imageProductGallery1) => {
        cy.wrap(imageProductGallery1).invoke('outerWidth').as('width2Image');
        cy.wrap(imageProductGallery1).invoke('outerHeight').as('height2Image');
      });

      cy.wrap(productElementGallery1).find('#textProductGallery1').then((textElementGallery1) => {
        cy.wrap(textElementGallery1).invoke('outerWidth').as('width2Text');
        cy.wrap(textElementGallery1).invoke('outerHeight').as('height2Text');
      });
    });
  })

  it('UI good after Long Description and Long Name', function () {
    // the size still the same on the container
    expect(this.width1Container).to.eq(this.width2Container)
    expect(this.height1Container).to.eq(this.height2Container)
    expect(this.width1Image).to.eq(this.width2Image)
    expect(this.height1Image).to.eq(this.height2Image)
    expect(this.width1Text).to.eq(this.width2Text)
    expect(this.height1Text).to.eq(this.height2Text)

    cy.get('#productElementGallery1').find('#1textProductGallery1').should('have.css', 'text-overflow', 'ellipsis')
    cy.get('#productElementGallery1').find('#2textProductGallery1').should('have.css', 'overflow', 'hidden')

  })
})
