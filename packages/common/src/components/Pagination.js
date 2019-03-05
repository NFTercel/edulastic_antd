import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { white, greenDark, grey, green } from '@edulastic/colors';
import { withNamespaces } from '@edulastic/localization';

const Pagination = ({ onPrevious, onNext, page, itemsPerPage, count, loading, t }) => {
  // eslint-disable-next-line
  const isLastPage = Math.ceil(count / itemsPerPage) === page;

  return (
    <Container loading={loading}>
      {page === 1 || loading ? (
        <Btn disabled>
          <FaChevronLeft style={{ marginRight: 10 }} /> {t('pagination.previous')}
        </Btn>
      ) : (
        <Btn onClick={onPrevious}>
          <FaChevronLeft style={{ marginRight: 10 }} /> {t('pagination.previous')}
        </Btn>
      )}

      <Info>
        {page} {t('pagination.to')} {itemsPerPage} {t('pagination.of')} <i>{count}</i>
      </Info>

      {isLastPage || loading ? (
        <Btn disabled>
          {t('pagination.next')} <FaChevronRight style={{ marginLeft: 10 }} />
        </Btn>
      ) : (
        <Btn onClick={onNext}>
          {t('pagination.next')} <FaChevronRight style={{ marginLeft: 10 }} />
        </Btn>
      )}
    </Container>
  );
};

Pagination.propTypes = {
  onPrevious: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  loading: PropTypes.bool,
};

Pagination.defaultProps = {
  loading: false,
};

export default withNamespaces('common')(Pagination);

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1);
  padding: 20px 50px;
  background: ${white};
  cursor: ${({ loading }) => (loading ? 'progress' : 'default')};
`;

const Btn = styled.span`
  color: ${({ disabled }) => (disabled ? grey : greenDark)};
  display: flex;
  align-items: center;

  :hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    color: ${({ disabled }) => (disabled ? grey : green)};
  }
`;

const Info = styled.span`
  color: #434b5d;
  font-size: 13px;
`;
