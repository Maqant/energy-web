/**
 *
 * ComparePage
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { Table } from 'semantic-ui-react';
import { Line } from 'react-chartjs-2';
import 'chartjs-plugin-annotation';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectComparePage, {
  makeSelectTableCols,
  makeSelectTableRows,
  makeSelectTableData,
  makeSelectChartData,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { loadExcel } from './actions';

export function ComparePage({ cols, rows, chartData, onLoad }) {
  useInjectReducer({ key: 'comparePage', reducer });
  useInjectSaga({ key: 'comparePage', saga });

  return (
    <div className="compareInherit">
      <input type="file" onChange={onLoad} style={{ padding: '10px' }} />
      <div className="compareChart">
        {rows && cols ? (
          <Table className="tableName">
            <Table.Header>
              <Table.Row>
                {cols.map(col => (
                  <Table.HeaderCell key={col.key}>{col.name}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map(row => (
                <Table.Row key={row}>
                  <Table.Cell>{row[0]}</Table.Cell>
                  <Table.Cell>{row[1]}</Table.Cell>
                  <Table.Cell>{row[2]}</Table.Cell>
                  <Table.Cell>{row[3]}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        ) : null}
        {chartData ? (
          <div>
            <h2>Tüketim Karşılaştırması</h2>
            <Line data={chartData} width={750} height={400} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

ComparePage.propTypes = {
  cols: PropTypes.array,
  rows: PropTypes.array,
  onLoad: PropTypes.func,
  chartData: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  comparePage: makeSelectComparePage(),
  cols: makeSelectTableCols(),
  rows: makeSelectTableRows(),
  dataTable: makeSelectTableData(),
  chartData: makeSelectChartData(),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoad: e => dispatch(loadExcel(e)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ComparePage);
