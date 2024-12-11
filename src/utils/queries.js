export const Queries = {
  // User ID
  userID: `
    {
      user {
        id
      }
    }
  `,

  // User Details
  userDetails: `
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

  // User Current Project
  // not working?
  UserCurrentProject: `
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

  // User Audit Data and Ratio
  auditData: (userId) => `
    {
      user(where: { id: { _eq: "${userId}" } }) {
        auditRatio
        totalUp
        totalDown
      }
    }
  `,

  // User Total XP
  xpQuery: (userId) => `
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
  `,

  // User Skills
  skillsQuery: `
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
  `,

  // User Last 4 Projects
  lastProjectsQuery: `
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
  `,
};
