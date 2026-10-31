import checkout from '../modules/checkout'
import cadastro from '../modules/cadastro'
import produto from '../modules/produto'
import login from '../modules/login'

import { faker  } from '@faker-js/faker'

describe('Testes de Checkout', () => {

    const email = faker.internet.email()
    const password = faker.internet.password()
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = `${firstName} ${lastName}`

    before(() => {
        cy.visit('/login')
        cadastro.preencherFormularioDePreCadastro(name, email)
        cadastro.preencherFormularioDeCadastroCompleto(firstName, lastName, password)
        cy.get('[data-qa="continue-button"]').click()
    })

    it('CT15- Cadastrar usuário antes do checkout', () => {
        produto.adicionarProdutoCarrinho(1)
        checkout.procederCheckout()
        checkout.fazerPedido(name)

        cy.url().should('include', '/payment_done/')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

    })

    it('CT16- Logar antes do checkout', () => {
        cy.visit('/login')
        login.preencherFormularioDeLogin(email, password)
        cy.contains('a', `Logged in as ${name}`).should('be.visible')
        
        produto.adicionarProdutoCarrinho(2)
        checkout.procederCheckout()
        checkout.fazerPedido(name)

        cy.url().should('include', '/payment_done/')
        cy.contains('Congratulations! Your order has been confirmed!').should('be.visible')

    })

})