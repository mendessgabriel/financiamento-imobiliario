class EmailService {

    constructor() {
        this._from = ""
        this._to = ""
        this._assunto = "ASSUNTO DO EMAIL"
        this._corpo = "CORPO DO EMAIL"
    }

    log() {
        let email = { de: this._from, para: this._to, assunto: this._assunto, corpo: this._corpo }
        console.table(email);
    }

    _sendEmail() {
        if (this._to === "") {
            return false;
        }

        // try {
        //     Email.send({
        //         Host: "smtp.yourisp.com", <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //         Username: "simulador de financiamento", <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //         Password: "password", <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
        //         To: this._to,
        //         From: this._from,
        //         Subject: this._assunto,
        //         Body: this._corpo
        //     }).then(message => {
        //         alert(message);
        //         return true;
        //     }
        //     );
        // } catch (err) {
        //     throw new Error(err);
        // }
    }
}