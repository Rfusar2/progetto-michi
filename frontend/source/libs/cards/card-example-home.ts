type ConfigCardHomeProps = {
    parent: HTMLElement;
    title: string;
    note: string;
}

class CardHome{
    obj = new TAG_HTML("div").class(["card-home"]).obj;
    header = new TAG_HTML("header").obj;
    main = new TAG_HTML("main").obj;
    data: Data[];
    rows: Data[]; //provvisiorio
    parent: HTMLElement;
    title:string;
    note:string;

    constructor({parent, title, note}:ConfigCardHomeProps){
        this.data = this.getData(); //Query DB

        parent.append(this.obj);
        this.obj.append(this.header, this.main);
        this.parent = parent;
        this.title = title;
        this.note = note;

        this.rows = [this.data[0], this.data[1], this.data[2]];

        this.header.append(
            new TAG_HTML("span").props({textContent: title}).attr({colorschema:"dark"}).obj
        )
        //this.main.append(this.data)

        console.log(this)
    }

    getData(){ 
        return EXAMPLE_DATA.card_home();
    }

    getRow(content:string[]){
        const row = new TAG_HTML("div").class(["card-row"]).attr({colorschema:"dark"}).obj;

        //TODO da migliorare
        //const data_clear = []
        //for(const cell of this.rows){
        //    data_clear.push({
        //        Tipologia: cell.Tipologia,
        //        Status: cell.Status,
        //        Scadenza: cell.Scadenza,
        //    });
        //        
        //}
        //for(const cell of data_clear){
        //    const container_span = new TAG_HTML("div").class(["container-row"]).obj;
        //    const text = new TAG_HTML("span").class(["container-row-content"]).props({textContent:cell}).obj;
        //    container_span.append(text);
        //    row.append(container_span);
        //}

        return row;
    }

}
