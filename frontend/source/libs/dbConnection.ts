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
    ready: Promise<void>;

    constructor(){
        this.ready = this.init()
    }

    async init(){
        await Promise.all([
            await this.load({name: "storehouse"}),
            await this.load({name: "orders"}),
            await this.load({name: "customers"}),
        ])
    }

    async load(query: DBQuery){
        let res = await fetch(`/db/${query.name}`, {method:"GET"})
        res = await res.json();
        this.tables[query.name] = res;
    }
}

