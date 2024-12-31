import { Queries } from "./queries";
export const DecodeQuery = (dataCode, userID) => {
  switch (dataCode) {
    case "dashboard":
      return Queries.userDetails;
    case "audit":
      return Queries.auditData(userID);
    case "xp":
      return Queries.xpQuery(userID);
    case "skills":
      return Queries.skillsQuery;
    case "lastProjects":
      return Queries.lastProjectsQuery;
    default:
      console.warn(`No query found for: ${dataCode}`);
      return null; // Return a fallback or error
  }
};

export const FormatXP = (xp) => {
  let conversion = Math.floor(xp / 1000);
  if (conversion > 1000) {
    return conversion + " mB";
  } else {
    return conversion + " kB";
  }
};

const formatSkillName = (skill) => {
  return skill
    .replace("skill_", "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const FilterSkills = (data) => {
  const skills = data.user[0]?.transactions || [];

  const technicalSkills = {};
  const technologies = {};

  skills.forEach((skill) => {
    const skillType = skill.type;
    const skillAmount = skill.amount;

    if (
      [
        "skill_go",
        "skill_js",
        "skill_html",
        "skill_css",
        "skill_unix",
        "skill_docker",
      ].includes(skillType)
    ) {
      if (!technologies[skillType]) {
        technologies[skillType] = skillAmount;
      } else if (skillAmount > technologies[skillType]) {
        technologies[skillType] = skillAmount;
      }
    } else if (
      [
        "skill_prog",
        "skill_algo",
        "skill_front-end",
        "skill_back-end",
      ].includes(skillType)
    ) {
      if (!technicalSkills[skillType]) {
        technicalSkills[skillType] = skillAmount;
      } else if (skillAmount > technicalSkills[skillType]) {
        technicalSkills[skillType] = skillAmount;
      }
    }
  });

  // const technicalSkillsLabels =
  //   Object.keys(technicalSkills).map(formatSkillName);
  // const technicalSkillsData = Object.values(technicalSkills);
  // const technologiesLabels = Object.keys(technologies).map(formatSkillName);
  // const technologiesData = Object.values(technologies);

  console.log("Technical Skills:", technicalSkills);
  console.log("Technologies:", technologies);
  return { technologies, technicalSkills };
};

// function createRadarChart(data, labels, chartTitle) {
//   const width = 400; // Example dimensions, adjust as needed
//   const height = 400;
//   const padding = 60;
//   const radius = Math.min(width, height) / 2.5 - padding;
//   const levels = 5;
//   const angleSlice = (Math.PI * 2) / labels.length;
//
//   const rScale = d3
//     .scaleLinear()
//     .range([20, radius])
//     .domain([0, d3.max(data)]);
//
//   const radarLine = d3
//     .lineRadial()
//     .radius((d) => rScale(d))
//     .angle((d, i) => i * angleSlice);
//
//   const currentTheme = document.body.getAttribute("data-bs-theme") || "light";
//   const fillColor =
//     currentTheme === "dark"
//       ? "rgba(54, 162, 235, 0.2)"
//       : "rgba(38, 46, 44, 0.2)";
//   const strokeColor =
//     currentTheme === "dark"
//       ? "rgba(255, 255, 255, 1)"
//       : "rgba(54, 162, 235, 1)";
//   const labelColor =
//     currentTheme === "dark" ? "rgb(255, 255, 255)" : "rgb(0, 0, 0)";
//
//   return (
//     <svg
//       width={width}
//       height={height}
//       viewBox={`0 0 ${width} ${height}`}
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <g transform={`translate(${width / 2},${height / 2})`}>
//         {/* Chart Title */}
//         <text
//           x="0"
//           y={-radius - 60}
//           textAnchor="middle"
//           fontSize="16px"
//           fontWeight="bold"
//           fill={labelColor}
//         >
//           {chartTitle}
//         </text>
//
//         {/* Background circles */}
//         {[...Array(levels)].map((_, i) => (
//           <circle
//             key={i}
//             r={(radius / levels) * (i + 1)}
//             fill="#CDCDCD"
//             stroke="#CDCDCD"
//             fillOpacity="0.1"
//           />
//         ))}
//
//         {/* Axes */}
//         {labels.map((label, i) => (
//           <line
//             key={i}
//             x1="0"
//             y1="0"
//             x2={rScale(d3.max(data)) * Math.cos(angleSlice * i - Math.PI / 2)}
//             y2={rScale(d3.max(data)) * Math.sin(angleSlice * i - Math.PI / 2)}
//             stroke="white"
//             strokeWidth="2px"
//           />
//         ))}
//
//         {/* Labels */}
//         {labels.map((label, i) => {
//           const angle = angleSlice * i;
//           const x = rScale(d3.max(data) * 1.1) * Math.cos(angle - Math.PI / 2);
//           const y = rScale(d3.max(data) * 1.1) * Math.sin(angle - Math.PI / 2);
//           const rotate =
//             angle > Math.PI / 2 && angle < (3 * Math.PI) / 2
//               ? "rotate(0)"
//               : null;
//
//           return (
//             <text
//               key={i}
//               x={x}
//               y={y}
//               dy="0.35em"
//               fontSize="10px"
//               textAnchor="middle"
//               transform={rotate}
//               fill={labelColor}
//             >
//               {label}
//             </text>
//           );
//         })}
//
//         {/* Radar chart blob */}
//         <path
//           d={radarLine(data)}
//           fill={fillColor}
//           stroke={strokeColor}
//           strokeWidth="0"
//         />
//       </g>
//     </svg>
//   );
// }
