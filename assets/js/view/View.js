class View {

    currency(value) {
        return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }

    percent(value) {
        return (value / 100).toLocaleString('pt-br', { style: 'percent', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    update(model) {
        throw new Error('Method must be implemented.')
    }

}