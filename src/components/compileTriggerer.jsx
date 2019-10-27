import React from "react";
import styled from "styled-components";
import { Icon } from "office-ui-fabric-react/lib/Icon";
import PropType from "prop-types";
import { Spinner } from "office-ui-fabric-react";

const CompileTriggererButtonWrapper = styled.div`
  position: absolute;
  top: 30px;
  right: calc(50% - 22.5px);
  height: 55px;
  width: 55px;
  cursor: ${props => (props.isLoading ? "default" : "pointer")};
  z-index: 1;

  > i,
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    height: 45px;
    width: 45px;
    border: 5px solid #eee;
    background-color: #fff;
    border-radius: 50%;
  }
`;

export const CompileTriggerer = props => {
  return (
    <CompileTriggererButtonWrapper isLoading={props.isLoading}>
      {props.isLoading ? (
        <div>
          <Spinner />
        </div>
      ) : (
        <Icon iconName={"CaretSolidRight"} onClick={props.onClick}></Icon>
      )}
    </CompileTriggererButtonWrapper>
  );
};

CompileTriggerer.propTypes = {
  isLoading: PropType.bool,
  onClick: function() {}
};
