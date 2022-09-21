import "./Table.css";
function DisplayTable({ data }) {
  return (
    <div>
      <table>
        <thead>
          {data.heading.map((h) => (
            <th>{h}</th>
          ))}
        </thead>
        <tbody>
          {data.records.map((record) => {
            return (
              <tr>
                {Object.values(record).map((item) => (
                  <td>{item}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
        {!data.records.length && (
          <td className="center" colSpan={5} style={{ padding: "20px 0" }}>
            No records found
          </td>
        )}
      </table>
    </div>
  );
}

export default DisplayTable;
