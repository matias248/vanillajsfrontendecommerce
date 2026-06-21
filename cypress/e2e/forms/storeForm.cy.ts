describe('Store Form Test', () => {
    it('Submit without puting all the data', () => {
        cy.visit('stores');
        cy.get('#fixedButton').click();
        cy.get('[name="submitButton"]').click();
        //stays in creation page
        cy.contains('Create a new store');
        
        cy.get('#inputString-Name').type('StoreCypress');
        //stays in creation page after only putting name
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also city
        cy.get('#inputString-City').type('City');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also currency
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also state
        cy.get('#inputString-State').type('France');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also zipCode
        cy.get('#inputString-Zipcode').type('31000');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also streetNumber
        cy.get('[id="inputString-Street Number"]').type('12');
        cy.get('[name="submitButton"]').click();
        cy.contains('Create a new store');

        //stays in creation page after putting also streetName
        cy.get('[id="inputString-Street Name"]').type('MMMM');
        cy.get('[name="submitButton"]').click();

        //Verify data. Normally it is the store with id number 3.
        cy.get('#storeElementGallery3').should('exist')
    })

    it('Submit puting data in wrong format', () => {
        cy.visit('stores');
        cy.get('#fixedButton').click();
   
        cy.contains('Create a new store');

        cy.get('#inputString-Name').type('123456789X123456789X123456');       

        cy.get('#inputString-City').type('123456789X123456789X123456');

        cy.get('#inputString-State').type('123456789X123456789X123456');

        cy.get('#inputString-Zipcode').type('123456789X123456789X123456');

        cy.get('[id="inputString-Street Number"]').type('123456789X123456789X123456');

        cy.get('[id="inputString-Street Name"]').type('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,');
        
        cy.get('#inputString-Latitude').type('A');
        cy.get('#inputString-Longitude').type('A');
    
        cy.get('[name="submitButton"]').click();

        cy.get('#inputString-Name').should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-City').should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-State').should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-Zipcode').should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[id="inputString-Street Number"]').should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-Latitude').should('have.css', 'background-color','oklch(0.885 0.062 18.334)');
        cy.get('#inputString-Longitude').should('have.css', 'background-color','oklch(0.885 0.062 18.334)');
        cy.get('[id="inputString-Street Name"]').should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 500');
        
        cy.get('#inputString-Name').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-Name').type('correct Name').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('#inputString-City').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-City').type('correct city').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 25');
     
        cy.get('#inputString-State').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-State').type('correct state').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('#inputString-Zipcode').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('#inputString-Zipcode').type('correct state').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('[id="inputString-Street Number"]').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 25');
        cy.get('[id="inputString-Street Number"]').type('1').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 25');

        cy.get('[id="inputString-Street Name"]').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent().should('contain', 'The size should be between 0 and 500');
        cy.get('[id="inputString-Street Name"]').type('street Name').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent().should('not.contain', 'The size should be between 0 and 500');
        
        cy.get('#inputString-Latitude').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent()
        cy.get('#inputString-Latitude').type('1').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent()

        cy.get('#inputString-Longitude').clear().should('have.css', 'background-color','oklch(0.885 0.062 18.334)').parent()
        cy.get('#inputString-Longitude').type('1').should('have.css', 'background-color','oklch(0.985 0.002 247.839)').parent()
    })

})
