describe('Central de Atendimento ao Cliente TAT', () => {
  // Verifica o título da aplicação
  beforeEach (() => {
  //it('verifica o título da aplicacao', () => {
    cy.visit('./src/index.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    });

  it('preenche os campos obrigatorios e envia o formulário', () => {
    const longText = Cypress._.repeat('Eu tenho uma düvida sobre o atendimento e gostaria de verificar alguns itens importantes', 10)
    //Preenchendo os campo nome obrigatório
   cy.get('input[name="firstName"]').type('Ana').as('firstName')
    cy.get('@firstName')
      .should('have.value', 'Ana')

   
    //Preenchendo os campo sobrenome obrigatório
    cy.get('input[name="lastName"]').type ('Lopes').as ('lastName')
    cy.get('@lastName')
      .should('have.value', 'Lopes')

    //Preenchendo os campo email obrigatório
    cy.get('input[id="email"]').type('test@test.com').as ('email')
    cy.get('@email')
      .should('have.value', 'test@test.com')   

    //Preenchendo os campo como podemos te ajudar obrigatório
    cy.get('textarea[name="open-text-area"]').type (longText, { delay: 0 }).as ('openTextarea')
      cy.get('@openTextarea')
        .should('have.value', longText)

    
    //Enviando o formulário

    cy.contains('button', 'Enviar').click()


    //Validando mensagem de sucesso
    cy.get('.success').should('be.visible')
     
  })

 // Exibe mensagem de fomatacao inválida email
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('test@')
    cy.get('#open-text-area').type('Mensagem de teste')
   // cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click()


 cy.get('.error').should('be.visible')
    
  })
  

  //Verifica se o campo telefone continua vazio quando preenchido com valores nao numéricos
  it('Verifica se o campo telefone continua vazio quando preenchido com valores nao numéricos', () => {
    cy.get('input[id="phone"]')
      .type('aaaaaa').as('phone')
    cy.get('@phone').should('have.value', '')
  }
  )
 
  // Verifica se o campo telefone é orbrigatório mas nao é preenchido
  it('Verifica se o campo telefone é obrigatório mas nao é preenchido', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Lopes')
    cy.get('#email').type('test@test.com')
    cy.get('#phone').should('be.empty')
    cy.get('#phone-checkbox').check()
    .should('be.checked')
    //cy.get('button[type="submit"]').click()

    cy.contains('button', 'Enviar').click()


     cy.get('.error').should('be.visible')
     
  })

  // Preenche e limpa os campos nome, sobrenome, email e telefone

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=> {

    cy.get('#firstName')
      .type('Ana')
      .should('have.value', 'Ana')
      .clear().should('have.value', '')
    cy.get('#lastName')
      .type('Lopes')
      .should('have.value', 'Lopes')
      .clear().should('have.value', '')
    cy.get('#email')
      .type('test@test.com')
      .should('have.value', 'test@test.com')
      .clear().should('have.value', '')
    cy.get('#phone')
       .type('23346758')
      .should('have.value', '23346758')
      .clear().should('have.value', '')
  })

// Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
   // cy.get('button[type="submit"]').click()
    cy.contains('button', 'Enviar').click()

    // Congela relogio do navegador
    cy.clock ()
    cy.get('.error').should('be.visible')
    
    // descongelar o relogio do navegador
    cy.tick(3000)
    cy.get('.error').should('not.be.visible')
  })

//Envia o formuário com sucesso usando um comando customizado
  it('Envia o formulário com sucesso usando um comand customizado', () => {
   // const data = {
     // firstName: 'Ana',
    //  lastName: 'Lopes',
   //  email: 'test@test.com',
     // text: 'Mensagem de teste'
   // }

    cy.fillMandatoryFieldsAndSubmit() 

    //Congela relogio do navegador
     cy.clock()
     cy.get('.success').invoke('text')

    // descongela relogio do navegador
      cy.tick(3000)
      cy.get('.success').should('not.be.visible')

  
  })

  //Seleciona um produto (YouTube) por seu texto
  it('seleciona um produto (YouTube) por seu texto', () => {
     cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  //Seleciona um produto (mentoria) por seu valor
  it('seleciona um produto (Mentoria) por seu valor', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  //Seleciona um produto (Blog) por seu índice
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  //marca o tipo de atendimento "Feedback"
  it('marca o tipo de atendimento "Feedback', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  //marca cada tipo de atendimento
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((typeOfService) => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
    })  

  //marca ambos checkboxes, depois desmarca o último
  it('marca ambos checkboxes, depois desmarca o último', () => {
     cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  //seleciona um arquivo da pasta fixtures
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should((input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
    )
  })

  //seleciona um arquivo simulando um drag-and-drop
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
     .selectFile('cypress/fixtures/example.json', { action: 'drag-drop'})
     .should((input => {
        expect(input[0].files[0].name).to.equal('example.json')
     }))
  })

  //seleciona um arquivo utilizando uma fixture para a qual foi dada um alias
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json'). as ('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile')
      .should((input => {
        expect(input[0].files[0].name).to.equal('example.json')
     }))
  })


//verifica que a política de privacidade abre em outra aba sem a necessidade de um clique
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })
  
//acessa a página da política de privacidade removendo o target e então clicando no link
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
     cy.contains('a', 'Política de Privacidade')
      .invoke ('removeAttr', 'target')
      .click()

      cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
})


// Exibe e oculta as mensagens de sucesso e erro usando .invoke
  it('Exibe e oculta as mensagens de sucesso e erro usando .invoke', () => {
    cy.get('.success')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Mensagem enviada com sucesso.')
      .invoke('hide')
      .should('not.be.visible')
      cy.get('.error')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('contain', 'Valide os campos obrigatórios!')
      .invoke('hide')
      .should('not.be.visible')

  })

  // Preenche o campo da area de texto usando o comando invoke
  it('Preenche o campo da area de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
      .invoke('val', 'Mensagem de teste')
      .should('have.value', 'Mensagem de teste')
  })
  
  // Fazer uma requisicao HTTP
  describe ('GET - Requisicao HTTP', () => {
    it('Faz uma requisicao HTTP', () => {
      cy.request ('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
        .as('getRequest')
        .its('status')
        .should('be.equal', 200)
      cy.get('@getRequest')
        .its('statusText')
        .should('be.equal', 'OK')
      cy.get('@getRequest')
        .its('body')
        .should('include', 'CAC TAT')
       
  })
  })

  // Encontra o gato escondigo
  it('Encontra o gato escondido', () => {
    cy.get('#cat')
      .should('not.be.visible')
      .invoke('show')
      .should('be.visible')
      .and('have.text', '🐈')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'I ❤️ cats')    
      })
})
