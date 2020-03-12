import React from "react";
import { connect } from "react-redux";
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

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(Loader);
