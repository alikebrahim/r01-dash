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

export const FormatSkillName = (skill) => {
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
    const skillType = FormatSkillName(skill.type);
    const skillAmount = skill.amount;

    if (
      [
        "Go",
        "Js",
        "Html",
        "Css",
        "Unix",
        "Docker",
        "Sql",
      ].includes(skillType)
    ) {
      if (!technologies[skillType]) {
        technologies[skillType] = skillAmount;
      } else if (skillAmount > technologies[skillType]) {
        technologies[skillType] = skillAmount;
      }
    } else if (
      [
        "Prog",
        "Algo",
        "Front-end",
        "Back-end",
        "Sys-admin",
        "Tcp",
        "Game",
        "Stats",
        "Ai",
      ].includes(skillType)
    ) {
      if (!technicalSkills[skillType]) {
        technicalSkills[skillType] = skillAmount;
      } else if (skillAmount > technicalSkills[skillType]) {
        technicalSkills[skillType] = skillAmount;
      }
    }
  });


  // console.log("Technical Skills:", technicalSkills);
  // console.log("Technologies:", technologies);
  return { technologies, technicalSkills };
};

