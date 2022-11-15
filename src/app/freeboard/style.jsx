export const FloatingInput = (props) => {
  return (
    <div class="form-floating">
      <input
        id={props.name}
        name={props.name}
        className={props.name}
        type={props.type}
        class="form-control shadow form-control-lg "
        placeholder={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        maxLength={props.maxLength}
        readOnly={props.readOnly}
        multiple={props.multiple}
        onClick={props.onClick}
        defaultValue={props.defaultValue}
      />
      <label for={props.name}>{props.label}</label>
    </div>
  );
};

export const subjectInput = (props) => {
  return (
    <div>
      <label for={props.name} class="form-label">
        {props.label}
      </label>
      <input
        id={props.name}
        name={props.name}
        className={props.name}
        type={props.type}
        class="form-control shadow form-control-lg "
        placeholder={props.name}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
        maxLength={props.maxLength}
        readOnly={props.readOnly}
        multiple={props.multiple}
        onClick={props.onClick}
        defaultValue={props.defaultValue}
        onFocus={props.onFocus}
      />
    </div>
  );
};
