enum ConfigCardStyle {
    PRIMARY,
    ERROR,
    SUCCESS
}

type ConfigCardForm = {
    endpoint: string;
    title: string;
    model: ConfigModelTypes;
    inputs: ConfigModelInput[]
}

type ConfigCardProps = {
    parent: HTMLElement;
    title: string;
    style: ConfigCardStyle;
    content: string;
    note?: string;
    view: boolean;
    form?: ConfigCardForm;
}

class Card {
    parent: HTMLElement;
    obj = new TAG_HTML("div").class(["card", "card-details"]).attr({colorschema:"dark"}).obj;
    btn_add = new TAG_HTML("button").class(["btn", "btn-primary", "btn-card-add"]).props({textContent: "+"}).obj;
    btn_change_pag = new TAG_HTML("button").class(["btn", "btn-warning", "btn-card-changepage"]).props({textContent: "?"}).obj;
    
    title: string;
    style: ConfigCardStyle;
    content: string;
    note: string | undefined;
    form: ConfigCardForm | undefined;

    constructor({parent, title, style, content, note, view, form}: ConfigCardProps){
        this.parent = parent;
        this.parent.append(this.obj);
        this.obj.style.visibility = view ? "visible" : "hidden"
        this.title = title;
        this.style = style;
        this.content = content;
        this.note = note;
        this.form = form;

        this.init();
        this.getEvents();
    }

    init(){
        const [header, main, footer] = [ "header", "main", "footer"].map((e:string)=>new TAG_HTML(e).obj)
        const title = new TAG_HTML("span").class(["card-details-title"]).props({textContent: this.title}).attr({colorschema:"dark"}).obj
        header.append(title, this.btn_add);
        
        const main_containers = ["div", "div"].map((e:string)=>new TAG_HTML(e).obj);
        main_containers[1].append(
            new TAG_HTML("span").class(["card-details-content"]).props({textContent: this.content}).attr({colorschema:"dark"}).obj
        )
        main.append(...main_containers);
        
        if(this.note){
            const note = new TAG_HTML("span").class(["card-details-note"]).props({textContent: this.note}).attr({colorschema:"dark"}).obj;
            footer.append(note);
        }
        footer.append(this.btn_change_pag);

        this.obj.append(header, main, footer);
    }

    getEvents(){
        if(this.form){
            this.btn_add.addEventListener("click", ()=>{
                new Model({
                    type: this.form!.model,
                    title: this.form!.title,
                    inputs: this.form!.inputs
                })
            })
        }
    }
}
