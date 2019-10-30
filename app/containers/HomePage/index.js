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
import { Icon, Label, Button, Input, Table, Dropdown } from 'semantic-ui-react';

import {
  setStartDate,
  setEndDate,
  sendApiRequest,
  apiGetModel,
  changeModel,
} from './actions';

import {
  makeSelectStartDate,
  makeSelectEndDate,
  makeSelectValues,
  makeSelectTrainedModels,
  makeSelectHandleModelChange,
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
}) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  useEffect(() => {
    getModels();
  }, []);

  /* const dataSet1 = [
    {
      name: 'Johson',
      amount: 30000,
      sex: 'M',
      is_married: true,
    },
    {
      name: 'Monika',
      amount: 355000,
      sex: 'F',
      is_married: false,
    },
    {
      name: 'John',
      amount: 250000,
      sex: 'M',
      is_married: false,
    },
    {
      name: 'Josef',
      amount: 450500,
      sex: 'M',
      is_married: true,
    },
  ];

  const dataSet2 = [
    {
      name: 'Johnson',
      total: 25,
      remainig: 16,
    },
    {
      name: 'Josef',
      total: 25,
      remainig: 7,
    },
  ]; */

  return (
    <div>
      <Helmet>
        <title>HomePage</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      {/* 
      <FormattedMessage {...messages.header} /> */}

      <div className="Home">
        <Label circular size="medium">
          Lütfen Tüketim Tahmini İçin Tarih Seçiniz
        </Label>

        <Label size="medium">
          <Icon name="caret right" /> Başlangıç Tarihi:
        </Label>
        <Input type="date" value={startDate} onChange={handleChangeStartDate} />
        <Label size="medium">
          <Icon name="caret right" /> Bitiş Tarihi:
        </Label>
        <Input type="date" value={endDate} onChange={handleChangeEndDate} />
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
        <Button animated onClick={predict}>
          <Button.Content visible>Tahmin Et</Button.Content>
          <Button.Content hidden>
            <Icon name="search" />
          </Button.Content>
        </Button>
        <ExcelFile
          filename={`${startDate}_${endDate}_${currentModel}`}
          element={
            <Button
              disabled={!values || !startDate || !endDate}
              animated
              floated="right"
              circular
              size="large"
            >
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
          </ExcelSheet>
        </ExcelFile>

        <br />
        <Label
          className="warningLabel"
          pointing="above"
          circular
          size="medium"
          style={{ display: 'flow-root' }}
        >
          Not: Tüketim Tarihinin Hesaplanması İçin O Tarihten 10 Gün Öncesine
          Kadar Olan Verilerin Yüklenmesi Gerekmektedir
        </Label>
        <br />

        {values && (
          <Table celled>
            <Table.Header>
              <Table.Row>
                {['Day', 'Time', 'Consumption'].map(item => (
                  <Table.HeaderCell key={item}>{item}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {values.map(value => (
                <Table.Row key={value.consumption}>
                  <Table.Cell>{value.day}</Table.Cell>
                  <Table.Cell>{value.time}</Table.Cell>
                  <Table.Cell>{value.consumption}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
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
};

const mapStateToProps = createStructuredSelector({
  startDate: makeSelectStartDate(),
  endDate: makeSelectEndDate(),
  values: makeSelectValues(),
  options: makeSelectTrainedModels(),
  currentModel: makeSelectHandleModelChange(),
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
