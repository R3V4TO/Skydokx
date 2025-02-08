async function fetchTrafficData() {
  const response = await fetch("http://127.0.0.1:5000/download_json");
  const data = await response.json();

  let labels = [];
  let densities = [];
  let emissions = [];

  data.forEach(entry => {
      labels.push(entry.trafficLight);
      densities.push(entry.vehicleDensity);
      emissions.push(entry.emissions);
  });

  new Chart(document.getElementById("trafficChart").getContext("2d"), {
      type: "bar",
      data: {
          labels: labels,
          datasets: [
              { label: "Vehicle Density", data: densities, backgroundColor: "blue" },
              { label: "Emissions", data: emissions, backgroundColor: "red" }
          ]
      }
  });
}

// Fetch data every 5 seconds to keep it updated
setInterval(fetchTrafficData, 5000);
fetchTrafficData();
