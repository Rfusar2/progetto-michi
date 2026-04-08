type ConfigInputEvent = {
    type: string;
    func: ()=>void;
}
type ConfigInputChoices = {
    conn: Promise<void>;
    name_column: string;
}
type ConfigInputProps = {
    props?: object;
    tag?: string;
    options?: HTMLOptionElement[];
    label: string;
    event?: ConfigModelInputEvent;
    regex?: RegExp;
    choices?: ConfigInputChoices; 
    classes?: string[]
    value?: string;
}

class MyInput {
    obj = new TAG_HTML("div").obj;
    tag: string;
    input: HTMLInputElement;
    label: HTMLElement;

    constructor({props, tag, options, label, event, regex, choices, classes, value}:ConfigModelInputProps){
        this.tag = tag ? tag : "input"
        this.input = new TAG_HTML(this.tag).class(["input"]).props(props).obj
        this.label = new TAG_HTML("label").class(["label"]).props({textContent: label}).obj
        this.obj.classList.add(`container-${this.tag}`)
        this.obj.append(this.label, this.input)
        this.input.value = value ? value : ""
        this.valid = true

        switch(tag){
            case "select": 
                if(options) {this.input.append(...options);} break; 
        }

        if (classes){ this.input.classList.add(...classes) }
        if(event){ this.input.addEventListener(event.type, event.func) }

        //*PULIZIA
        this.input.addEventListener("blur", ()=>{
            this.input.value = this.input.value.trim()
        })

        if(regex){
            this.input.addEventListener("blur", ()=>{
                const correct = regex.test(this.input.value);
                const color = correct ? SELECT.style("--light-blue") : "red";
                this.input.style.borderBottom = "1px solid "+color;
                this.valid = correct
                if(!correct){
                    new Popup({
                        type: "right",
                        text: `CAMPO: ${this.label.textContent} non valido`,
                        status: ConfigPopupStatus.KO
                    })
                }
            })
        }


        if(choices){ this.load(choices) }

    }

    async load(choices:ConfigInputChoices):HTMLElement[]{
        const data = await choices.conn()
        const texts = new Map<string, int>();
        data.map((e:any)=>texts.set(e[choices.name_column], e.id))
        const options = Array.from(texts).map(([text, id])=>new Option(text, String(id)))
        this.input.append(...options)
    }

    //labelEvent(){
    //    this.input.addEventListener("focus", ()=> this.label.style.transform = "scale(80%)")
    //    this.input.addEventListener("blur", ()=> this.label.style.transform = "scale(100%)")

    //}
}
