/**
 *
 * PredictionList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { List, Header, Icon, Grid } from 'semantic-ui-react';

function PredictionList({ predictions, onItemSelected }) {
  return (
    <div>
      <Grid centered>
        <Grid.Row>
          <Header icon>
            <Icon name="cog" />
            Yapılan Tahminler
          </Header>
        </Grid.Row>
        <Grid.Row>
          <List divided selection verticalAlign="middle">
            {predictions.map(prediction => (
              <List.Item onClick={onItemSelected} key={prediction.id}>
                <List.Content>
                  <List.Header id={prediction.id}>
                    İstek tarihi: {prediction.requestDateTime}, Başlangıç
                    tarihi: {prediction.dateTimeStart}, Bitiş tarihi:
                    {prediction.dateTimeEnd}
                  </List.Header>
                </List.Content>
              </List.Item>
            ))}
          </List>
        </Grid.Row>
      </Grid>
    </div>
  );
}

PredictionList.propTypes = {
  predictions: PropTypes.array,
  onItemSelected: PropTypes.func,
};

export default memo(PredictionList);
