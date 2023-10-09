export default function Select({value, options, onChange}) {

  return <select value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
  </select>
}