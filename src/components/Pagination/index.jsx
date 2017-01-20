import React, { PropTypes } from 'react';
import range from 'lodash.range';

import PreviousComponent from '../Previous';
import NextComponent from '../Next';

import {
  styleType,
  classNameType,
} from '../../propTypes';

function Pagination(props) {
  const {
    style,
    className,
    count,
    page,
    pageSize,
    showPageJump,
    showPageSizeOptions,
    pageSizeOptions,
    PreviousComponent,
    NextComponent,
    previousStyle,
    nextStyle,
    previousClassName,
    nextClassName,
    setPageSize,
    jumpToPage,
    incrementPage,
    decrementPage,
    ...rest
  } = props;
  const numberOfPages = Math.ceil(count / pageSize);
  return (
    <div style={style} className={className} {...rest}>
      <PreviousComponent
        style={previousStyle}
        className={previousClassName}
        onClick={decrementPage}
        disabled={page <= 1}
      />
      {
        showPageJump ? (
          <div>
            {'Page '}
            <select
              value={page}
              onChange={e => jumpToPage(Number(e.target.value))}
            >
              {
                range(1, numberOfPages + 1).map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
              }
            </select>
            {` of ${Math.ceil(count / pageSize)}`}
          </div>
        ) : null
      }
      <NextComponent
        style={nextStyle}
        className={nextClassName}
        onClick={incrementPage}
        disabled={page >= numberOfPages}
      />
      {
        showPageSizeOptions ? (
          <div>
            <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
              {
                pageSizeOptions.map(pageSize => (
                  <option key={pageSize} value={pageSize}>{pageSize}</option>
                ))
              }
            </select>
          </div>
        ) : null
      }
    </div>
  );
}

Pagination.defaultProps = {
  style: {},
  className: '',
  showPageJump: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  PreviousComponent,
  NextComponent,
  previousStyle: {},
  nextStyle: {},
  previousClassName: '',
  nextClassName: '',
};

Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  setPageSize: PropTypes.func.isRequired,
  jumpToPage: PropTypes.func.isRequired,
  incrementPage: PropTypes.func.isRequired,
  decrementPage: PropTypes.func.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  showPageJump: PropTypes.bool,
  showPageSizeOptions: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  PreviousComponent: PropTypes.func.isRequired,
  NextComponent: PropTypes.func.isRequired,
  previousStyle: styleType,
  nextStyle: styleType,
  previousClassName: classNameType,
  nextClassName: classNameType,
};

export default Pagination;
