export const DataBody = (dataCode, userData) => {
  switch (dataCode) {
    case "dashboard":
      return (
        <div className="card bg-white" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Dashboard data</h5>
            <p className="card-text">Name: {userData.user[0].login}</p>
          </div>
        </div>
      )
    case "audit":
      return (
        <div className="card bg-white" style={{ width: '18rem' }}>
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">Audit data</h5>
            <p className="card-text">Audit Ratio: {userData.user[0].auditRatio}</p>
            <p className="card-text">Up: {userData.user[0].totalUp}</p>
            <p className="card-text">Down: {userData.user[0].total}</p>
          </div>
        </div>
      )
    default:
      console.warn(`No query found for: ${dataCode}`);
      return null; // Return a fallback or error
  }
}
