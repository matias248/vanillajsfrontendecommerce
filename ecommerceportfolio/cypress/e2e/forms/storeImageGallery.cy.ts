describe('Test ImageGallery product ', () => {
  beforeEach(() => {
    cy.visit('stores/');

    cy.get('#storeElementGallery1').then((storeElementGallery1) => {
      // Capture the outer width and height of the container
      cy.wrap(storeElementGallery1).invoke('outerWidth').as('width1Container');
      cy.wrap(storeElementGallery1).invoke('outerHeight').as('height1Container');

      // Capture the outer width and height of the image inside the container
      cy.wrap(storeElementGallery1).find('#imageStoreGallery1').then((imageStoreGallery1) => {
        cy.wrap(imageStoreGallery1).invoke('outerWidth').as('width1Image');
        cy.wrap(imageStoreGallery1).invoke('outerHeight').as('height1Image');
      });

      // Capture the outer width and height of the text inside the container
      cy.wrap(storeElementGallery1).find('#textStoreGallery1').then((textElementGallery1) => {
        cy.wrap(textElementGallery1).invoke('outerWidth').as('width1Text');
        cy.wrap(textElementGallery1).invoke('outerHeight').as('height1Text');
      });

      
    });

    // Long Description and Long Name 
    cy.get('#editButton1').click();
    cy.get('#inputString-Name').clear().type('WWWWWWWWWWWWWWWWWW');
    cy.get('#inputString-City').clear().type('WWWWWWWWWWWWWWWWWW');
    cy.get('#inputString-State').clear().type('WWWWWWWWWWWWWWWWWW');


  
    cy.get('[name="submitButton"]').click();
     // Re-capture the dimensions after the changes
     cy.get('#storeElementGallery1').then((storeElementGallery1) => {
      // Capture the outer width and height of the container
      cy.wrap(storeElementGallery1).invoke('outerWidth').as('width2Container');
      cy.wrap(storeElementGallery1).invoke('outerHeight').as('height2Container');

      // Capture the outer width and height of the image inside the container
      cy.wrap(storeElementGallery1).find('#imageStoreGallery1').then((imageStoreGallery1) => {
        cy.wrap(imageStoreGallery1).invoke('outerWidth').as('width2Image');
        cy.wrap(imageStoreGallery1).invoke('outerHeight').as('height2Image');
      });

      // Capture the outer width and height of the text inside the container
      cy.wrap(storeElementGallery1).find('#textStoreGallery1').then((textElementGallery1) => {
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

    cy.get('#storeElementGallery1').find('#1textStoreGallery1').should('have.css', 'overflow', 'hidden')
    cy.get('#storeElementGallery1').find('#2textStoreGallery1').should('have.css', 'overflow', 'hidden')


  })
})
