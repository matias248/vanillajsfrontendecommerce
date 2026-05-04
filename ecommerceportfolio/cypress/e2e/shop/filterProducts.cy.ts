describe('filters on the shop', () => {
    beforeEach(() => {
        cy.visit('shop/');
    })
    it('text product filter method is applied', function () {
        cy.get('#default-searchfilterproducts').type('watch')
        cy.get('#ShopProductElementGallery1').should('exist');
        cy.get('#ShopProductElementGallery2').should('exist');
        cy.get('#ShopProductElementGallery3').should('exist');

        cy.get('#buttonSearchfilterproducts').click();
        cy.get('#shopProductList').get('#ShopProductElementGallery1').should('exist');
        cy.get('#shopProductList').get('#ShopProductElementGallery2').should('not.exist');
        cy.get('#shopProductList').get('#ShopProductElementGallery3').should('not.exist');
    })

    it('text store filter method is applied', function () {
        cy.get('#ShopSelectorInput').contains('Store not selected')
        cy.contains('My store').click();
        cy.contains('Simple Store').should('exist');
        cy.contains('Neo store').should('exist');
        cy.get('#default-searchfiltershops').type('Neo');
        cy.get('#buttonSearchfiltershops').click()
        cy.contains('Simple Store').should('not.exist');
        cy.contains('Neo store').should('exist').click();
        cy.get('[name="confirmDialogShopButton"]').click();
        cy.get('#ShopProductElementGallery1').should('not.exist');
        cy.get('#ShopProductElementGallery2').should('not.exist');
        cy.get('#ShopProductElementGallery3').should('exist');
        cy.get('#ShopSelectorInput').contains('Neo store')

    })

    it('text product filter method and store selector is applied', function () {
        cy.get('#default-searchfilterproducts').type('watch')
        cy.get('#ShopProductElementGallery1').should('exist');
        cy.get('#ShopProductElementGallery2').should('exist');
        cy.get('#ShopProductElementGallery3').should('exist');

        cy.get('#buttonSearchfilterproducts').click();
        cy.get('#shopProductList').get('#ShopProductElementGallery1').should('exist');
        cy.get('#shopProductList').get('#ShopProductElementGallery2').should('not.exist');
        cy.get('#shopProductList').get('#ShopProductElementGallery3').should('not.exist');
        cy.contains('My store').click();
        cy.contains('Neo store').click();
        cy.get('[name="confirmDialogShopButton"]').click();
        cy.get('#shopProductListContainer').get('#ShopProductElementGallery1').should('not.exist');
        cy.get('#shopProductListContainer').contains('No items found').should('exist');
    })

    it('Categories filter is applied method applied', function () {
        cy.get('#ShopProductElementGallery1').should('exist');
        cy.get('#ShopProductElementGallery2').should('exist');
        cy.get('#ShopProductElementGallery3').should('exist');

        cy.get('#ShopCategoryItem1').click();

        cy.get('#shopProductList').should('not.exist');
        cy.get('#shopProductListContainer').contains('No items found').should('exist');
    })
})
