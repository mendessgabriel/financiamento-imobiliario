class Pessoa {

    constructor() {
        this._nome = ""
        this._cpf = 0
        this._email = ""
        this._telefone = 0
    }

    log(){
        let pessoa = { nome: this._nome, cpf: this._cpf, email: this._email, telefone: this._telefone }
        console.table(pessoa);
    }

}