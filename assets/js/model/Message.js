class Message {

    constructor(text, alert) {
        this._message = text;
        this._alert = alert;
    }

    get alert() { return this._alert; }
    get message() { return this._message;}

    static get DANGER() { return { clazz: "alert-danger" }; };
    static get SUCCESS() { return { clazz: "alert-success" }; };
}