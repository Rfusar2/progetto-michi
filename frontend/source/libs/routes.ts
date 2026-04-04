class Routes {
    main = SELECT.one("#page");
    db = new MyDB()

    init(_class: string){
        this.main.className = "";
        this.main.innerHTML = "";
        this.main.classList.add(_class);
    }

    async home(){
        this.init("page-listino");
        const [s1, s2] = ["section", "section"].map((e:string)=>new TAG_HTML(e).obj);
        this.main.append(s1, s2);
        s1.id = "home-section1"

        //*QUERY DB
        await this.db.ready;
        const orders = this.db.tables.orders;
        const materials = this.db.tables.storehouse.materials;
        const customers = this.db.tables.customers;

        const i1 = new ConfigModelInput({name:"artcode"});
        const i2 = new ConfigModelInput({name:"artcode"});
        const i3 = new ConfigModelInput({name:"artcode"});

        //*DATA ELEMENT
        const cards = [
            {
                title: "Magazzino", 
                content: String(materials.length), 
                note: "apr-mag",
                form: {
                    endpoint: "#",
                    title: "Aggiungi item",
                    model: ConfigModelTypes.CENTER,
                    inputs:[i1, i2, i3]
                }
            },
            {
                title: "Ordini", 
                content: String(orders.length), 
                note: "apr-mag",
                form: {
                    endpoint: "#",
                    title: "Aggiungi ordine",
                    model: ConfigModelTypes.CENTER,
                    inputs:[i1, i1]
                }
            },
            {
                title: "Clienti", 
                content: String(customers.length), 
                note: "apr-mag",
                form: {
                    endpoint: "#",
                    title: "Aggiungi cliente",
                    model: ConfigModelTypes.CENTER,
                    inputs:[i1, i1]
                }
            },
            {
                title: "Clienti", 
                content: String(materials.length), 
                note: "apr-mag",
                form: {
                    endpoint: "#",
                    title: "Aggiungi cliente",
                    model: ConfigModelTypes.CENTER,
                    inputs:[i1, i1]
                }
            },
        ];

        //TOSCREEN
        for(let i = 0; i < cards.length; i++){
            const card = cards[i];
            const view = i < 3
            new Card({
                parent: s1,
                title: card.title,
                style: ConfigCardStyle.PRIMARY,
                content: card.content,
                note: card.note,
                view: view,
                form: card.form
            })
        }
    }
    progetti(){
        this.init("page-projects");
    }   
}
