function TextInputWithLabel({

    elementId,
    ref,
    onChange,
    labelText,
    value,
    name,
    placeholder,
    required,
}) 

{
  return (
      <>
      <label htmlFor={elementId}>{labelText}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;