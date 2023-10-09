const Input = ({
  label,
  placeholder,
  type = "text",
  value,
  changeHandler,
  focusHandler,
  validation,
  validate,
  isFocus,
}) => {
  return (
    <div className="flex flex-col gap-2 text-xl">
      <label htmlFor={label} className="font-semibold">
        {label}
      </label>
      <input
        type={type}
        id={label}
        placeholder={placeholder}
        className="border-b-2 border-b-slate-400 py-3 focus:outline-none"
        value={value}
        onChange={changeHandler}
        onFocus={focusHandler}
      />
      {isFocus && !validate && (
        <p className="text-red-600 text-sm">
          {validation.required && `${label} is required`}
        </p>
      )}
    </div>
  );
};

export default Input;
