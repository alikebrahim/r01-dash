export const DataBody = (props) => {
  switch (props.dataCode) {
    case "dashboard":
      console.log("DataBody (" + props.dataCode + "): ", props.userData)
      return (
        <div className={props.className} style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">User Information</h5>
            <p className="card-text">Name: {props.userData.user[0].firstName}  {props.userData.user[0].lastName}</p>
            <p className="card-text">Email: {props.userData.user[0].email}</p>
            <p className="card-text">Campus: {props.userData.user[0].campus.toUpperCase()}</p>
            <p className="card-text">Campus ID: {props.userData.user[0].login}</p>
          </div>
        </div>
      )
    case "audit":
      // console.log("DataBody (" + props.dataCode + "): ", props.userData.user[0])
      return (
        <div className={props.className} style={{ width: '18rem' }}>
          <div className="card-body">
            <h5 className="card-title">Audit data</h5>
            <p className="card-text">Audit Ratio: {props.userData.user[0].auditRatio}</p>
            <p className="card-text">Up: {props.userData.user[0].totalUp}</p>
            <p className="card-text">Down: {props.userData.user[0].totalDown}</p>
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
        <div className="card bg-white" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            {props.userData.user[0].transactions.map((transaction) => (<h5>Skill: {transaction.type.replace("skill_", "")} Amount: {transaction.amount}</h5>))}
          </div>
        </div>
      )
    case "lastProjects":
      return (
        <div className="card bg-white" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <ul></ul>
            {props.userData.transaction.map((transaction) => (<li>{transaction.object.name}</li>))}
          </div>
        </div>
      )

    default:
      console.warn(`No query found for: ${props.dataCode}`);
      return null;
  }
}
