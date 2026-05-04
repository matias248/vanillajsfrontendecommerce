describe('Product Form Test', () => {
    it('Submit without puting all the data', () => {
        cy.visit('stores/1/products');
        cy.get('#fixedButton').click();
        cy.get('[name="submitButton"]').click();
        //stays in creation page
        cy.contains('Create a new product');

        cy.get('#inputString-Name').type('Product');
        //stays in creation page after only putting name
        cy.get('[name="submitButton"]').click();

        cy.contains('Create a new product');

        //stays in creation page after putting also city
        cy.get('#inputString-Description').type('Description');
        cy.get('[name="submitButton"]').click();

        //Verify data. Normally it is the store with id number 3.
        cy.get('#productElementGallery4').should('exist')
        
    })

    it('Submit puting data in wrong format', () => {
        cy.visit('stores/1/products');
        cy.get('#fixedButton').click();
        
        cy.get('#inputString-Name').type('123456789X123456789X123456');
        cy.get('#inputString-Description').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,');
        cy.get('#inputNumber-Price').type('1.1111');

        cy.get('[name="submitButton"]').click();

        cy.get('#inputString-Name').should('have.css', 'background-color', 'oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputNumber-Price').should('have.css', 'background-color', 'oklch(0.885 0.062 18.334)').parent().should('contain', 'Set the correct format');
        cy.get('#inputString-Description').should('have.css', 'background-color', 'oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 500');


        cy.get('#inputString-Name').clear();
        cy.get('#inputString-Name').type('correct Name').should('have.css', 'background-color', 'oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('#inputNumber-Price').clear();
        cy.get('#inputNumber-Price').type('1,3').should('have.css', 'background-color', 'oklch(0.985 0.002 247.839)').parent().should('not.contain', 'Set the correct format');

        cy.get('#inputString-Description').clear();
        cy.get('#inputString-Description').type('correct state').should('have.css', 'background-color', 'oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 500');
    })
})
