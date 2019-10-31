/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import ReactExport from 'react-export-excel';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  Icon,
  Label,
  Button,
  Input,
  Table,
  Dropdown,
  Grid,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

import PredictionList from 'components/PredictionList';
import LoadDataPage from 'containers/LoadDataPage/Loadable';

import {
  setStartDate,
  setEndDate,
  sendApiRequest,
  apiGetModel,
  changeModel,
  getEstimationRequests,
  getEstimation,
  getValidDates,
} from './actions';

import {
  makeSelectStartDate,
  makeSelectEndDate,
  makeSelectValues,
  makeSelectTrainedModels,
  makeSelectHandleModelChange,
  makeSelectEstimationRequest,
  makeSelectIsPending,
  makeSelectValidDates,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const { ExcelFile } = ReactExport;
const { ExcelSheet, ExcelColumn } = ExcelFile;

export function HomePage({
  startDate,
  endDate,
  values,
  predict,
  getModels,
  handleChangeStartDate,
  handleChangeEndDate,
  options,
  handleModelChange,
  currentModel,
  fetchEstimationRequests,
  estimationRequests,
  isPending,
  handleEstimateChange,
  fetchValidDates,
  validDates,
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    fetchValidDates();
    getModels();
    fetchEstimationRequests();
  }, []);

  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {/*
      <FormattedMessage {...messages.header} /> */}

      <Grid container>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column width={16}>
              <Label circular size="medium">
                Lütfen Tüketim Tahmini İçin Tarih Seçiniz
              </Label>

              <Label size="medium">
                <Icon name="caret right" /> Başlangıç Tarihi:
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={handleChangeStartDate}
              />
              <Label size="medium">
                <Icon name="caret right" /> Bitiş Tarihi:
              </Label>
              <Input
                type="date"
                value={endDate}
                onChange={handleChangeEndDate}
              />
              <Label size="medium">
                <Icon name="caret right" /> Model Seçiniz:
              </Label>
              <Dropdown
                clearable
                options={options || []}
                selection
                value={currentModel}
                loading={!options}
                disabled={!options}
                onChange={handleModelChange}
              />
              <Button
                disabled={!startDate || !endDate}
                animated
                onClick={predict}
              >
                <Button.Content visible>Tahmin Et</Button.Content>
                <Button.Content hidden>
                  <Icon name="search" />
                </Button.Content>
              </Button>
              <ExcelFile
                filename={`${startDate}_${endDate}_${currentModel}`}
                element={
                  <Button disabled={!values || !startDate || !endDate} animated>
                    <Button.Content visible>Save as Excel</Button.Content>
                    <Button.Content hidden>
                      <Icon name="save" />
                    </Button.Content>
                  </Button>
                }
              >
                <ExcelSheet data={values} name="Consumption">
                  <ExcelColumn label="Date" value="day" />
                  <ExcelColumn label="Time" value="time" />
                  <ExcelColumn label="Consumption" value="consumption" />
                  <ExcelColumn label="Estimation" value="estimation" />
                </ExcelSheet>
              </ExcelFile>
              {validDates && (
                <Label>
                  Seçilebilir tarih aralığı: {validDates.start} --{' '}
                  {validDates.end}
                </Label>
              )}
              <LoadDataPage />
              <Label
                className="warningLabel"
                pointing="above"
                circular
                size="medium"
                style={{ display: 'flow-root' }}
              >
                Not: Tüketim Tarihinin Hesaplanması İçin O Tarihten 10 Gün
                Öncesine Kadar Olan Verilerin Yüklenmesi Gerekmektedir
              </Label>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Dimmer active={isPending}>
              <Loader />
            </Dimmer>

            <Grid.Column width={8}>
              {estimationRequests && (
                <PredictionList
                  onItemSelected={handleEstimateChange}
                  predictions={estimationRequests}
                />
              )}
            </Grid.Column>
            <Grid.Column width={8}>
              {values && (
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      {['Gün', 'Saat', 'Gerçek Tüketim', 'Tahmini Tüketim'].map(
                        item => (
                          <Table.HeaderCell key={item}>{item}</Table.HeaderCell>
                        ),
                      )}
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {values.map(value => (
                      <Table.Row key={value.estimation}>
                        <Table.Cell>{value.day}</Table.Cell>
                        <Table.Cell>{value.time}</Table.Cell>
                        <Table.Cell>{value.consumption || '-'}</Table.Cell>
                        <Table.Cell>{value.estimation}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid>
    </div>
  );
}

HomePage.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  values: PropTypes.array,
  options: PropTypes.array,
  currentModel: PropTypes.string,
  predict: PropTypes.func,
  getModels: PropTypes.func,
  handleChangeStartDate: PropTypes.func,
  handleChangeEndDate: PropTypes.func,
  handleModelChange: PropTypes.func,
  fetchEstimationRequests: PropTypes.func,
  estimationRequests: PropTypes.array,
  isPending: PropTypes.bool,
  handleEstimateChange: PropTypes.func,
  fetchValidDates: PropTypes.func,
  validDates: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  startDate: makeSelectStartDate(),
  endDate: makeSelectEndDate(),
  values: makeSelectValues(),
  options: makeSelectTrainedModels(),
  currentModel: makeSelectHandleModelChange(),
  estimationRequests: makeSelectEstimationRequest(),
  isPending: makeSelectIsPending(),
  validDates: makeSelectValidDates(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleChangeStartDate: e => dispatch(setStartDate(e.target.value)),
    handleChangeEndDate: e => dispatch(setEndDate(e.target.value)),
    predict: () => dispatch(sendApiRequest('sa')),
    getModels: () => dispatch(apiGetModel()),
    handleModelChange: (_, { value }) => {
      dispatch(changeModel(value));
    },
    fetchEstimationRequests: () => dispatch(getEstimationRequests()),
    handleEstimateChange: evt => dispatch(getEstimation(evt.target.id)),
    fetchValidDates: () => dispatch(getValidDates()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
