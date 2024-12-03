// userID
export const UserId = `
    {
      user {
        id
      }
    }
  `;
export const Queries = {
  userId: `
    {
      user {
        id
      }
    }
  `,
  dashboardData: `
    {
      user {
        id
        login
        campus
        email
        firstName
        lastName
      }
      progress(
        where: { isDone: { _eq: false }, object: { type: { _eq: "project" } } }
        limit: 1
      ) {
        object {
          name
        }
      }
    }
  `,
  user: (userId) => `
    {
      user(where: { id: { _eq: "${userId}" } }) {
        login
        campus
        email
        firstName
        lastName
      }
    }
  `,

  currentProjectQuery: `
    {
      progress(
        where: { isDone: { _eq: false }, object: { type: { _eq: "project" } } }
        limit: 1
      ) {
        object {
          name
        }
      }
    }
  `,
};
// Define the GraphQL query to fetch the audit ratio, total audits done, and total audits received
const auditQuery = (userId) => `
  {
    user(where: { id: { _eq: "${userId}" } }) {
      auditRatio
      totalUp
      totalDown
    }
  }
`;

// Define the correct GraphQL query to fetch the user's XP
const xpQuery = (userId) => `
  query Transaction_aggregate {
    transaction_aggregate(
      where: {
        event: { path: { _eq: "/bahrain/bh-module" } }
        type: { _eq: "xp" }
        userId: { _eq: "${userId}" }
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
  }
`;

// Define the GraphQL query to fetch the user's skills
const skillsQuery = `
  {
    user {
      transactions(where: {
          type: {_ilike: "%skill%"}
        }
      ) {
        type
        amount
      }
    }
  }
`;

// Define the GraphQL query to fetch the last 4 projects

const lastProjectsQuery = `
{
    transaction(
      where: {
        type: { _eq: "xp" }
        _and: [
          { path: { _like: "/bahrain/bh-module%" } },
          { path: { _nlike: "/bahrain/bh-module/checkpoint%" } },
          { path: { _nlike: "/bahrain/bh-module/piscine-js%" } }
        ]
      }
      order_by: { createdAt: desc }
      limit: 4
    ) {
      object {
        type
        name
      }
    }
  }
  `;
