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
        const materials = storehouse.materials as ItemStoreHouseMaterial[];
        const products = storehouse.products as ItemStoreHouseProduct[];

        const customers = this.db.tables.customers as ItemCustomer[];
        const orders = this.db.tables.orders as ItemOrder[];
    
        //* Filters
        const options_customers = customers
            .map((e:ItemCustomer)=>new Option(e.name, String(e.id)));
        
        const options_products = products
            .map((e:ItemStoreHouseProduct)=>new Option(e.name, String(e.id)));

        const options_materials1 = materials
            .map((e: ItemStoreHouseMaterial) => new Option(e.name, String(e.id) ));

        const options_materials2 = materials
            .map((e: ItemStoreHouseMaterial) => new Option(e.name, String(e.id) ));

        let n_materials = 0
        materials.forEach((e:ItemStoreHouseMaterial)=>n_materials+=e.free)

        

        //*DATA CARDS
        const cards = [
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
                        new MyInput({
                            label: "Nome Cliente"
                        }),
                        new MyInput({
                           label: "Cognome Cliente", 
                        }),
                        new MyInput({
                            label: "Indirizzo Cliente",
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

                        let material_id = data[2].value.split(";").filter((e:string)=>e!=="")

                        if (material_id.length == 0){
                            material_id = [Number(data[1].childNodes[0].getAttribute("value"))]
                        }
                        else{
                            material_id = material_id.map((e:string)=>Number(e))
                        }

                        const body = {
                            name: data[0].value,
                            materials: material_id,
                        }

                        let res = await fetch("/db/storehouse/products/add", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        })
                        if(res.status == 200){
                            const text = await res.json()
                            console.log(text)
                            new Popup({type:"right", text: `${data[0].value} Aggiunto`, status: ConfigPopupStatus.OK })
                            console.log(await res.json())
                        }
                        else {
                            const text = await res.text()

                            new Popup({type:"right", text: text, status: ConfigPopupStatus.KO })
                            console.log("Prodotto Non Aggiunto: "+text)
                        }
                    },
                    title: "Aggiungi prodotto",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new MyInput({
                            label:"Nome prodotto", 
                        }),
                        new MyInput({
                            tag: "select",
                            options: options_materials1,
                            event: {
                                type: "input",
                                func: (e)=>{
                                    const input = e.currentTarget;
                                    const list_materials = SELECT.one("#list-materials");
                                    list_materials.value += input.value+";"
                                },
                                
                            },
                        }),
                        new MyInput({
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
                    conn: async (data)=>{

                        let product_id = data[2].value.split(";").filter((e:string)=>e!=="")

                        if (product_id.length == 0){
                            product_id = [Number(data[1].childNodes[0].getAttribute("value"))]
                        }
                        else{
                            product_id = product_id.map((e:string)=>Number(e))
                        }

                        const body = {
                            name: data[0].value
                            products: product_id,
                            customer: Number(data[3].value),
                            status: Number(data[4].value),
                            description: data[5].value
                        }
                        console.log(body)

                        let res = await fetch("/db/orders/add", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body)
                        })

                        if(res.status == 200){
                            const text = await res.json()
                            new Popup({type:"right", text: "Ordine Aggiunto", status: ConfigPopupStatus.OK })
                            console.log(text)
                        }
                        else {
                            const text = await res.text()
                            new Popup({type:"right", text: text, status: ConfigPopupStatus.KO })
                            console.log("Ordine Aggiunto: "+text)
                        }
                    },
                    title: "Aggiungi ordine",
                    model: ConfigModelTypes.CENTER,
                    inputs:[
                        new MyInput({
                            label:"Nome Ordine", 
                        }),
                        new MyInput({
                            label:"Prodotto",
                            tag: "select",
                            options: options_products,
                            event: {
                                type: "change",
                                func: (e)=>{
                                    const input = e.currentTarget
                                    const carrello = SELECT.one("#ordine-carrello")
                                    carrello.value += input.value+";"

                                }
                            }
                        }),
                        new MyInput({
                            label:"Carrello",
                            props: {id: "ordine-carrello"}
                        }),

                        new MyInput({
                            label:"Cliente",
                            tag: "select",
                            options: options_customers,
                        }),
                        new MyInput({
                            label:"Status",
                            tag: "select",
                            options: [new Option("Attesa", "0"), new Option("Working", "1")],
                        }),
                        new MyInput({
                            label:"Descrizione",
                            props: {
                                name:"description",
                            }
                        }),
                    ]
                }
            },
            {
                title: "Materiali disponibili", 
                content: String(n_materials), 
                router: "materiali",
                form: {
                    conn: async (data)=>{
                        const isNew = data[2].value!="";
                        const body = {
                            id: isNew ? -1 : Number(data[1].value),
                            name: isNew ? data[2].value : data[1].selectedOptions[0].text,
                            free: Number(data[0].value),
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
                        new MyInput({
                            label:"Quantita",
                            props: {
                                name:"free",
                                type: "number",
                            }
                        }),
                        new MyInput({
                            tag: "select",
                            options: options_materials2,
                            props: {
                                name:"materials",
                            }
                        }),
                        new MyInput({
                            label: "Devi registrare un prodotto?"
                            props: {
                                placeholder:"inserisci il nome ",
                                name:"new-material",
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
            ths: [
                ["id", ""],
                ["name", "Nome Cliente"],
                ["surname", "Cognome Cliente"],
                ["address", "Indirizzo Cliente"],
            ]
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
            ths: [
                ["id", ""],
                ["name", "Nome Materiale"],
                ["free", "Liberi"],
                ["blocked", "Bloccati"],
            ]
        })
    }
    async ordini(){
        this.init("page-orders");
        await this.db.ready;

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
                    const status = e.status==0?"attesa":e.status==1?"in lavorazione":e.status==2?"finito":"" 
                    const customer = this.db.tables.customers.filter((customer_db:ItemCustomer)=>customer_db.id==e.customer)[0];

                    return {
                        id: String(e.id),
                        name: e.name,
                        customer: customer.name,
                        status: status,
                        description: e.description,
                    } 
                })
            },
            ths: [
                ["id", ""],
                ["name", "Nome Ordine"],
                ["customer", "Cliente"],
                ["status", "Status"],
                ["description", "Description"],
            ]
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
                let res = await fetch("/db/storehouse/get", {
                    method: "GET"
                })
                res = await res.json()
                return res.products.map((e:ItemCustomer)=>{ 
                    const status = e.status==0?"libero":e.status==1?"bloccato":""
                    return {
                        id: String(e.id), 
                        name: e.name, 
                        status: status,
                    } 
                })
            },
            ths: [
                ["id", ""],
                ["name", "Nome Prodotto"],
                ["status", "Status"],
            ]
        })
    }   

    //UPGRADE v0.0.2
    progetti(){
        this.init("page-projects");
    }   
}
