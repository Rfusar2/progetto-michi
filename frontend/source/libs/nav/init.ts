type ColorSchema = "light" | "dark";

class Navbar {
    obj = SELECT.one("#nav");
    btns: HTMLElement[];
    colorschema: ColorSchema = "dark";


    constructor(){
        const [s1, s2] = ["section", "section"].map((e:string)=>new TAG_HTML(e).class(["navbar-section"]).attr({colorschema: "dark"}).obj)
        this.obj.append(s1, s2);

        this.btns = ["settings", "colorschema", "logout"].map((e:string)=>this.init_btn(e).attr({colorschema:"dark"}).obj);
        const container_btns = new TAG_HTML("div").id("container-btns-navbar").obj
        container_btns.append(...this.btns);
        s1.append(container_btns);
        
        this.get_events();
    }

    get_events(){
        this.btns[1].addEventListener("click", ()=>{
            const colorschema = this.btns[1].dataset.colorschema == "dark" ? "light" : "dark";
            //SELECT.one("#data-colorschema")!.setAttribute("colorschema", colorschema);

            for(const e of SELECT.all("[data-colorschema]")){ e.dataset.colorschema = colorschema;}//isDark?"dark":"light";}
        })
    }

    //TODO inizializzare btn
    init_btn(type:string):TAG_HTML{
        switch(type){
            case "settings": return new TAG_HTML("i").class(["btn", "fa-solid","fa-gears"]);
            case "colorschema": return new TAG_HTML("i").class(["btn", "fa-solid","fa-circle-half-stroke"]);
            case "logout": return new TAG_HTML("i").class(["btn", "fa-solid","fa-arrow-right-from-bracket"]);
            default: return new TAG_HTML("i");
        }
    }

}


new Navbar();
