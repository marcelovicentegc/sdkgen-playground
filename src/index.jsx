import React from "react";
import { render } from "react-dom";
import { SdkgenEditor } from "./components/sdkgenEditor";
import { TargetEditor } from "./components/targetEditor";
import styled, { createGlobalStyle } from "styled-components";

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
  height: 100%;
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <AppWrapper>
        <SdkgenEditor />
        <TargetEditor />
      </AppWrapper>
    </>
  );
};

render(<App />, document.getElementById("root"));
