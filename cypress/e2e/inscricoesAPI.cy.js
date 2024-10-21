before(function () {
    cy.request({
        url: "/login",
        method: "POST",
        body: Cypress.env('loginBody'),
        failOnStatusCode: false,
    }).then((response) => {
        cy.wrap(response.body.token).as("token");
    });

    cy.get("@token").then(function (token) {
        this.token = token;
    });
});

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
        return false;
    }

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(9, 10))) {
        return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;

    if ((resto === 10) || (resto === 11)) {
        resto = 0;
    }
    if (resto !== parseInt(cpf.substring(10, 11))) {
        return false;
    }

    return true;
}

describe("GET /inscricoes", function () {
    it("Não deve permitir Acesso Não-Autorizado (sem token)", function () {
        cy.request({
            url: "/inscricoes/99999999900",
            method: "GET",
            headers: {
                "x-access-token": ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("Verifica todos os campos obrigatórios do retorno das inscrições protestadas do contribuinte.", function () {
        cy.request({
            url: "/inscricoes/" + 12345678900,
            method: "GET",
            headers: {
                "x-access-token": this.token,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
            console.log(response.body);

            const responseArray = response.body;
            let responseData = JSON.stringify(responseArray[0]);
            responseData = JSON.parse(responseData);

            console.log(responseData);
            expect(responseData).to.have.property("cpf");
            expect(responseData).to.have.property('data_inscricao');
            expect(responseData).to.have.property('data_prazo');
            expect(responseData).to.have.property('descricao');
            expect(responseData).to.have.property('numero');
            expect(responseData).to.have.property('valor');
        });
    });

    it("Verifica mensagem de erro para inscrição não encontrada.", function () {
        cy.request({
            url: "/inscricoes/" + 1,
            method: "GET",
            headers: {
                "x-access-token": this.token,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
            console.log(response.body);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Nenhuma inscrição encontrada para este contribuinte");
        });
    });
});