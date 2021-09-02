class FormController {

    constructor() {
        this._simulacao = document.querySelector('#simulacao')
        this._dadosPessoais = document.querySelector('#dadosPessoais')
        this._resultado = document.querySelector('#resultado');
        this._idSimulacao = document.querySelector('#idSimulacao');
        this._idDadosPessoais = document.querySelector('#idDadosPessoais');
        this._idResultado = document.querySelector('#idResultado');
        this._property = document.querySelector('#propertyValue')
        this._propertyAvaliation = document.querySelector('#propertyAvaliation')
        this._fgtsMonthly = document.querySelector('#fgtsMonthly')
        this._rate = document.querySelector('#rate')
        this._term = document.querySelector('#term')

        this._imgSimu = document.querySelector('#idImgSimu')
        this._imgDadosPessoais = document.querySelector('#idImgDadosPessoais')
        this._imgResultado = document.querySelector('#idImgResultado')

        this._formNome = document.querySelector('#Nome')
        this._formCpf = document.querySelector('#Cpf')
        this._formEmail = document.querySelector('#Email')
        this._formTelefone = document.querySelector('#Telefone')

        this._financing = new Financing()
        this._pessoa = new Pessoa()
        this._formInformationsView = new FormInformationsView()
        this._resultTableView = new ResultTableView()
        this._resultInformationsView = new ResultInformationsView()
        this._messageView = new MessageView()
        this._emailService = new EmailService()

        this.change();
        this._toggleView(1);
    }

    change() {
        try {
            this._validateForm();
            this._messageView.update();

            if (this._property.value.indexOf("R$") != -1) {
                this._property.value = this._property.value.replace("R$", "");
                this._property.value = this._property.value.replaceAll(".", "");
                this._property.value = this._property.value.replaceAll(",", ".");
                this._property.value = this._property.value.trim();
                this._financing.property = this._property.value;
            }

            if(isNaN(this._property.value) || this._property.value === "")
            {
                if(this._property.value.includes(","))
                    alert("O valor deve ser colocado no padrão: 100.10 (R$ 100,10)")
                else
                    alert("Insira um número");

                this._property.value = "0";
                return
            }

            this._setModel();

            this._setPerson();
            if (this._formCpf.value.length == 11)
                this._formCpf.value = this._formCpf.value.match(/.{1,3}/g).join(".").replace(/\.(?=[^.]*$)/, "-");

            this.mascaraTelefone(this._formTelefone);

            this._formInformationsView.update(this._financing);
            this._resultTableView.update(this._financing);
            this._resultInformationsView.update(this._financing);

            if (this._property.value != "")
                this._property.value = new Number(this._property.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        } catch (e) {
            this._messageView.update(new Message(e.message, Message.DANGER));
        }
    }

    _toggleView(n) {
        switch (n) {
            case 1:
                this._simulacao.style.display = "block";
                this._dadosPessoais.style.display = "none";
                this._resultado.style.display = "none";

                this._idSimulacao.classList.forEach(el => {
                    if (el === 'disabled') {
                        this._idSimulacao.classList.remove('disabled');
                    }
                })

                this._idDadosPessoais.classList.add('disabled');
                this._idResultado.classList.add('disabled');

                this._imgSimu.style.opacity = "1"
                this._imgDadosPessoais.style.opacity = "0.4"
                this._imgResultado.style.opacity = "0.4"
                break;
            case 2:
                this._simulacao.style.display = "none";
                this._dadosPessoais.style.display = "block";
                this._resultado.style.display = "none";

                this._idDadosPessoais.classList.forEach(el => {
                    if (el === 'disabled') {
                        this._idDadosPessoais.classList.remove('disabled');
                    }
                })

                this._idSimulacao.classList.add('disabled');
                this._idResultado.classList.add('disabled');

                this._imgSimu.style.opacity = "0.4"
                this._imgDadosPessoais.style.opacity = "1"
                this._imgResultado.style.opacity = "0.4"
                break;
            case 3:
                this._simulacao.style.display = "none";
                this._dadosPessoais.style.display = "none";
                this._resultado.style.display = "block";

                this._idResultado.classList.forEach(el => {
                    if (el === 'disabled') {
                        this._idResultado.classList.remove('disabled');
                    }
                })

                this._idSimulacao.classList.add('disabled');
                this._idDadosPessoais.classList.add('disabled');

                this._imgSimu.style.opacity = "0.4"
                this._imgDadosPessoais.style.opacity = "0.4"
                this._imgResultado.style.opacity = "1"
                break;
            default:
                this._simulacao.style.display = "block";
                this._dadosPessoais.style.display = "none";
                this._resultado.style.display = "none";

                this._idSimulacao.classList.forEach(el => {
                    if (el === 'disabled') {
                        this._idSimulacao.classList.remove('disabled');
                    }
                })

                this._idDadosPessoais.classList.add('disabled');
                this._idResultado.classList.add('disabled');

                this._imgSimu.style.opacity = "1"
                this._imgDadosPessoais.style.opacity = "0.4"
                this._imgResultado.style.opacity = "0.4"
                break;
        }
    }

    mascaraTelefone(input) {
        input.maxLength = 15;
        input.value = this.formataTelefone(input.value);
    }

    formataTelefone(value) {
        value = value.replace(/\D/g, "");

        value = value.replace(/^(\d\d)(\d)/g, "($1) $2");

        if (value.length < 14) value = value.replace(/(\d{4})(\d)/, "$1-$2");
        else value = value.replace(/(\d{5})(\d)/, "$1-$2");

        return value;
    }

    _validateForm() {
        if (this._property.validity.rangeOverflow) this._setError(this._property, 'O valor máximo do imóvel nesta simulação é de 50 milhões');
        if (this._property.validity.rangeUnderflow) this._setError(this._property, 'Não existe imóvel negativo');

        if (this._rate.validity.rangeUnderflow) this._setError(this._rate, 'O valor da taxa de juros cobrada deve ser maior do que ZERO.');
        if (this._rate.validity.valueMissing) this._setError(this._rate, 'Qual o valor da taxa de juros cobrada?');

        if (this._term.validity.rangeOverflow) this._setError(this._term, 'Para o seu bem, não seja um DEVEDOR por mais de 420 meses (35 anos!)');
        if (this._term.validity.rangeUnderflow) this._setError(this._term, 'O prazo mínimo do financiamento é de 60 meses (5 anos).');
        if (this._term.validity.valueMissing) this._setError(this._term, 'Qual o prazo de financiamento?');
    }

    _SendEmail() {
        this._emailService._to = ""
        let resultadoEnvioEmail = this._emailService._sendEmail();

        if(!resultadoEnvioEmail)
            throw new Error('Destinatário vazio')
    }

    _setError(component, message) {
        component.focus();
        throw new Error(message);
    }

    _setPerson() {
        this._pessoa._nome = this._formNome.value;
        this._pessoa._cpf = this._formCpf.value;
        this._pessoa._email = this._formEmail.value;
        this._pessoa._telefone = this._formTelefone.value;
    }

    _setModel() {
        this._financing.property = this._property.value
        this._financing.rate = this._rate.value;
        this._financing.term = this._term.value;
        this._financing.calculate();
    }
}