import cadastro from '../modules/cadastro'
import login from '../modules/login'

import { faker  } from '@faker-js/faker'

describe('Testes de Cadastro', () => {

    const email = faker.internet.email()
    const password = faker.internet.password()
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()
    const name = `${firstName} ${lastName}`

    before(() => {
        cy.visit('/login')
        cadastro.preencherFormularioDePreCadastro(name, email)
        cadastro.preencherFormularioDeCadastroCompleto(firstName, lastName, password)
    })

    it('CT1- Cadastrar um usuário com sucesso', () => {
        cy.contains('b', 'Account Created!').should('be.visible')
    })

    it('CT5- Cadastrar usuário com email já existente', () => {
        cy.visit('/login')
        cadastro.preencherFormularioDePreCadastro(name, email)

        cy.contains('p', 'Email Address already exist!').should('be.visible')
    })

    after(() => {
        cy.visit('/login')
        login.preencherFormularioDeLogin(email, password)
        cy.contains('a', 'Delete Account').click()
    })

})