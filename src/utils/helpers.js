import { Queries } from "./queries";
export const DecodeQuery = (queryCode) => {
  switch (queryCode) {
    case "dashboardData":
      return Queries.dashboardData;

    default:
      console.warn(`No query found for: ${queryCode}`);
      return null; // Return a fallback or error
  }
};
