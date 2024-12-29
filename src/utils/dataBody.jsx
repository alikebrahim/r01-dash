import SVGProgressBar from "./svg"

export const DataBody = (props) => {
  switch (props.dataCode) {
    case "dashboard":
      // console.log("DataBody (" + props.dataCode + ") - Email: ", props.userData.user[0].email)
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
            <p className="card-text">Audit Ratio: {props.userData.user[0].auditRatio}</p>
            <p className="card-text">Up: {props.userData.user[0].totalUp}</p>
            <p className="card-text">Down: {props.userData.user[0].totalDown}</p>
            <div>
              {SVGProgressBar(props.userData.user[0].totalUp
                , props.userData.user[0].totalDown
              )}
            </div>
          </div>
        </div>
      )
    case "xp":
      return (
        <div className={props.className} style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">XP</h5>
            <p className="card-text">{props.userData.transaction_aggregate.aggregate.sum.amount}</p>
          </div>
        </div>
      )
    case "skills":
      return (
        <div className={props.className} style={{ width: '18rem' }}>
          <div className="card-body">
            {props.userData.user[0].transactions.map((transaction) => (<h5>Skill: {transaction.type.replace("skill_", "")} Amount: {transaction.amount}</h5>))}
          </div>
        </div>
      )
    case "lastProjects":
      return (
        <div className={props.className} >
          <p>Last Activity</p>
          <div className="card-body">
            <ul className="list-group"></ul>
            {props.userData.transaction.map((transaction) => (<li className="list-group-item text-start"> Project - {transaction.object.name}</li>))}
          </div>
        </div>
      )

    default:
      console.warn(`No query found for: ${props.dataCode}`);
      return null;
  }
}
