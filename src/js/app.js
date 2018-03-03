getMetricsParsed().then((data)=>{
    if(data) return mountMetrics(data)
})

let mountMetrics = (api) => {
    let data = api.metrics
    let categories = api.categories

    let chart = Highcharts.chart('container', {
        chart: {
            type: 'line'
        },

        plotOptions: {
            line: {
                series: {
                    showInNavigator: false
                }
            }
        },

        title: {
            text: api.title
        },

        subtitle: {
            text: api.description
        },

        xAxis: {
            categories: categories,
            labels: {
                formatter: function() {
                    var label = this.axis.defaultLabelFormatter.call(this);
                    return Number.parseInt(label.match(/^\d{4}-\d\d?-(\d\d?)$/)[1])
                }
            }
        },

        yAxis: {
            title: ''
        },

        series: data
    })
}
