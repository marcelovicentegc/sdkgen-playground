import React from "react";
import PropTypes from "prop-types";
import { MessageBar } from "office-ui-fabric-react";

export const Notification = props => {
  return (
    <MessageBar
      messageBarType={props.messageBarType}
      isMultiline={false}
      onDismiss={props.dismiss}
      dismissButtonAriaLabel="Close"
    >
      {props.message}
    </MessageBar>
  );
};

Notification.propTypes = {
  message: PropTypes.string,
  messageBarType: PropTypes.number,
  dismiss: function() {}
};
