/**
 *
 * LoadDataPage
 *
 */

import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Button } from 'semantic-ui-react';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { loadExcel } from './actions';
import { makeSelectIsPending } from './selectors';
import reducer from './reducer';
import saga from './saga';

export function LoadDataPage({ handleLoad, isPending }) {
  useInjectReducer({ key: 'loadDataPage', reducer });
  useInjectSaga({ key: 'loadDataPage', saga });

  const fileInputRef = useRef();

  return (
    <div>
      <Helmet>
        <title>LoadDataPage</title>
        <meta name="description" content="Description of LoadDataPage" />
      </Helmet>

      <Button
        loading={isPending}
        content="Veri Yükle"
        labelPosition="left"
        icon="file"
        onClick={() => fileInputRef.current.click()}
      />
      <input ref={fileInputRef} type="file" hidden onChange={handleLoad} />
    </div>
  );
}

LoadDataPage.propTypes = {
  handleLoad: PropTypes.func,
  isPending: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  isPending: makeSelectIsPending(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleLoad: e => dispatch(loadExcel(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoadDataPage);
