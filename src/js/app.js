// Get data parsed in "_api.js"
getMetricsParsed().then((data)=>{

    // If has data, load Highcharts
    if(data) return mountMetrics(data)
})

// Mount the metrics APP
let mountMetrics = (api) => {

    // Set specific data
    let data = api.metrics

    // Set specific categories
    let categories = api.categories

    // Mount Highcharts
    let chart = Highcharts.chart('container', {

        chart: {
            type: 'line',
            height: 550
        },

        title: {
            // Concat the title provided by the API with the period
            text: api.title + '<span class="date" dy="-2">' + formatDate(api.start_date) + ' - ' + formatDate(api.end_date) + '</span>',
            useHTML: true,
            align: 'left'
        },

        subtitle: {
            text: api.description,
            align: 'left'
        },

        // The last two colors were not included in the color palette.
        colors: ['#2DBEFF', '#4E41CE', '#7900A5', '#DCDCDC', '#FF0083', '#F9D952', '#FF4100', '#f45b5b', '#91e8e1'],

        // Remove credits
        credits: {
            enabled: false,
        },

        // Set legends on top and add margin-top
        legend: {
            align: 'center',
            verticalAlign: 'top',
            itemMarginTop: 30
        },

        // Format tooltip
        tooltip: {

            useHTML: true,

            // Arrow function don't work here
            formatter: function() {
                let name = this.series.name
                let y = this.y.toString()
                let x = formatDate(this.x)
                y = formatMoney(y.toString())
                return '<div class="tip-content"><div class="row"><span class="title">'+ name +'</span></div><div class="row"><div class="col date"><span>'+ x +'</span></div><div class="col amount"><span>'+ y +'</span></div></div></div>'
                return x + ' - ' + y
            }
        },

        xAxis: {
            categories: categories,
            labels: {
                // Arrow function don't work here
                formatter: function() {

                    // Set the xAxis format only day
                    let label = this.axis.defaultLabelFormatter.call(this);
                    return Number.parseInt(label.match(dateReg)[3])
                }
            }
        },

        // Clean text of yAxis title
        yAxis: {
            title: ''
        },

        // Set data
        series: data
    })
}
