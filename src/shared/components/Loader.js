import React from "react";
import LoadingOverlay from "react-loading-overlay";

function Loader(props) {
  const {
    loading: { isLoading, loadingText },
    children
  } = props;
  return (
    <LoadingOverlay active={isLoading} spinner text={loadingText}>
      {children}
    </LoadingOverlay>
  );
}

export default Loader;
