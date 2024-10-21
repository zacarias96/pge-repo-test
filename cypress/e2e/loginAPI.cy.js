describe("POST /login", function () {
    it("Realiza o Login com Sucesso e Recebe um token válido.", function (){
        cy.request({
            method: 'POST',
            url: '/login',
            body: Cypress.env('loginBody'),
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            const paramToken = response.body.hasOwnProperty('token');
            expect(paramToken).to.be.true;
            expect(response.body.token).to.have.lengthOf.at.least(1, 'Campo Token Não pode ser Vazio!');
        });
    });

    it("Realiza o Login com Usuário incorreto/inexistente.", function () {
        cy.request({
            method: 'POST',
            url: '/login',
            body: {
                usuario: "teste",
                senha: "teste001"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Usuário ou senha inválidos");
        });
    });
});