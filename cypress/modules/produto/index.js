import { faker  } from '@faker-js/faker'

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

    adicionarProdutoCarrinho(idProduto){
        cy.contains('a', 'Products').click()
        cy.get(`a.add-to-cart[data-product-id="${idProduto}"]`).first().click()
        
        cy.get('.modal-content').then(($modal) => {
            if ($modal.is(':visible')) {
                cy.wrap($modal)
                    .contains('button', 'Continue Shopping')
                    .click()
            }
        })
    }

    subscription(){
        const email = faker.internet.email()

        cy.get('#susbscribe_email').type(email)
        cy.get('#subscribe').click()
    }

}

export default new Produto()