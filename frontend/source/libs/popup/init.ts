enum ConfigPopupStatus {
    OK,
    KO
}

type ConfigPopupProps = {
    type: string;
    text: string;
    status: ConfigPopupStatus;
}

class ConfigPopup {
    type: string;
    text: string;
    status: ConfigPopupStatus;

    constructor({ type, text, status }: ConfigPopupProps) {
        this.type = type;
        this.text = text;
        this.status = status;
    }
}


class Popup {
    settings: ConfigPopupProps;
    container = new TAG_HTML("div").id("sfondo-popup").obj;

    constructor(settings: ConfigPopupProps){
        this.settings = new ConfigPopup(settings);

        const popup = new TAG_HTML("main")
            .id("popup-"+this.settings.type)
            .class(["popup"]).obj;
        
        const span = new TAG_HTML("span").obj;

        switch(this.settings.status){
            case ConfigPopupStatus.OK: span.id = "popup-message-ok"; break;
            case ConfigPopupStatus.KO: span.id = "popup-message-ko"; break;
        }

        span.textContent = this.settings.text;
        popup.append(span);

        this.container.prepend(popup);
        document.body.prepend(this.container);

        setTimeout(()=>{ this.container.remove() }, 4000);
    }
}
