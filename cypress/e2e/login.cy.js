import cadastro from '../modules/cadastro'
import login from '../modules/login'

import { faker  } from '@faker-js/faker'

describe('Testes de Login', () => {

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

  it('CT2- Login com sucesso', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    
    cy.visit('/login')
    login.preencherFormularioDeLogin(email, password)

    cy.contains('a', `Logged in as ${name}`).should('be.visible')
  })

  it('CT3- Login com email errado', () => {
    cy.visit('/login')
    login.preencherFormularioDeLogin('email@errado.com', password)

    cy.contains('p', 'Your email or password is incorrect!').should('be.visible')
  })

  it('CT4- Logout', () => {
    cy.visit('/login')
    login.preencherFormularioDeLogin(email, password)
    login.logout() 
  })

  after(() => {
    cy.visit('/login')
    login.preencherFormularioDeLogin(email, password)
    cy.contains('a', ' Delete Account').click()
  })
})