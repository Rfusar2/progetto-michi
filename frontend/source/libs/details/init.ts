type ConfigCardDetailsSection = {
    title: string;
    inputs: MyInput[];
}

type ConfigCardDetailsProps = {
    parent: HTMLElement;
    title: string;
    conn: Primise<void>;
    sections: ConfigCardDetailsSection[];
}

class CardDetails {
    obj = new TAG_HTML("form").id("card-details-customer").obj;
    header = new TAG_HTML("header").obj;
    main = new TAG_HTML("main").obj;
    footer = new TAG_HTML("footer").obj;
    inputs: MyInput[] = [];
    btn_modify = new TAG_HTML("button").id("btn-send").class(["btn"]).props({textContent: "Invia"}).obj;
    conn: Primise<void>;

    constructor({parent, title, sections, conn}: ConfigCardDetailsProps){
        this.obj.append(this.header, this.main, this.footer)
        parent.append(this.obj)

        const [h_box1, h_box2] = ["div", "div"].map((e:string)=>new TAG_HTML(e).obj)
        this.header.append(h_box1, h_box2)

        const h1 = new TAG_HTML("h1").props({textContent: title}).obj
        h_box1.append(h1)

        for(const s of sections){
            const container = new TAG_HTML("section").obj
            const [b1, b2] = ["div", "div"].map((e:string)=>new TAG_HTML(e).obj)
            container.append(b1, b2)
            this.main.append(container)
            
            b1.append(
                new TAG_HTML("h2").props({textContent: s.title}).obj
            )

            b2.classList.add("card-details-container-inputs")
            for(const input of s.inputs){ 
                this.inputs.push(input)
                const wrap = new TAG_HTML("div").obj
                wrap.append(input.obj)
                b2.append(wrap) 
            }
        }

        this.footer.append(this.btn_modify)
        this.btn_modify.addEventListener("click", async (e)=> await conn(e, this.inputs))
        
    }
}
