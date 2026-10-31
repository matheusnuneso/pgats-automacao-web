import produto from '../modules/produto'

describe('Testes de Produto', () => {

    beforeEach(() => {
        cy.visit('')
        cy.contains('a', 'Products').click()
    })

    it('CT8- Visualizar detalhes do produto', () => {
        produto.visualizarProduto(1)

        cy.get('.product-information').should('contain.text', 'Category:')
            .and('contain.text', 'Rs.')
            .and('contain.text', 'Availability:')
            .and('contain.text', 'Condition:')
            .and('contain.text', 'Brand:')
    })

    it('CT9- Visualizar detalhes do produto', () => {
        produto.pesquisarProduto('BLUE')

        cy.get('.features_items .product-image-wrapper')
            .each(($product) => {
                cy.wrap($product)
                    .find('.productinfo p')
                    .should('be.visible')
            })
    })

})