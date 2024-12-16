/* eslint-disable react/prop-types */
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Title } from "chart.js";
import "./ResultChart.css";

ChartJS.register(ArcElement, Tooltip, Title);

function ResultChart({ scoreData }) {
  const { totalScore, maxScore, categories } = scoreData;
  // Prepare the dataset for the chart
  const categoryScores = categories.map((category) => category.score);
  const categoryColors = categories.map((category) => category.color);
  // Remaining marks to fill the gauge (unscored part)
  const unscored = maxScore - totalScore;

  const data = {
    labels: [...categories.map((category) => category.name), "Unscored"],
    datasets: [
      {
        data: [...categoryScores, unscored],
        backgroundColor: [...categoryColors, "#e0e0e0"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const index = tooltipItem.dataIndex;
            if (index < categories.length) {
              return `${categories[index].name}: ${categories[index].score} points`;
            }
            return "Unscored";
          },
        },
      },
      title: {
        display: true,
        text: "Test Results",
        position: "bottom",
        font: {
          size: 18,
          weight: "bold",
        },
        padding: {
          bottom: 20,
        },
      },
    },
    rotation: -90, // Start at the bottom
    circumference: 180, // Half-circle for the gauge
    cutout: "70%", // Hollow center for a gauge effect
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Allow resizing without maintaining aspect ratio
  };

  return (
    <div className="result-chart-container">
      <div className="result-chart-content">
        {/* First Column: Total Score */}
        <div className="result-chart-score">
          <h3>Total Score</h3>
          <h1>{totalScore}</h1>
          <p>out of {maxScore}</p>
        </div>

        {/* Second Column: Gauge Chart */}
        <div className="result-chart-doughnut">
          <Doughnut data={data} options={options} />
        </div>

        {/* Third Column: Legend */}
        <div className="result-chart-legend">
          <h4>Legend</h4>
          <ul>
            {categories.map((category, index) => (
              <li key={index}>
                <span
                  className="legend-color"
                  style={{ backgroundColor: category.color }}
                ></span>
                {category.name}
              </li>
            ))}
            <li>
              <span
                className="legend-color"
                style={{ backgroundColor: "#e0e0e0" }}
              ></span>
              Unscored
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ResultChart;
