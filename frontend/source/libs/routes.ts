class Routes {
    main = SELECT.one("#page");
    db = new MyDB()

    init(_class: string){
        this.main.className = "";
        this.main.innerHTML = "";
        this.main.classList.add(_class);
    }

    async dashboard(){
        this.init("page-listino");
        const [s1, s2] = ["section", "section"].map((e:string)=>new TAG_HTML(e).obj);
        this.main.append(s1, s2);
        s1.id = "home-section1"

        //*QUERY DB
        await this.db.ready;
        const storehouse = this.db.tables.storehouse as StoreHouse;
        const materials = storehouse.materials;
        const products = storehouse.products;
        console.log(this.db.tables)

        const customers = this.db.tables.customers as ItemCustomer[];
        const orders = this.db.tables.orders as ItemOrder[];
    
        //* Filters
        const options_customers = customers
            .map((e:ItemCustomer)=>new Option(e.name, String(e.id)));
        
        const options_products = products
            .filter((e:ItemStoreHouseMaterial)=>!e.blocked)
            .map((e:ItemOrder)=>new Option(e.name, String(e.id)));

        const names_material = new Set<string>();
        storehouse.materials.filter((e:ItemStoreHouseMaterial)=>names_material.add(e.name))
        const options_materials = Array.from(names_material).map((e:string, i:number)=>new Option(e, String(i)))
        

        //*DATA CARDS
        const cards = [
            {
                title: "Magazzino", 
                content: String(materials.length), 
                form: {
                    conn:{ endpoint: "/db/storehouse/add", method: "POST" },
                    title: "Aggiungi item",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new ConfigModelInput({
                            label:"Nome Prodotto", 
                            tag: "select",
                            options: options_materials,
                            props: {
                                name:"name",
                            }
                        }),
                        new ConfigModelInput({
                            label:"Bloccato",
                            tag: "select",
                            options: [new Option("Bloccato", "true"), new Option("Disponibile", "false")],
                            props: {
                                placeholder:"Quantita",
                                name:"quantity",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Quantita",
                                name:"quantity",
                            }
                        }),
                    ]
                }
            },
            {
                title: "Ordini", 
                content: String(orders.length), 
                form: {
                    conn:{ endpoint: "/db/orders/add", method: "POST" },
                    title: "Aggiungi ordine",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new ConfigModelInput({
                            props: {
                                placeholder:"Nome Ordine", 
                                name:"name",
                            }
                        }),
                        new ConfigModelInput({
                            label:"Cliente",
                            tag: "select",
                            options: options_customers,
                            props: {
                                name:"customer",
                            }
                        }),
                        new ConfigModelInput({
                            label:"Prodotto",
                            tag: "select",
                            options: options_products,
                            props: {
                                name:"material",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Quantita",
                                name:"quantity",
                            }
                        }),
                        new ConfigModelInput({
                            label:"Status",
                            tag: "select",
                            options: [new Option("Attesa", "0"), new Option("Working", "1")],
                            props: {
                                name:"description",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Descrizione",
                                name:"description",
                            }
                        }),
                    ]
                }
            },
            {
                title: "Clienti", 
                content: String(customers.length), 
                form: {
                    conn:{ endpoint: "/db/customers/add", method: "POST" },
                    title: "Aggiungi cliente",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new ConfigModelInput({
                            props: {
                                placeholder:"Nome Cliente", 
                                name:"name",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Cognome Cliente", 
                                name:"surname",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Indirizzo Cliente",
                                name:"address",
                            }
                        }),
                    ]
                }
            },
            {
                title: "null", 
                content: "", 
                note: "",
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
