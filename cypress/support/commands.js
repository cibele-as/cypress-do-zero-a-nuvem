
//-- This is a custom command to fill out the contact form
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
   firstName: 'Carlos',
   lastName: 'Lopes',
   email: 'carlos@test.com',
   text: 'Mensagem de teste 2'
})=> {
   cy.get('#firstName').type(data.firstName)
   cy.get('#lastName').type(data.lastName)
   cy.get('#email').type(data.email)
   cy.get('#open-text-area').type(data.text)
   // cy.get('button[type="submit"]').click()

    cy.contains('button','Enviar').click()
})
