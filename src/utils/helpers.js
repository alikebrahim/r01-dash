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
  let conversion = Math.floor(xp / 1000)
  if (conversion > 1000) {
    return conversion + " mB"
  } else {
    return conversion + " kB"
  }
}
