import React from "react";
import MonacoEditor from "react-monaco-editor";
import PropTypes from "prop-types";

export const Editor = props => {
  const onChange = (newValue, e) => {
    props.setCode(newValue);
    props.setTouched(true);
  };

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    readOnly: props.target !== "sdkgen"
  };

  return (
    <MonacoEditor
      language={props.target}
      theme="vs-dark"
      value={props.code}
      options={options}
      onChange={onChange}
    />
  );
};

Editor.propTypes = {
  code: PropTypes.string,
  target: PropTypes.string,
  setCode: function(code) {},
  setTouched: function(flag) {}
};
