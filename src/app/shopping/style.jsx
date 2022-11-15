export const CreateuserInput = (props) => {
  const complete = (props) => {
    switch (props.complete) {
      case 1:
        return "text-bg-primary";
      case 2:
        return "text-bg-danger";
      default:
        return "";
    }
  };
  return (
    <>
      <div class="input-group mt-4 shadow">
        <span class={`input-group-text ${complete(props)}`}>{props.name}</span>
        <input
          type={props.type}
          name={props.name}
          class="form-control "
          placeholder={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          maxLength={props.maxLength}
          readOnly={props.readOnly}
          multiple={props.multiple}
          onClick={props.onClick}
          defaultValue={props.defaultValue}
          onFocus={props.Focus}
          onBlur={props.onBlur}
        />
      </div>
    </>
  );
};
