const TextArea = ({ label, state, setState }) => {
  const capitalize = () => {
    return label.charAt(0).toUpperCase() + "" + label.slice(1);
  };
  return (
    <div className="form-floating">
      <textarea
        className="form-control"
        placeholder="Leave a comment here"
        id={`floating${capitalize()}`}
        style={{height: "100px"}}
        onChange={(e) => setState(e.target.value)}
        value={state}
      ></textarea>
      <label htmlFor={`floating${capitalize()}`}>{label}</label>
    </div>
  );
};

export default TextArea;
