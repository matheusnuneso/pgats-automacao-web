class Produto {

    visualizarProduto(idProduto){
        cy.contains('h2', 'All Products').click()
        cy.get('.features_items').should('be.visible')
        cy.get(`.features_items a[href="/product_details/${idProduto}"]`).click()
    }

    pesquisarProduto(productName){
        cy.get('#search_product').type(productName)
        cy.get('#submit_search').click()
    }


}

export default new Produto()