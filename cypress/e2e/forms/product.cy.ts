describe('Product Crud Test', () => {
  it('Create a new product', () => {
    cy.visit('stores/1/products');
    cy.contains('List of products');
    cy.get('#fixedButton').click();
    cy.contains('Create a new product');

    cy.get('#inputString-Name').type('ProductCypress');
    cy.get('#inputString-Description').type('Description');
    cy.get('#inputNumber-Price').type('1');

    cy.get('[name="CategoryselectedOption"]').select('Accessories');
    //cy.get('[name="inventoryStatus"]').type('31000');

    cy.get('[name="submitButton"]').click();
    cy.contains('List of products');

    //Verify data. Normally it is the product with id number 4.
    cy.get('#productElementGallery4').should('exist')
      .should('contain', 'ProductCypress')
      .should('contain', 'Description')
      .find('#divNoImageSet4').should('exist');
  })
 it('Read a product Using edit mode', () => {
    cy.visit('stores/1/products');

    cy.get('#productElementGallery1').should('contain', 'Simple Watch').get('#editButton1').click()
    cy.get('#inputString-Name').should('have.value', 'Simple Watch');
    cy.get('#inputString-Description').should('have.value', 'Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.');
    cy.get('#inputNumber-Price').should('have.value', '65');

    cy.get('[name="CategoryselectedOption"]').should('have.value', 'Accessories');
    cy.get('[name="Inventory statusselectedOption"]').should('have.value', 'INSTOCK');
  })
  it('Read a product Using Display mode', () => {
    cy.visit('stores/1/products');

    cy.get('#productElementGallery1').click()
    cy.get('#displayProductElement0key').should('contain','Name')
    cy.get('#displayProductElement0value').should('contain','Simple Watch')

    cy.get('#displayProductElement1key').should('contain','Description')
    cy.get('#displayProductElement1value').should('contain','Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.')

    cy.get('#displayProductElement2key').should('contain','Image url')
    cy.get('#displayProductElement2value').should('contain','watch.jpeg')

    cy.get('#displayProductElement3key').should('contain','Price')
    cy.get('#displayProductElement3value').should('contain','65')

    cy.get('#displayProductElement4key').should('contain','Category')
    cy.get('#displayProductElement4value').should('contain','Accessories')

    cy.get('#displayProductElement5key').should('contain','Inventory status')
    cy.get('#displayProductElement5value').should('contain','INSTOCK')

    cy.get('#displayProductElement6key').should('contain','Currency')
    cy.get('#displayProductElement6value').should('contain','€')


  })


  it('Update a product', () => {
    cy.visit('stores/1/products');
    cy.get('#productElementGallery1').get('#editButton1').click()
    cy.get('#inputImageUrl-URL').should('have.value', 'https://matias248.github.io/reactEcommercePortfolio/watch.jpeg').clear();
    cy.get('#inputString-Name').should('have.value', 'Simple Watch').type('Updated');
    cy.get('#inputString-Description').should('have.value', 'Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.').type('Updated');

    cy.get('#inputNumber-Price').should('have.value', '65').type('.1');
    cy.get('[name="CategoryselectedOption"]').should('have.value', 'Accessories').select(1);
    cy.get('[name="Inventory statusselectedOption"]').should('have.value', 'INSTOCK').select(1);

    cy.get('[name="submitButton"]').click();


    cy.get('#productElementGallery1').should('exist').should('contain','Simple WatchUpdated')
      .find('#divNoImageSet1').should('exist').get('#editButton1').click()

    cy.get('#inputImageUrl-URL').should('have.value', '')

    cy.get('#inputString-Name').should('have.value', 'Simple WatchUpdated');
    cy.get('#inputString-Description').should('have.value', 'Embrace timeless sophistication with the Simple Watch, a fusion of classic design and modern functionality. Crafted from stainless steel and sapphire crystal.Updated');

    cy.get('#inputNumber-Price').should('have.value', '65.1');
    cy.get('[name="CategoryselectedOption"]').should('have.value', 'Fitness');
    cy.get('[name="Inventory statusselectedOption"]').should('have.value', 'LOWSTOCK');
  })
  
  it('Delete a product',()=>{
    cy.visit('stores/1/products');

    cy.get('#productElementGallery1').get('#editButton1').click()

    cy.get('[name="deleteButton"]').click();

    cy.contains('List of products');
    cy.get('#productElementGallery1').should('not.exist')

  })
  it('Cancel a product update',()=>{
    cy.visit('stores/1/products');
    cy.get('#productElementGallery1').get('#editButton1').click()

    cy.get('#inputString-Name').should('have.value', 'Simple Watch').type('new name');
    cy.get('[name="cancelButton"]').click();
    cy.get('#productElementGallery1').get('#editButton1').click()
    cy.get('#inputString-Name').should('have.value','Simple Watch');

  })
})

describe('Test Displays if store doesn t exist ', () => {
  it('Test Display in list of products', () => {
    cy.visit('stores/99/products');
    cy.get('#itemNotFound').should('exist')
    cy.get('List of products').should('not.exist')

  })
  it('Test Display in a product', () => {
    cy.visit('stores/99/products/1');
    cy.get('#itemNotFound').should('exist')
  })
})

describe('Test Displays if product doesn t exist ', () => {
  it('Test Display in a product', () => {
    cy.visit('stores/1/products/900');
    cy.get('#itemNotFound').should('exist');
    cy.visit('stores/900/products/900');
    cy.get('#itemNotFound').should('exist');
  })
})
