import React from 'react';

const SVGProgressBar = (totalGiven, totalReceived) => {
  let height = 50;
  let barColor = 'yellow';
  let secondaryBarColor = 'white';
  let textColor = 'black';
  let width = 220; // Adjust this if you can make the SVG larger

  // Determine which value is higher to set as the max width
  const maxValue = Math.max(totalGiven, totalReceived);
  const totalGivenWidth = (totalGiven / maxValue) * width;
  const totalReceivedWidth = (totalReceived / maxValue) * width;

  // Function to calculate font size based on number length
  const calculateFontSize = (number) => {
    const length = number.toString().length;
    return length > 6 ? height / 3 : height / 2.5; // Example adjustment for longer numbers
  };
  const formatValue = (value) => {
    let val = value / 1000000
    if (val < 1) {
      return val.toFixed(2) + " KB"
    } else {
      return val.toFixed(2) + " MB"
    }
  }

  return (
    <svg width={width} height={height * 2 + 10}>
      <g transform="translate(0,0)">
        <rect
          x={0}
          y={0}
          width={totalGivenWidth}
          height={height}
          fill={totalGiven > totalReceived ? barColor : secondaryBarColor}
          rx={height / 2}
          ry={height / 2}
        />
        <text
          x={totalGivenWidth / 2}
          y={height / 2}
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={calculateFontSize(totalGiven)}
        >
          {`Given: ${formatValue(totalGiven)}`}
        </text>
      </g>
      <g transform={`translate(0,${height + 10})`}>
        <rect
          x={0}
          y={0}
          width={totalReceivedWidth}
          height={height}
          fill={totalReceived > totalGiven ? barColor : secondaryBarColor}
          rx={height / 2}
          ry={height / 2}
        />
        <text
          x={totalReceivedWidth / 2}
          y={height / 2}
          fill={textColor}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={calculateFontSize(totalReceived)}
        >
          {`Received: ${formatValue(totalReceived)}`}
        </text>
      </g>
    </svg>
  );
};

export default SVGProgressBar;
