enum ConfigModelTypes {
    CENTER,
    RIGHT
}

type ConfigModelInputProps = {
    props: object;
    tag?: string;
}

class ConfigModelInput {
    obj: HTMLElement;
    status = false;
    constructor({props, tag}:ConfigModelInputProps){
        this.obj = new TAG_HTML(tag ? tag : "input").props(props).obj
    }
}

type ConfigModelConnection = {
    endpoint: string;
    method: string;
}

type ConfigModelProps = {
    conn: ConfigModelConnection;
    type: ConfigModelTypes;
    title: string;
    inputs: ConfigModelInput[];
}

class ConfigModel {
    conn: ConfigModelConnection;
    type: ConfigModelTypes;
    title: string;
    inputs: ConfigModelInput[];
    constructor({conn, type, title, inputs}: ConfigModelProps){
        this.conn = conn
        this.type = type
        this.title = title,
        this.inputs = inputs
    }
};


class Model {
    settings: ConfigModel;
    max_inputs = 9;
    container: HTMLElement;
    container_inputs = new TAG_HTML("main").obj;
    obj: HTMLElement;
    _type: string;
    inputs: HTMLElement[] = [];

    header = new TAG_HTML("header").obj;
    footer = new TAG_HTML("footer").obj;
    btn_close = new TAG_HTML("button").id("btn-close").props({textContent: "Cancella"}).obj;
    btn_send = new TAG_HTML("button").id("btn-send").props({textContent: "Conferma"}).obj;


    constructor(settings:ConfigModelProps){
        this.settings = new ConfigModel(settings);
        
        switch(this.settings.type){
            case ConfigModelTypes.RIGHT: this._type = "right";break;
            case ConfigModelTypes.CENTER: this._type="center";break;
        }

        this.container = this.createSfondo();
        this.obj = this.createModel();

        this.getEvents();
        //this.close(true, 1000 * 60)
    }

    createSfondo():HTMLElement{
        const container = new TAG_HTML("div")
            .id("sfondo-model-"+this._type)
            .class(["sfondo-model"]).obj;
        
        switch(this._type){
            case "right": container.append(new TAG_HTML("div").obj); break;
            case "center": break;
        }
        

        
        return container;
    }

     createModel():HTMLElement{
        const container = new TAG_HTML("form").id("container-model").obj;
        const model = new TAG_HTML("div")
             .id("model-"+this._type)
             .class(["model"]).obj;

        container.append(model);
        this.container.append(container);
        this.configModel(model);

        document.body.prepend(this.container);
        return model;
     }

    configModel(model:HTMLElement){
        const title = new TAG_HTML("h1").props({textContent: this.settings.title}).obj;
        this.header.append(title);
        this.loadInputs();
        this.createBtns();

        model.append(this.header, this.container_inputs, this.footer);
    }

    loadInputs(){
        const boxies = []
        for(let i = 0; i < this.max_inputs; i++){
            const box = new TAG_HTML("div").class(["model-input-box"]).obj;
            this.container_inputs.append(box);
            boxies.push(box);
        }
        const INPUTS = this.settings.inputs;
        for(let i = 0; i < INPUTS.length; i++){
            console.log(boxies[i], INPUTS[i].obj)
            const outOfRange = i >= this.max_inputs-1;
            if(outOfRange) { break; }
            this.inputs.push(INPUTS[i].obj);
            boxies[i].append(INPUTS[i].obj);
        }
    }

    createBtns(){
        const container = new TAG_HTML("div").id("model-container-btns-"+this._type).obj;
        
        container.append(this.btn_close, this.btn_send);
        this.footer.append(container);
    }

    getEvents(){
        this.btn_send.addEventListener("click", async (e)=>{
            e.preventDefault()
            const body: Record<string, unknown> = {};
            
            for(const input of this.inputs as HTMLInputElement[]){ body[input.name] = input.value }

            console.log(this.settings)
            const conn = this.settings.conn
            let res = await fetch(conn.endpoint, {
                method: conn.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
            if(res.status == 200){
                new Popup({
                    type:"right",
                    text: "Cliente Aggiunto",
                    status: ConfigPopupStatus.OK
                })
                console.log("UTENTE AGGIUNTO: "+await res.json())
            }
        });
        this.btn_close.addEventListener("click", (e)=>{e.preventDefault();this.close(false)});
    }

    close(background=true, timeout=3000){
        if(background) { 
            setTimeout(()=>this.container.remove(), timeout);
            return;
        }   
        this.container.remove();
    }
}
