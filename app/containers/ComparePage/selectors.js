import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the homePage state domain
 */

const selectComparePageDomain = state => state.comparePage || initialState;

const makeSelectComparePage = () =>
  createSelector(
    selectComparePageDomain,
    substate => substate,
  );

const makeSelectTableData = () =>
  createSelector(
    selectComparePageDomain,
    substate => substate.dataTable,
  );

const makeSelectTableCols = () =>
  createSelector(
    makeSelectTableData(),
    dataTable => dataTable && dataTable.cols,
  );

const makeSelectTableRows = () =>
  createSelector(
    makeSelectTableData(),
    dataTable => dataTable && dataTable.rows,
  );

const makeSelectChartData = () =>
  createSelector(
    makeSelectTableData(),
    dataTable => {
      const chart = {
        labels: [],
        datasets: [
          {
            label: 'Tüketim',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
          {
            label: 'Tahmin',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,11,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
          },
        ],
      };
      if (dataTable) {
        const { rows } = dataTable;
        const consumption = rows.map(row => row[2]);
        const prediction = rows.map(row => row[3]);
        const labels = rows.map(row => row[1]);
        chart.datasets[0].data = consumption;
        chart.datasets[1].data = prediction;
        chart.labels = labels;
      }
      return chart;
    },
  );

export default makeSelectComparePage;
export {
  selectComparePageDomain,
  makeSelectTableData,
  makeSelectTableCols,
  makeSelectTableRows,
  makeSelectChartData,
};
