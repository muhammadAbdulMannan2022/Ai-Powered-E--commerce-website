import { ChevronDown } from "lucide-react";

const Select = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  options = [],
  disabled,
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-[#60701E] mb-1">
        {label}
      </label>
      <div className="relative w-full">
        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="p-2 pr-8 bg-[#E8EECE] border border-[#E0EDAD] rounded-md w-full focus:outline-none text-[#A8A8A8] appearance-none cursor-pointer"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#90A53A] w-4 h-4 pointer-events-none" />
      </div>
    </div>
  );
};

export default Select;
