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
    cy.fixture("contribuinte/valido").then(function (contribuinteValido) {
        this.contribuinteValido = contribuinteValido;
    });
    cy.fixture("contribuinte/invalido").then(function (contribuinteInvalido) {
        this.contribuinteInvalido = contribuinteInvalido;
    });
    cy.fixture("contribuinte/duplicado").then(function (contribuinteDuplicado) {
        this.contribuinteDuplicado = contribuinteDuplicado;
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

describe("POST /contribuintes", function () {
    it("Não deve permitir Acesso Não-Autorizado (sem token)", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                "x-access-token": ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });

    it("Tenta realizar um novo cadastro com um CPF já cadastrado", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: this.contribuinteDuplicado,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Contribuinte já cadastrado");
        });
    });

    it("Realiza um novo cadastro", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: {
                "cpf": Math.floor(Math.random() * 500),
                "nome": "Teste001",
                "data_nascimento": "1990-01-01",
                "nome_mae": "Maria da Silva"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.mensagem).to.exist;
            expect(response.body.mensagem).to.eq("Contribuinte cadastrado com sucesso");
        });
    });
});

describe("POST /contribuintes - Campos Vazios", function () {
    it("Campo Nome", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: {
                "cpf": "12345678900",
                "nome": "",
                "data_nascimento": "1990-01-01",
                "nome_mae": "Maria da Silva"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Todos os campos obrigatórios devem ser preenchidos");
        });
    });

    it("Campo Data_Nascimento", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: {
                "cpf": "12345678900",
                "nome": "Terste",
                "data_nascimento": "",
                "nome_mae": "Maria da Silva"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Todos os campos obrigatórios devem ser preenchidos");
        });
    });

    it("Campo Nome_Mae", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: {
                "cpf": "12345678900",
                "nome": "Terste",
                "data_nascimento": "1990-10-15",
                "nome_mae": ""
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Todos os campos obrigatórios devem ser preenchidos");
        });
    });

    it("Campo CPF", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: {
                "cpf": "",
                "nome": "Terste",
                "data_nascimento": "1990-10-15",
                "nome_mae": "Teste Nome Mae"
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Todos os campos obrigatórios devem ser preenchidos");
        });
    });
});

describe("POST /contribuintes - Validações CPF", function () {
    it("Possuir exatamente 11 caracteres", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: this.contribuinteInvalido,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Todos os campos obrigatórios devem ser preenchidos");
            expect(this.contribuinteInvalido.cpf).to.have.lengthOf(11);
        });
    });
    it("Ser um CPF Válido", function () {
        cy.request({
            url: "/contribuintes",
            method: "POST",
            headers: {
                'x-access-token': this.token,
                'Content-Type': 'application/json',
            },
            body: this.contribuinteInvalido,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.erro).to.exist;
            expect(response.body.erro).to.eq("Todos os campos obrigatórios devem ser preenchidos");
            const resultCPF = validarCPF(this.contribuinteInvalido.cpf);
            expect(resultCPF).to.be.true;
            expect(this.contribuinteInvalido.cpf).to.have.lengthOf(11);
        });
    });
});