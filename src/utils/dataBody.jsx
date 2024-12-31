import SVGProgressBar from "./svg"
import { FilterSkills, FormatXP, FormatSkillName } from "./helpers"
import CreateRadarChart from "./chart"

export const DataBody = (props) => {
  switch (props.dataCode) {
    case "dashboard":
      return (
        <div className={props.className} >
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p className="card-text text-start">Name: {props.userData.user[0].firstName}  {props.userData.user[0].lastName}</p>
            <p className="card-text text-start">Email: {props.userData.user[0].email.replace(/^\s+|\s+$/g, '')}</p>
            <p className="card-text text-start">Campus: {props.userData.user[0].campus.toUpperCase()}</p>
            <p className="card-text text-start">Campus ID: {props.userData.user[0].login}</p>
          </div>
        </div>
      )
    case "audit":
      return (
        <div className={props.className} >
          <div className="card-body">
            <h5 className="card-title">Audit data</h5>
            <p className="card-text">Audit Ratio: {props.userData.user[0].auditRatio.toFixed(1)}</p>
            <div>
              {SVGProgressBar(props.userData.user[0].totalUp
                , props.userData.user[0].totalDown
              )}
            </div>
          </div>
        </div>
      )
    case "xp":
      let xp = FormatXP(props.userData.transaction_aggregate.aggregate.sum.amount)
      return (
        <div className={props.className} style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">XP</h5>
            <p className="card-text">{xp}</p>
          </div>
        </div>
      )
    case "skills":
      const { technologies, technicalSkills } = FilterSkills(props.userData);
      return (
        <div className={props.className} >
          <div className="card-body ">
            {CreateRadarChart(technologies, "Technologies")}
            {CreateRadarChart(technicalSkills, "Technical Skills")}
          </div>
        </div>
      )
    case "lastProjects":
      return (
        <div className={props.className} >
          <p>Last Activity</p>
          <div className="card-body">
            <ul className="list-group"></ul>
            {props.userData.transaction.map((transaction) => (<li className="list-group-item text-start"> Project : {transaction.object.name}</li>))}
          </div>
        </div>
      )

    default:
      console.warn(`No query found for: ${props.dataCode}`);
      return null;
  }
}
