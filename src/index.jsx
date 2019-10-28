import "@babel/polyfill";
import React, { memo } from "react";
import { render } from "react-dom";
import { Editor } from "./components/editor";
import styled, { createGlobalStyle } from "styled-components";
import { CompileTriggerer } from "./components/compileTriggerer";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import { Header, targetLanguages } from "./components/header";
import { Notification } from "./components/notification";
import { MessageBarType } from "office-ui-fabric-react";
import { SEO } from "./components/seo";

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
  height: calc(100% - ${props => (props.withNotification ? "88px" : "56px")});

  > div {
    overflow: auto;
  }
`;

const App = memo(() => {
  const [sdkgenCode, setSdkgenCode] = React.useState("");
  const [targetCode, setTargetCode] = React.useState("");
  const [targetLanguage, setTargetLanguage] = React.useState(
    targetLanguages.typescriptNodeClient
  );
  const [notification, setNotification] = React.useState({
    message: "",
    type: 0
  });
  const [touched, setTouched] = React.useState(false);
  const [fetched, setFetched] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    if (!touched && !fetched) {
      fetchAndCompileExampleCodes();
    }
  });

  const handleTargetLanguageSelection = currentTargetLanguage => {
    if (targetLanguage !== currentTargetLanguage) {
      setTargetLanguage(currentTargetLanguage);
      compile(currentTargetLanguage);
    }
  };

  const compile = async targetLanguage => {
    setIsLoading(true);
    fetch("http://localhost:8080/gen", {
      method: "POST",
      headers: {
        Accept: "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        Sdkgen: sdkgenCode,
        Target: targetLanguage.key,
        TargetFileExtension: targetLanguage.fileExt
      })
    })
      .then(response => {
        if (response.status === 400) {
          setNotification({
            message: "Syntax error",
            type: MessageBarType.error
          });
          setTargetCode("");
          return;
        }

        if (response.status === 500) {
          setNotification({
            message: "Oooooooooops, something went wrong on the server-side",
            type: MessageBarType.error
          });
          return;
        }

        response.json().then(targetCode => {
          setTargetCode(targetCode);
          setNotification(undefined);
        });
      })
      .catch(() => {
        setNotification({
          message: "Syntax error",
          type: MessageBarType.error
        });
      })
      .finally(() => setIsLoading(false));
  };

  const fetchAndCompileExampleCodes = async () => {
    setIsLoading(true);
    fetch("http://localhost:8080/example")
      .then(response => {
        if (response.status === 500) {
          setNotification({
            message: "Syntax error",
            type: MessageBarType.error
          });
          return;
        }

        response.json().then(exampleCode => {
          setSdkgenCode(exampleCode.Sdkgen);
          setTargetCode(exampleCode.Target);
          setTargetLanguage(targetLanguages.typescriptNodeClient);
          setNotification(undefined);
        });
      })
      .finally(() => {
        setIsLoading(false);
        setFetched(true);
      });
  };

  return (
    <>
      <SEO />
      <GlobalStyle />
      <Header
        selectedTargetLanguage={targetLanguage}
        setSelectedTargetLanguage={handleTargetLanguageSelection}
      />
      {notification && notification.message && (
        <Notification
          message={notification.message}
          messageBarType={notification.type}
          dismiss={() => setNotification(undefined)}
        />
      )}
      <AppWrapper withNotification={notification && notification.message}>
        <Editor
          target="sdkgen"
          code={sdkgenCode}
          setCode={code => setSdkgenCode(code)}
          setTouched={flag => setTouched(flag)}
        />
        <CompileTriggerer
          onClick={compile}
          isLoading={isLoading}
          targetLanguage={targetLanguage}
        />
        <Editor code={targetCode} target={targetLanguage.monaco} />
      </AppWrapper>
    </>
  );
});

render(<App />, document.getElementById("root"));
