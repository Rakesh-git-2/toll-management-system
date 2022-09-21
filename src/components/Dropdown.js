import "./Dropdown.css";
function Dropdown({ options, cb }) {
  return (
    <div>
      <select onChange={(e) => cb(e.target.value)}>
        {options.map((o, index) =>
          index == 0 ? (
            <>
              <option size={10}>{"Select an option"}</option>
              <option size={10}>{o}</option>
            </>
          ) : (
            <option size={10}>{o}</option>
          )
        )}
      </select>
    </div>
  );
}

export default Dropdown;
