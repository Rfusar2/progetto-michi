enum ConfigModelTypes {
    CENTER,
    RIGHT
}

type ConfigModelProps = {
    conn?: (data:object)=>Promise<void>;
    type: ConfigModelTypes;
    title?: string;
    inputs?: MyInput[];
    load?: Promise<void>;
}

class Model {
    max_inputs = 9;
    type: ConfigModelProps;

    conn: (data:object)=>Promise<void>;
    style: string[] = ["center", "right"]

    background =  new TAG_HTML("div").id("sfondo-model-"+this._type).class(["sfondo-model"]).obj;
    container = new TAG_HTML("form").id("container-model").obj;
    obj = new TAG_HTML("div").id("model-"+this._type).class(["model"]).obj;
    
    eInputs: HTMLElement[] = [];
    inputs: MyInput[] = [];

    header = new TAG_HTML("header").obj;
    container_inputs = new TAG_HTML("main").obj;
    footer = new TAG_HTML("footer").obj;

    btn_close = new TAG_HTML("button").id("btn-close").props({textContent: "Cancella"}).obj;
    btn_send = new TAG_HTML("button").id("btn-send").props({textContent: "Conferma"}).obj;


    constructor({conn, type, title, inputs, load}:ConfigModelProps){
        this.conn = conn
        this.type = type
        this.inputs = inputs
        const style = this.style[type]

        this.background =  new TAG_HTML("div").id("sfondo-model-"+style).class(["sfondo-model"]).obj;
        this.obj = new TAG_HTML("div").id("model-"+style).class(["model"]).obj;

        this.background.append(this.container);
        this.container.append(this.obj);
        this.obj.append(this.header, this.container_inputs, this.footer)

        //LAYOUT
        switch(type){
            case ConfigModelTypes.RIGHT: this.background.append(new TAG_HTML("div").obj); break;
            case ConfigModelTypes.CENTER: break;
        }

        this.header.append(new TAG_HTML("h1").props({textContent: title}).obj);
        this.loadInputs();


        const container = new TAG_HTML("div").id("model-container-btns-"+style).obj;
        container.append(this.btn_close, this.btn_send);
        this.footer.append(container);
        
        document.body.prepend(this.background);
        
        this.getEvents();
        //this.close(true, 1000 * 60)
    }

    loadInputs(){
        const boxies = []
        for(let i = 0; i < this.max_inputs; i++){
            const box = new TAG_HTML("div").class(["model-input-box"]).obj;
            this.container_inputs.append(box);
            boxies.push(box);
        }
        for(let i = 0; i < this.inputs.length; i++){
            const outOfRange = i >= this.max_inputs-1;
            if(outOfRange) { break; }
            this.eInputs.push(this.inputs[i].input);
            boxies[i].append(this.inputs[i].obj);
        }
    }

    getEvents(){
        this.btn_send.addEventListener("click", async(e)=>{
            e.preventDefault()
            this.conn(this.inputs)
        });

        this.btn_close.addEventListener("click", (e)=>{e.preventDefault();this.background.remove()});
    }
}
