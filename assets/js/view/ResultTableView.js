class ResultTableView extends View {

    constructor() {
        super();
        this._resultTableTBody = document.getElementById('resultTableTBody');
    }

    update(model) {
        this._resultTableTBody.innerHTML = '';

        model.result.forEach(item => {
            let tr = document.createElement('tr');
    
            let quotaTH = document.createElement('th');
            quotaTH.setAttribute('scope', 'row');
            quotaTH.textContent = item.quota;
    
            let quotaValueTD = this._createTD(this.currency(item.quotaValue));
            let interestTD = this._createTD(this.currency(item.interest));
            let amortizationTD = this._createTD(this.currency(item.amortization));
            let balanceDueTD = this._createTD(this.currency(item.balanceDue));
    
            tr.appendChild(quotaTH);
            tr.appendChild(quotaValueTD);
            tr.appendChild(interestTD);
            tr.appendChild(amortizationTD);
            tr.appendChild(balanceDueTD);
    
            this._resultTableTBody.appendChild(tr);
        });
    }

    _createTD(value) {
        let td = document.createElement('td');
        td.textContent = value;

        return td;
    }
}