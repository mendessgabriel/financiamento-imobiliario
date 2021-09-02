class Financing {

    constructor() {
        this._property = 0;
        this._propertyAvaliation = 0;
        this._initialPayment = new Number(0);
        this._fgtsMonthly = 0;
        this._rate = 0;
        this._term = 0;
        this._insurancePrice = new Number(0);
    }

    calculate() {
        this._result = [];
        this._sumInterest = 0;
        this._sumQuota = 0;

        let amortization = this.getAmortizationValue();
        let balanceDue = this.getFinancingValue();

        for (let quota = 1; quota <= this._term; quota++) {
            let atualBalanceDue = balanceDue - quota * amortization;
            let atualInterest = (balanceDue - (quota - 1) * amortization) * this.getRateMonthly() / 100;
            let quotaValue = amortization + atualInterest + this._insurancePrice;

            this._result.push({
                'quota': quota,
                'quotaValue': quotaValue,
                'interest': atualInterest,
                'amortization': amortization,
                'balanceDue': atualBalanceDue
            });

            this._sumInterest += atualInterest;
            this._sumQuota += quotaValue;
        }
    }

    getFinancingValue() {
        return (this._property && this._initialPayment)
            ? new Number(this._property - this._initialPayment)
            : 0;
    }

    getAmortizationValue() {
        return (this.getFinancingValue() && this._term)
            ? new Number(this.getFinancingValue() / this._term)
            : 0;
    }

    getRateMonthly() {
        return this._rate
            ? new Number((1 + this._rate / 100) ** (1 / 12) - 1) * 100
            : null;
    }

    set property(value) { this._property = value; }
    set propertyAvaliation(value) { this._propertyAvaliation = value; }
    set fgtsMonthly(value) { this._fgtsMonthly = value; }
    set rate(value) { this._rate = value; }
    set term(value) { this._term = value; }
    set insurancePrice(value) { this._insurancePrice = new Number(value); }

    get property() { return this._property; }
    get propertyAvaliation() { return this._propertyAvaliation; }
    get fgtsMonthly() { return this._fgtsMonthly; }
    get rate() { return this._rate; }
    get term() { return this._term; }
    get insurancePrice() { return new Number(this._insurancePrice); }

    get result() { return this._result; }
    get sumInterest() { return this._sumInterest; }
    get sumQuota() { return this._sumQuota; }
    get sumInsurancePrice() { return this._insurancePrice * this._term; }
    get sumPay() { return this.sumQuota; }
}