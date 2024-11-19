import Select, { components, GroupBase, InputProps, OptionProps, StylesConfig } from "react-select";
import "./App.css";
import { JSX } from "react/jsx-runtime";
import { ClassAttributes, HTMLAttributes, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

function App() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      // Default styles
      border: "1px solid black",
      cursor: "pointer",
      // Hover styles
      "&:hover": {
        borderColor: "blue",
        boxShadow: "0 0 5px rgba(0, 0, 255, 0.2)",
      },
    }),

    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "seaGreen" : "white",
      color: state.isFocused ? "white" : "black",
      fontWeight: "bold",
      ":hover": {
        backgroundColor: "seagreen",
        color: "white",
        cursor: "pointer",
      },
    }),

    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: "black",
      };
    },

    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
      transform: state.isFocused ? "rotate(180deg)" : undefined,
    }),
  };

  const CustomInput = (props: JSX.IntrinsicAttributes & InputProps<unknown, boolean, GroupBase<unknown>>) => (
    <components.Input {...props} aria-describedby="helper-text error-message" aria-controls="custom-listbox" />
  );

  const CustomOption = (props: JSX.IntrinsicAttributes & OptionProps<unknown, boolean, GroupBase<unknown>>) => {
    return (
      <components.Option {...props}>
        <div aria-selected={props.isSelected} id="test">
          {props.children}
        </div>
      </components.Option>
    );
  };

  const CustomMenu = (props: {
    innerProps: JSX.IntrinsicAttributes & ClassAttributes<HTMLDivElement> & HTMLAttributes<HTMLDivElement>;
    children: string | number | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | null | undefined;
  }) => {
    return (
      <div
        tabIndex={-1}
        id="custom-listbox"
        role="listbox"
        {...props.innerProps}
        style={{ maxHeight: 200, overflowY: "auto", boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 4px 11px" }}
      >
        {props.children}
      </div>
    );
  };

  return (
    <>
      <h1>React Select Example</h1>
      <label htmlFor="my-label">Select a color</label>
      <p id="helper-text">Helper text for the React Select component.</p>
      <Select
        className="custom-select"
        inputId="my-label"
        options={options}
        styles={customStyles}
        placeholder="Select a color" // remove value to hide placeholder
        components={{ Input: CustomInput, Option: CustomOption, Menu: CustomMenu }}
        required
      />
      <div id="error-message" className="error-message">
        <p>Error message for the React Select component.</p>
      </div>
    </>
  );
}

export default App;
