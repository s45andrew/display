<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Closing Prices Trends</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <canvas id="myChart" width="800" height="400"></canvas>
    <script>
        // Simulated JSON data
        const jsonData = [
            { "Date": "2023-04-01", "Close": 120 },
            { "Date": "2023-04-02", "Close": 125 },
            { "Date": "2023-04-03", "Close": 130 },
            { "Date": "2023-04-04", "Close": 128 },
            { "Date": "2023-04-05", "Close": 133 },
            { "Date": "2023-04-06", "Close": 135 },
            { "Date": "2023-04-07", "Close": 140 }
        ];

        // Detect Peaks and Troughs
        const detectTrends = (data) => {
            let peaks = [];
            let troughs = [];
            for (let i = 1; i < data.length - 1; i++) {
                const prev = data[i - 1].Close;
                const current = data[i].Close;
                const next = data[i + 1].Close;

                if (current > prev && current > next) {
                    peaks.push({ date: data[i].Date, price: current });
                }

                if (current < prev && current < next) {
                    troughs.push({ date: data[i].Date, price: current });
                }
            }
            return { peaks, troughs };
        };

        const { peaks, troughs } = detectTrends(jsonData);

        // Calculate Moving Averages
        const movingAverage = (data, period) => {
            let averages = [];
            for (let i = 0; i < data.length - period + 1; i++) {
                const slice = data.slice(i, i + period);
                const sum = slice.reduce((acc, val) => acc + val.Close, 0);
                averages.push(sum / period);
            }
            return averages;
        };

        const sevenDayMA = movingAverage(jsonData, 7);

        // Visualization with Chart.js
        const ctx = document.getElementById("myChart").getContext("2d");
        new Chart(ctx, {
            type: "line",
            data: {
                labels: jsonData.map(d => d.Date),
                datasets: [
                    {
                        label: "Closing Price",
                        data: jsonData.map(d => d.Close),
                        borderColor: "blue",
                        fill: false
                    },
                    {
                        label: "7-Day Moving Average",
                        data: Array(6).fill(null).concat(sevenDayMA), // Align with data length
                        borderColor: "orange",
                        fill: false
                    },
                    {
                        label: "Peaks",
                        data: jsonData.map(d => peaks.some(p => p.date === d.Date) ? d.Close : null),
                        borderColor: "red",
                        backgroundColor: "red",
                        pointStyle: "circle",
                        showLine: false
                    },
                    {
                        label: "Troughs",
                        data: jsonData.map(d => troughs.some(t => t.date === d.Date) ? d.Close : null),
                        borderColor: "green",
                        backgroundColor: "green",
                        pointStyle: "triangle",
                        showLine: false
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: { text: "Date", display: true }
                    },
                    y: {
                        title: { text: "Price", display: true }
                    }
                }
            }
        });

        console.log("Peaks:", peaks);
        console.log("Troughs:", troughs);
    </script>
</body>
</html>
