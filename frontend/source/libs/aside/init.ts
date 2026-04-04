type AsideItem = {
    text: string;
    href: string;
}

const LINKS_ASIDE: AsideItem[] = [
    {text: "Listino", href: "#",},
    {text: "Magazzino", href: "#",},
    {text: "Ordini", href: "#",},
] 


class Sidebar{
    items = LINKS_ASIDE;
    routes = new Routes();
    obj = SELECT.one("#sidebar");
    header = SELECT.one("header");
    list_items = SELECT.one("#container-aside-items");
    container_list_items: HTMLElement;
    item_type: Node;

    constructor(){
        this.container_list_items = this.obj.querySelector("section") as HTMLElement;

        this.getHeader();

        const item_type = SELECT.one(".aside-item");
        this.item_type = item_type.cloneNode(true);
        item_type.remove();

        this.init_items();
        
        //this.getLogout()
        this.setRoutes();
    }
    
    getHeader(){
        const container_logo = new TAG_HTML("div").id("container-logo").obj;
        const logo = new TAG_HTML("img").obj;
        //logo.alt = "Logo"
        container_logo.append(logo);
        const divider = new TAG_HTML("div").class(["divider"]).obj;

        this.header.append(container_logo, divider);
        
    }
    init_items(){
        for(const item of this.items){
            const element = this.item_type.cloneNode(true) as HTMLElement;
            this.style(element);

            const link = element.querySelector("a") as HTMLAnchorElement;
            link.textContent = item.text;
            link.href = item.href;

            this.list_items.append(element);
        }
    }
    
    setRoutes(){
        const routes_names = this.items.filter((item)=>item.href=="#").map(e=>e.text);
        for(const item of this.list_items.childNodes){
            item.addEventListener("click", ()=>{
                const route = item.textContent!.replaceAll(" ", "").toLowerCase().trim() as RouteName
                this.routes[route]()
            });
        }
    }
    style(e:HTMLElement){
        e.addEventListener("mouseover", ()=>{
            const circle = e.querySelector(".circle") as HTMLElement
            const link = e.querySelector("a") as HTMLAnchorElement

            circle.style.background = SELECT.style("--light-blue");
            link.style.transform = "translateX(5px)";
        })
        e.addEventListener("mouseout", ()=>{
            const circle = e.querySelector(".circle") as HTMLElement
            const link = e.querySelector("a") as HTMLAnchorElement
            circle.style.background = "transparent";
            link.style.transform = "translateX(0)";
        })

        e.addEventListener("click", ()=>{
            for(const item of SELECT.all(".aside-item")){
                item.setAttribute("active", "false");
            }
            e.setAttribute("active", "true");
        })
    }
}

new Sidebar()
