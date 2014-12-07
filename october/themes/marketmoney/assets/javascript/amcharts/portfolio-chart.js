      
            var chart;
            var chartData = [];
            var chartCursor;

			function loadCSV(file) {
			    var request;
			    if (window.XMLHttpRequest) {
			        // IE7+, Firefox, Chrome, Opera, Safari
			        request = new XMLHttpRequest();
			    } else {
			        // code for IE6, IE5
			        request = new ActiveXObject('Microsoft.XMLHTTP');
			    }
			    // load
			    request.open('GET', file, false);
			    request.send();
			    parseCSV(request.responseText);
			}
			
			function parseCSV(data){
			    data = data.replace (/\r/g, "\n");
			    var rows = data.split("\n");
			    
			    for (var i = 1; i < rows.length; i++) {
				    // this line helps to skip empty rows
				    if (rows[i]) {
				        // our columns are separated by comma
				        var column = rows[i].split(",");
				
				        // column is array now 
				        // first item is date
				        var year = column[1];
				        var month = column[2];
				        var seperate = "-";
				        
				        var date = year.concat(seperate, month);

				        // second item is value of the second column
				        var value = column[5];
				
				        // create object which contains all these items:
				        var dataObject = {
				            date: date,
				            totalEquity: value
				        };
				        // add object to chartData array
				        chartData.push(dataObject);
				    }
				}
				chart.validateData();
			}
			
			// loop through all rows
			
			
			
			
			
			

            AmCharts.ready(function () {

                // SERIAL CHART
                chart = new AmCharts.AmSerialChart();
                chart.pathToImages = "amcharts/amcharts/images/";
                chart.dataProvider = chartData;
                chart.categoryField = "date";
                chart.balloon.bulletSize = 5;
                chart.dataDateFormat = "YYYY-MM";

                // listen for "dataUpdated" event (fired when chart is rendered) and call zoomChart method when it happens
                chart.addListener("dataUpdated", zoomChart);

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
                categoryAxis.dashLength = 1;
                categoryAxis.minorGridEnabled = true;
                categoryAxis.twoLineMode = true;
                categoryAxis.dateFormats = [{
                    period: 'fff',
                    format: 'JJ:NN:SS'
                }, {
                    period: 'ss',
                    format: 'JJ:NN:SS'
                }, {
                    period: 'mm',
                    format: 'JJ:NN'
                }, {
                    period: 'hh',
                    format: 'JJ:NN'
                }, {
                    period: 'DD',
                    format: 'DD'
                }, {
                    period: 'WW',
                    format: 'DD'
                }, {
                    period: 'MM',
                    format: 'MMM'
                }, {
                    period: 'YYYY',
                    format: 'YYYY'
                }];

                categoryAxis.axisColor = "#DADADA";

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.axisAlpha = 0;
                valueAxis.dashLength = 1;
                chart.addValueAxis(valueAxis);

                // GRAPH
                var graph = new AmCharts.AmGraph();
                graph.title = "red line";
                graph.valueField = "totalEquity";
                graph.bullet = "round";
                graph.bulletBorderColor = "#FFFFFF";
                graph.bulletBorderThickness = 2;
                graph.bulletBorderAlpha = 1;
                graph.lineThickness = 2;
                graph.lineColor = "#5fb503";
                graph.negativeLineColor = "#efcc26";
                graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
                chart.addGraph(graph);

                // CURSOR
                chartCursor = new AmCharts.ChartCursor();
                chartCursor.cursorPosition = "mouse";
                chartCursor.pan = true; // set it to fals if you want the cursor to work in "select" mode
                chart.addChartCursor(chartCursor);

                // SCROLLBAR
                var chartScrollbar = new AmCharts.ChartScrollbar();
                chart.addChartScrollbar(chartScrollbar);

                chart.creditsPosition = "bottom-right";

                // WRITE
                chart.write("chartdiv");
                
                loadCSV("data.txt");
            });

           

            // this method is called when chart is first inited as we listen for "dataUpdated" event
            function zoomChart() {
                // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
                chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
            }

            // changes cursor mode from pan to select
            function setPanSelect() {
                if (document.getElementById("rb1").checked) {
                    chartCursor.pan = false;
                    chartCursor.zoomable = true;
                } else {
                    chartCursor.pan = true;
                }
                chart.validateNow();
            }
