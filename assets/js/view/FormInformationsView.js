class FormInformationsView extends View {

    constructor() {
        super();
        this._component = document.querySelector('#formInformationsView');
    }

    update(model) {
        let financingValue = model.getFinancingValue();
        let amortizationValue = model.getAmortizationValue();
        let rateMonthly = model.getRateMonthly();
        let firstInterestRate = model.result[0].interest;
        let firstQuota = model.result[0].quotaValue;

        this._component.innerHTML =
            `
            ${this._getInfo('Valor financiado:', `${financingValue ? this.currency(financingValue) : `-`}`)}
            ${this._getInfo('Taxa de Juros Mensal:', `${rateMonthly ? `${this.percent(rateMonthly)}` : `-`}`)}
            ${this._getInfo('Amortização mensal:', `${amortizationValue ? `${this.currency(amortizationValue)}` : `-`}`)}
            ${this._getInfo('Juros da 1ºparcela:', `${firstInterestRate ? `${this.currency(firstInterestRate)}` : `-`}`)}
            ${this._getInfo('Valor da 1º parcela:', `${firstQuota ? `${this.currency(firstQuota)}` : ` - `}`)}
            `;
    }

    _getInfo(text, value) {
        return `
            <div class="card-item">
                <img src="./assets/img/tick.png"
                alt="icon check" width="15" height="15" />
                <span class="p-form">${text}</span>
                <span class="font-weight-bold">${value}</span>
            </div>
        `;
    }

}