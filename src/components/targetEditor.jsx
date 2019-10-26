import React from "react";
import MonacoEditor from "react-monaco-editor";

export class TargetEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "// type your code...",
      target: "typescript"
    };
  }

  editorDidMount(editor, monaco) {
    console.log("editorDidMount", editor);
    editor.focus();
  }
  onChange(newValue, e) {
    console.log("onChange", newValue, e);
  }
  render() {
    const code = this.state.code;
    const options = {
      selectOnLineNumbers: true,
      automaticLayout: true
    };
    return (
      <MonacoEditor
        language={this.state.target}
        theme="vs-dark"
        value={code}
        options={options}
        onChange={this.onChange}
        editorDidMount={this.editorDidMount}
      />
    );
  }
}
