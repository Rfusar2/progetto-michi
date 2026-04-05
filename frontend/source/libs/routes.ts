class Routes {
    main = SELECT.one("#page");
    db = DATABASE

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

        const customers = this.db.tables.customers as ItemCustomer[];
        const orders = this.db.tables.orders as ItemOrder[];
    
        //* Filters
        const options_customers = customers
            .map((e:ItemCustomer)=>new Option(e.name, String(e.id)));
        
        const options_products = products
            .map((e:ItemStoreHouseProduct)=>new Option(e.name, String(e.id)));

        const map = new Map<number, { name: string; id: number }>();
        storehouse.materials.forEach((e: ItemStoreHouseMaterial) => { map.set(e.id, { name: e.name, id: e.id });});
        const options_materials = Array.from(map.values()).map((e) => new Option(e.name, String(e.id)));

        let n_materials = 0
        materials.forEach((e:ItemStoreHouseMaterial)=>n_materials+=e.free)
        

        //*DATA CARDS
        const cards = [
            {
                title: "Materiali disponibili", 
                content: String(n_materials), 
                router: "materiali",
                form: {
                    conn: async (data)=>{
                        const isNew = data[1].value!="";
                        const body = {
                            id: isNew ? -1 : Number(data[0].value),
                            name: isNew ? data[1].value : data[0].selectedOptions[0].text,
                            free: Number(data[2].value),
                            blocked: 0,
                        }
                        //console.log("OBJECT", body)

                        let res = await fetch("/db/storehouse/materials/add", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        })

                        if(res.status == 200){
                            new Popup({type:"right", text: "Materiale Aggiunto", status: ConfigPopupStatus.OK })
                            console.log(await res.json())
                        }
                        else {
                            new Popup({type:"right", text: "Materiale Non Aggiunto", status: ConfigPopupStatus.KO })
                            console.log("Materiale Aggiunto: "+await res.text())
                        }
                    },
                    title: "Aggiungi item",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new ConfigModelInput({
                            label:"Nome Materiale",
                            tag: "select",
                            options: options_materials,
                            props: {
                                name:"name",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Nuovo Materiale ?",
                                name:"new-material",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Quantita",
                                name:"free",
                                type: "number",
                            }
                        }),
                    ]
                }
            },
            {
                title: "Prodotti", 
                content: String(options_products.length), 
                router: "prodotti",
                form: {
                    conn: async (data)=>{
                        const body = {
                            name: data[0].value,
                            materials: data[2].value.split(";").map((e:string)=>Number(e)),
                        }
                        console.log(body)

                        //let res = await fetch("/db/storehouse/products/add", {
                        //    method: "POST",
                        //    headers: { "Content-Type": "application/json" },
                        //    body: JSON.stringify(body)
                        //})

                        //if(res.status == 200){
                        //    new Popup({type:"right", text: "Prodotto Aggiunto", status: ConfigPopupStatus.OK })
                        //    console.log(await res.json())
                        //}
                        //else {
                        //    new Popup({type:"right", text: "Prodotto Non Aggiunto", status: ConfigPopupStatus.KO })
                        //    console.log("Prodotto Non Aggiunto: "+await res.text())
                        //}
                    },
                    title: "Aggiungi cliente",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new ConfigModelInput({
                            props: {
                                placeholder:"Nome prodotto", 
                                name:"name",
                            }
                        }),
                        new ConfigModelInput({
                            tag: "select",
                            options: options_materials,
                            label: "materiale",
                            event: {
                                type: "change",
                                func: (e)=>{
                                    const input = e.currentTarget;
                                    const list_materials = SELECT.one("#list-materials");
                                    list_materials.value += input.value+";"
                                },
                                
                            },
                            props: {
                                placeholder:"Matriali...",
                                name:"materials",
                            }
                        }),
                        new ConfigModelInput({
                            props: {
                                placeholder:"Matriali...",
                                name:"materials",
                                id: "list-materials"
                            }
                        }),
                    ]
                }
            },
            {
                title: "Ordini", 
                content: String(orders.length), 
                router: "ordini",
                form: {
                    //TODO da finire
                    conn: async (data)=>{
                        const isNew = data[1].value!="";
                        const body = {
                        }
                        console.log(data)

                        //let res = await fetch("/db/orders/add", {
                        //    method: "POST",
                        //    headers: { "Content-Type": "application/json" },
                        //    body: JSON.stringify(body)
                        //})

                        //if(res.status == 200){
                        //    new Popup({type:"right", text: "Materiale Aggiunto", status: ConfigPopupStatus.OK })
                        //    console.log(await res.json())
                        //}
                        //else {
                        //    new Popup({type:"right", text: "Materiale Non Aggiunto", status: ConfigPopupStatus.KO })
                        //    console.log("Materiale Aggiunto: "+await res.text())
                        //}
                    },
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
                router: "clienti",
                form: {
                    conn: async (data)=>{
                        const body = {
                            name: data[0].value,
                            surname: data[1].value,
                            address: data[2].value,
                        }

                        let res = await fetch("/db/customers/add", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        })

                        if(res.status == 200){
                            new Popup({type:"right", text: "Cliente Aggiunto", status: ConfigPopupStatus.OK })
                            console.log(await res.json())
                        }
                        else {
                            new Popup({type:"right", text: "Cliente Non Aggiunto", status: ConfigPopupStatus.KO })
                            console.log("Materiale Non Aggiunto: "+await res.text())
                        }
                    },
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
        ];

        //TOSCREEN
        for(let i = 0; i < cards.length; i++){
            const card = cards[i];
            new Card({
                parent: s1,
                title: card.title,
                style: ConfigCardStyle.PRIMARY,
                content: card.content,
                view: true,
                form: card.form,
                router: card.router,

            })
        }
    }

    //*TABLES
    clienti(){
        this.init("page-customer");
        new Table({
            e: new TAG_HTML("table").class(["table"]).obj,
            parent: this.main,
            title: "I miei clienti",
            dimension: "large",
            style: "simple",
            tools: {n_rows:false, n_pag:false, search:false, settings:false},
            conn: async ()=>{
                let res = await fetch("/db/customers/get", {
                    method: "GET"
                })
                res = await res.json()
                return res.map((e:ItemCustomer)=>{ 
                    return {
                        name: e.name, 
                        surname: e.surname,
                        address: e.address,
                    } 
                })
            }
        })
    }
    materiali(){
        this.init("page-materials");
        new Table({
            e: new TAG_HTML("table").class(["table"]).obj,
            parent: this.main,
            title: "I miei materiali",
            dimension: "large",
            style: "simple",
            tools: {n_rows:false, n_pag:false, search:false, settings:false},
            conn: async ()=>{
                let res = await fetch("/db/storehouse/get", {
                    method: "GET"
                })
                res = await res.json()
                return res.materials.map((e:ItemStoreHouseMaterial)=>{ 
                    return {
                        id: String(e.id),
                        name: e.name,
                        free: String(e.free),
                        blocked: String(e.blocked),
                    } 
                })
            }
        })
    }
    ordini(){
        this.init("page-orders");
        new Table({
            e: new TAG_HTML("table").class(["table"]).obj,
            parent: this.main,
            title: "I miei ordini",
            dimension: "large",
            style: "simple",
            tools: {n_rows:false, n_pag:false, search:false, settings:false},
            conn: async ()=>{
                let res = await fetch("/db/orders/get", {
                    method: "GET"
                })
                res = await res.json()
                return res.map((e:ItemCustomer)=>{ 
                    return {
                        name: e.name, 
                        surname: e.surname
                    } 
                })
            }
        })
    }
    prodotti(){
        this.init("page-products");
        new Table({
            e: new TAG_HTML("table").class(["table"]).obj,
            parent: this.main,
            title: "I mio Listino",
            dimension: "large",
            style: "simple",
            tools: {n_rows:false, n_pag:false, search:false, settings:false},
            conn: async ()=>{
                let res = await fetch("/db/storehouse/products/get", {
                    method: "GET"
                })
                res = await res.json()
                return res.products.map((e:ItemCustomer)=>{ 
                    return {
                        name: e.name, 
                        surname: e.surname
                    } 
                })
            }
        })
    }   

    //UPGRADE v0.0.2
    progetti(){
        this.init("page-projects");
    }   
}
