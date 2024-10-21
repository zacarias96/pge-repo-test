# pge-repo-test
Repositório para armazenar código e documentação base para teste na PGE-CE

## Ferramentas Utilizadas:
- IDE de sua preferência
- Git
- Cypress 13.15
- Node
- NPM

## Antes de Começar:
Antes de clonar o projeto, todos os critérios abaixo **DEVEM** estar instalados, configurados e disponíveis em sua máquina:

- [ ] NPM
- [ ] Node
- [ ] Git
- [ ] Cypress

Instruções de instalação dos artefatos podem ser encontradas na seção [Instalação](#instalação).

## Clonando o Projeto
O projeto deve ser clonado através do comando:

``` shell
    git clone https://github.com/zacarias96/pge-repo-test.git
```
Caso não especifique uma pasta o git irá clonar o projeto dentro da pasta padrão `pge-repo-test`.

Para clonar o projeto em uma pasta específica deve adicionar o nome da pasta ao final do comando:  

``` shell
    $ git clone https://github.com/zacarias96/pge-repo-test.git "PASTA_DE_DESTINO"
```

Todo o projeto será clonado dentro da pasta **PASTA_DE_DESTINO**.

## Instalação
Nesta seção estão todos os passos necessários para a configuração de ambiente necessária para que o projeto seja executado com sucesso.

- ### Git
  - O Git é uma ferramenta de SCM que permite a paralelização de trabalho de um projeto através da manutenção em forma de branches (ramificações) posteriormente vinculadas a uma branch principal.

  - Para instalar o Git devemos acessar o link [Git SCM Downloads](https://git-scm.com/download/win) e instalar a versão conforme o seu sistema operacional (32-bit - x86 ou 64-bit - x64). **(REQUER ELEVAÇÃO)**
  - O Git possui um instalador com uma GUI (Guide User Interface) e os passos devem ser selecionados conforme as configurações da sua máquina.
    
  - Após a conclusão do processo execute o comando abaixo:
    ``` shell
     > git --version
    ```
  - E o PowerShell deve retornar uma mensagem assim:
    
    ![Git Version](documentation/README%20images/git_version.png)

- ### Node
  - O Node.js é uma plataforma de desenvolvimento em JavaScript que permite a execução de código JavaScript fora do navegador web, além de ser um ambiente de execução de código aberto, gratuito e multiplataforma.

  - O Node.js é instalável tanto por linha de comando (CLI) quando por um pacote de instalação com uma GUI, oficialmente disponibilizado pela própria organização e disponível no link [Node.js Download](https://nodejs.org/en/download/prebuilt-installer)
  - Todos os passos devem ser selecionados e configurados conforme o seu sistema operacional. **(REQUER ELEVAÇÃO)**
  - Após a conclusão do processo abra um novo terminal do PowerShell e execute o comando abaixo para validar a instalação:
    ``` shell
     > node --version
    ```
  - E o PowerShell deve retornar uma mensagem assim:

    ![Node.js Version](documentation/README%20images/nodejs_version.png)

- ### NPM
  - NPM (Node Package Manager) é um gerenciador de pacotes que faz parte do Node.js. É utilizado para adicionar, remover ou atualizar dependências em aplicações.

  - Caso tenha seguido este README e instalado o Node via pacote de instalação, o NPM já terá sido instalado em conjunto. Para confirmar basta abrir um novo terminal do PowerShell e executar o comando abaixo:
  ``` shell
     > node --version
    ```
  - E o PowerShell deve retornar uma mensagem assim:

    ![NPM Version](documentation/README%20images/npm_version.png)

- ### Cypress
  - Cypress é um framework open source e multiplataforma que possibilita a escrita de testes automatizados de forma fácil, rápida e confiável, tudo em JavaScript. É possível realizar todo o controle de versão e integrações de testes em CI/CD diretamente de dentro do framework, de forma ágil e eficiente.

  - O Cypress pode ser utilizado tanto de forma stand-alone através do download direto do código-fonte, quanto instalado através do NPM.

  - Para uma manutenabilidade melhor, é utilizada a instalação através do NPM, então para isso devemos **_NECESSARIAMENTE_** já possuir o NPM. Caso não possua visite [Instalação Node.js/NPM](#node).

  - Para instalar o Cypress abra um terminal PowerShell e digite o seguinte código:
    ``` shell
    > npm install cypress
    ```

  - Após a conclusão do processo execute o comando abaixo:
    ``` shell
     > npx cypress -v
    ```
  - E o PowerShell deve retornar uma mensagem assim:
  
    ![Cypress Version](documentation/README%20images/cypress_version.png)

## Roadmap
Aqui são declarados todas as possíveis melhorias aceitas e/ou já implementadas ao projeto:
- [ ] Adequação a chamadas personalizadas do projeto via CLI.
- [ ] Adequação ao uso de SECRETS.
- [ ] Adequação para uso em CI/CD.

Ideias já concebidas e desenvolvidas devem ser marcadas para seguir o amadurecimento do projeto e jamais devem ser excluídas.

## Contribuições
Críticas, sugestões e/ou contribuições serão sempre bem-vindas!

Novas versões e melhorias podem ser implantadas e manutenidas através do sistema de gerenciamento do Github.

Revisões de código serão feitas e sua contribuição pode ser mantida tanto no campo [Autores e Conhecimento](#Autores-e-Conhecimento) quanto nas _Release Notes_.

## Autores e Conhecimento
Lucas Zacarias (Versão 1.0) - Versão inicial do projeto.

## Licenças
Este é um projeto de desafio interno, para proposta elaborada pela PGE-CE, não-compartilhável pertencente à **Lucas Haiaiel A. Zacarias**.

O acesso, download, alterações e melhorias devem ser realizadas somente por pessoas pertencentes a **PGE-CE**.

## Estado do Projeto
Maintained (CLOSED)