import React from 'react';
import { withNamespaces } from '@edulastic/localization';
import PropTypes from 'prop-types';

const Progress = ({ t }) => (
  <span>
    {t('progress.loading')}
    ...
  </span>
);

Progress.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withNamespaces('common')(Progress);
