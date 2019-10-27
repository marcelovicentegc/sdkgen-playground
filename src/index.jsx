import React from "react";
import { render } from "react-dom";
import { Editor } from "./components/editor";
import styled, { createGlobalStyle } from "styled-components";
import { CompileTriggerer } from "./components/compileTriggerer";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Header, targetLanguages } from "./components/header";

initializeIcons();

const GlobalStyle = createGlobalStyle`
    html {
        width: 100vw;
        height: 100vh;
    
        body {
            margin: 0;
            height: 100%;

            div#root {
                height: 100%;
            }
        }
    }
`;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 12px;
  background-color: #1e1e1e;
  height: calc(100% - 56px);
`;

const App = () => {
  React.useEffect(() => {
    if (!touched && !fetched) {
      fetchAndCompileExampleCodes();
    }
  });
  const [sdkgenCode, setSdkgenCode] = React.useState();
  const [targetCode, setTargetCode] = React.useState();
  const [targetLanguage, setTargetLanguage] = React.useState(
    targetLanguages.typescriptNodeClient
  );
  const [touched, setTouched] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const compile = () => {
    // write sdkgenCode to playground.sdkgen (server-side)
    // and then call the sdkgen script (sdkgen.sh)(on server-side)
    // with the file format and the target as arguments
  };

  const fetchAndCompileExampleCodes = () => {
    setIsLoading(true);
    fetch("http://localhost:8080/example")
      .then(response => {
        response.json().then(exampleCode => {
          setSdkgenCode(exampleCode.Sdkgen);
          setTargetCode(exampleCode.Target);
          setTargetLanguage(targetLanguages.typescriptNodeClient);
        });
      })
      .catch(error => console.log("error: ", error))
      .finally(() => {
        setIsLoading(false);
        setFetched(true);
      });
  };

  return (
    <>
      <GlobalStyle />
      <Header
        selectedTargetLanguage={targetLanguage}
        setSelectedTargetLanguage={selectedTargetLanguage =>
          setTargetLanguage(selectedTargetLanguage)
        }
      />
      <AppWrapper>
        <Editor
          target="sdkgen"
          code={sdkgenCode}
          setCode={code => setSdkgenCode(code)}
          setTouched={flag => setTouched(flag)}
        />
        <CompileTriggerer onClick={compile} isLoading={isLoading} />
        <Editor
          code={targetCode}
          setCode={code => setTargetCode(code)}
          target={targetLanguage.monaco}
        />
      </AppWrapper>
    </>
  );
};

render(<App />, document.getElementById("root"));
