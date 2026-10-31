import { faker  } from '@faker-js/faker'

class Checkout {

    procederCheckout(){
        const comentario = faker.lorem.sentences()

        cy.contains('a', 'Cart').click()
        cy.contains('Proceed To Checkout').click()
        cy.get('.form-control').type(comentario)
    }

    fazerPedido(name){
        const cardNumber = faker.finance.accountNumber()
        const cvc = faker.finance.currencyNumericCode()

        cy.contains('Place Order').click()
        cy.get('[data-qa="name-on-card"]').type(name)
        cy.get('[data-qa="card-number"]').type(cardNumber)
        cy.get('[data-qa="cvc"]').type(cvc)
        cy.get('[data-qa="expiry-month"]').type('12')
        cy.get('[data-qa="expiry-year"]').type('2030')
        cy.get('[data-qa="pay-button"]').click()
    }

}

export default new Checkout()