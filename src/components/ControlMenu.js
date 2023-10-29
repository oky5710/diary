import React from "react";

const ControlMenu = ({value, onChange, optionList}) => {
  return <select
    value={value}
    onChange={(e) => {
      onChange(e.target.value)
    }}
  >
    {optionList.map((opt) => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
  </select>
}
export default React.memo(ControlMenu);