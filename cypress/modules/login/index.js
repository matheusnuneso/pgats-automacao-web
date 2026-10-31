class Login {

  preencherFormularioDeLogin(email, password) {
    cy.get(`[data-qa="login-email"]`).type(email)
    cy.get(`[data-qa="login-password"]`).type(password)

    cy.get(`[data-qa="login-button"]`).click()
  }

  logout(){
    cy.contains('a', ' Logout').click()
    cy.url().should('include', '/login')   
  }
}

export default new Login()