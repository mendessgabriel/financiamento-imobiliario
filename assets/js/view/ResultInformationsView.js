class ResultInformationsView extends View {

    constructor() {
        super();
        this._resultInformations = document.getElementById('resultInformations');
    }

    update(model) {
        let rent = model.result[0].quotaValue / 2;
        let rentingMoney = model.initialPayment;
        let halfTerm = model.term / 2;

        for (let index = 0; index < halfTerm; index++) {
            rentingMoney += model.result[0].quotaValue - rent;
        }

        this._resultInformations.innerHTML =
            `
            ${this._getInfo('Total pago:', `${this.currency(model.sumPay)}`)}
            ${this._getInfo('- Total dos juros:', `${this.currency(model.sumInterest)}`)}
            ${this._getInfo('- Total dos Seguros + Tarifas:', `${this.currency(model.sumInsurancePrice)}`)}
            `
    }

    // ${this._getDangerInfo(`O valor total pago é ${(model.sumPay / model.property).toFixed(1)}x maior do que o valor do imóvel.`)}
    // ${this._getDangerInfo(`Alugando um imóvel por ${this.currency(rent)}, e economizando o restando do dinheiro pago nas parcelas,
    //                         em ${halfTerm} meses você teria acumulado ${this.currency(rentingMoney)}`)}

    _getInfo(text, value) {
        return `
            <p class="text-left"><span class="text-info">${text}</span> <span class="font-weight-bold">${value}</span></p>
        `;
    }

    // _getDangerInfo(text) {
    //     return `
    //     <p class="text-danger font-weight-bold text-justify">${text}.</p>
    //     `
    // }
}