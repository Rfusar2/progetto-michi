type RouteName = "home" | "models" | "table"

class Routes {
    main = SELECT.one("#page");

    init(_class: string){
        this.main.className = "";
        this.main.innerHTML = "";
        this.main.classList.add(_class);
    }

    listino(){
        this.init("page-listino");
        const [s1, s2] = ["section", "section"].map((e:string)=>new TAG_HTML(e).obj);
        this.main.append(s1, s2);
        s1.id = "home-section1"

        const cards = [
            {title: "Totale Magazzino", content: "5", note: "apr-mag"},
            {title: "Totale Ordini",    content: "5", note: "apr-mag"},
            {title: "Totale Clienti",   content: "5", note: "apr-mag"},
            {title: "Totale Clienti",   content: "5", note: "apr-mag"},
        ];

        for(let i = 0; i < cards.length; i++){
            const card = cards[i];
            const view = i < 2
            new Card({
                parent: s1,
                title: card.title,
                style: ConfigCardStyle.PRIMARY,
                content: card.content,
                note: card.note,
                view: view,
            })
        }
        
        

    }
    magazzino(){
        this.init("page-magazzino");
    }   
    ordini(){
        this.init("page-ordini");
    }
}
