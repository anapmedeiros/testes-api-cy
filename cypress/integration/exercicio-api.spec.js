/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
//import { expect } from "chai";

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn})
     })
     
    it.only('Deve validar contrato de usuários', () => {
     cy.request('usuarios').then(response => {
          return contrato.validateAsync(response.body)
         })
    });

    it('Deve listar usuários cadastrados', () => {
         cy.request({
              method: 'GET',
              url: 'usuarios'
         }).then((response) => {
          expect(response.status).to.equal(200)    
          expect(response.body).to.have.property('usuarios')
          expect(response.body.usuarios[3].nome).to.equal('Antônio da Silva ')
     })
    });

    it('Deve cadastrar um usuário com sucesso', () => {
         let usuario = `Antonio${Math.floor(Math.random() *1000000000000)}@qa.com`
         cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": "Antônio da Silva ",
                    "email": usuario,
                    "password": "teste",
                    "administrador": "true"
                  }
         }).then((response) => {
          expect(response.status).to.equal(201)    
          expect(response.body.message).to.equal('Cadastro realizado com sucesso')
         })
     });

    it('Deve validar um usuário com email inválido', () => {
     cy.cadastrarUsuarios('Antônio da Silva', 'Antonios@qa.com', 'teste', 'true')
    .then((response) => {
     expect(response.status).to.equal(400)    
     expect(response.body.message).to.equal('Este email já está sendo usado')
    })
    });

    it('Deve editar um usuário previamente cadastrado', () => {
     let usuario = `anacarolina${Math.floor(Math.random() *1000000000000)}@qa.com`
     cy.cadastrarUsuarios("Ana Carolina Cardoso", usuario, "teste", "false")
     .then(response => {
          let id = response.body._id
     cy.request({
          method: 'PUT',
          url:`usuarios/${id}`,
          body:
          {
               "nome": "Ana Carolina Medeiros",
               "email": usuario,
               "password": "teste",
               "administrador": "false"
             },
     })
     })

    });

    it('Deve deletar um usuário previamente cadastrado', () => {
     let usuario = `anacarolina${Math.floor(Math.random() *1000000000000)}@qa.com`
     cy.cadastrarUsuarios("Ana Carolina Cardoso", usuario, "teste", "false")
     .then(response => {
          let id = response.body._id
                    cy.request({
               method: 'DELETE',
               url:`usuarios/${id}`,
               
          }).then(response =>{
               expect(response.body.message).to.equal("Registro excluído com sucesso")
               expect(response.status).to.equal(200)
          })
    });


});
})
