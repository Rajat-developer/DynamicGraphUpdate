import React from "react";
import Select from "react-select";

const Dropdowns = ({ options, onChange, label, value }) => {
  return (
    <div>
      <label>{label}</label>
      <Select
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={onChange}
      />
    </div>
  );
};

export default Dropdowns;
