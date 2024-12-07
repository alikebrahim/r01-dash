import { Queries } from "./queries";
export const DecodeQuery = (dataCode, userID) => {
  switch (dataCode) {
    case "dashboard":
      return Queries.userDetails;
    case "audit":
      return Queries.auditData(userID);

    default:
      console.warn(`No query found for: ${dataCode}`);
      return null; // Return a fallback or error
  }
};
