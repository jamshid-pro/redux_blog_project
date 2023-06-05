

const Input = ({ type='text', label, state, setState }) => {
  const capitalize = () => {
    return label.charAt(0).toUpperCase() +""+ label.slice(1)
  }
  return (
    <div className="form-floating mt-3">
      <input
        type={type}
        className="form-control"
        id={`floating${capitalize()}`}
        placeholder={label}
        onChange={(e) => setState(e.target.value)}
        value={state}
      />
      <label htmlFor={`floating${capitalize()}`}>{capitalize()}</label>
    </div>
  );
};

export default Input;
