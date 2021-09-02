class MessageView extends View {

    constructor() {
        super();
        this._component = document.querySelector('#alertMessage');
    }

    update(model) {
        if (!model) {
            this._component.style.display = "none";
            return;
        }

        let classList = this._component.classList
        while (classList.length > 0) {
            classList.remove(classList.item(0));
        }

        this._component.classList.add('alert', model.alert.clazz);
        this._component.textContent = model.message;

        this._component.style.display = "block";
    }

}