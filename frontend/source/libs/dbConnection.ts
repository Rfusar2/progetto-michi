type DBQuery = {
    name: "storehouse" | "orders" | "customers";
}


class HandlerConnection {
    constructor(){
        
    }
}

class MyDB {
    handler = new HandlerConnection();
    tables = {
        storehouse: [],
        orders: [],
        customers: [],
    };

    constructor(){
        (async ()=>{
            this.load({name: "storehouse"})
            this.load({name: "orders"})
            this.load({name: "customers"})
    
        })()
    }

    async load(query: DBQuery){
        let res = await fetch(`/db/${query.name}`, {method:"GET"})
        res = await res.json();
        this.tables[query.name] = res;
    }
}

const database = new MyDB()
console.log(database.tables)
