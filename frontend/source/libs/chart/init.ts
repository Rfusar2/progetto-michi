
type ConfigChartProps = {
    parent: HTMLElement;
    n_docs_luce: number;
    n_docs_gas: number;
}


class MyChart {
    card = new TAG_HTML("div").class(["card-chart-pie"]).attr({colorschema:"dark"}).obj;
    container_chart = new TAG_HTML("div").id("chart-container").obj;
    element_chart = new TAG_HTML("div").id("chart").obj;

    chart: any;
    constructor({parent, n_docs_luce, n_docs_gas}: ConfigChartProps){
        this.container_chart.append(this.element_chart);
        this.card.append(this.container_chart);
        parent.append(this.card)
        
        this.chart = anychart.pie(this.config(n_docs_luce, n_docs_gas)); // CDN Esterna
        this.chart.container("chart");
        this.chart.background("transparent");
        this.chart.innerRadius("70%");
        this.chart.labels().position("inside");
        this.chart.insideLabelsOffset("-95%");
        this.chart.labels(false);

        this.setLegend();
        this.setToolTip();

        this.chart.draw();
        SELECT.one("#chart")!.querySelector("div a")!.remove();

        this.setDetails()
    }

    setDetails(){
        const container_details = new TAG_HTML("div").obj;
        this.card.append(container_details);
    }


    setLegend(){
        //TODO da inserire nell'evento di cambio colorschema
        const legend = this.chart.legend()
        legend.position('right');
        legend.itemsLayout('vertical');
        legend.align('top');
        legend.fontColor("#fff9");
        legend.fontSize("12px");
        
        //legend.useHtml(true)
        //legend.itemsFormat(function() {
        //  var date = anychart.format.dateTime(this.value, "dd MMMM yyyy");
        //  return "<span style='color:#455a64;font-weight:600'>DATE: " +
        //         date + "</span>";
        //});
    }

    setToolTip(){
        const tooltip = this.chart.tooltip()
        tooltip.background("#000");
        tooltip.fontColor("#fff");
    }

    
    config(n_docs_luce:number, n_docs_gas:number){
        const color_luce = SELECT.style("--get-pro")
        const color_gas = SELECT.style("--light-blue");
         return [
          {x: "LUCE", value: n_docs_luce,
           normal:  {
              fill: color_luce,
           },
           hovered: {
              fill: color_luce,
              outline: {
                enabled: false,
                stroke: null
              }
           },
           selected: {
              outline: {
                enabled: true,
                width: 6,
                fill: color_luce,
                stroke: null
              }
           }
          },
          {x: "GAS", value: n_docs_gas,
           normal:  {fill: color_gas},
           hovered: {
              fill: color_gas,
              outline: {
                enabled: false,
                stroke: null
              }
           },
           selected: {
              outline: {
                enabled: true,
                width: 6,
                fill: color_gas,
                stroke: null
              }
           }
          }
        ];
    }
}