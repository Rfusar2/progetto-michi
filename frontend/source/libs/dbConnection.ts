type DBQuery = {
    name: "storehouse" | "orders" | "customers";
}

type ItemCustomer = {
    id: number;
    name: string;
    surname: string;
    address: string;
}
type ItemOrderDetails = {
    quantity: number;
    product: number;
    description: string;
}
type ItemOrder = {
    id: number;
    name: string;
    customer: number;
    details: ItemOrderDetails;
}
type ItemStoreHouseMaterial = {
    id: number;
    name: string;
    free: number;
    blocked: number;
}
type ItemStoreHouseProduct = {
    id: number;
    name: string;
    status: string;
    materials: ItemStoreHouseMaterial;
}
type StoreHouse = {
    materials: ItemStoreHouseMaterial[];
    products: ItemStoreHouseProduct[];
}

class HandlerConnection {}

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
        let res = await fetch(`/db/${query.name}/get`, {method:"GET"})
        res = await res.json();
        this.tables[query.name] = res;
    }

}

const DATABASE = new MyDB()
