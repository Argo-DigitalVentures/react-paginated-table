import React, { PropTypes } from 'react';
import find from 'lodash.find';
import get from 'lodash.get';

import {
  dataType,
  columnType,
  classNameType,
  styleType,
  sortType,
} from '../../propTypes';

import { evaluate } from '../../utils';

function getSortDirection(columnId, sorts) {
  const sort = find(sorts, sort => sort.id === columnId);
  return get(sort, 'direction', null);
}

function Th(props) {
  const {
    style: cellStyle,
    className: cellClassName,
    column,
    columnIndex,
    columns,
    data,
    sorts,
    handleHeaderClick,
    ...rest
  } = props;
  const sortDirection = getSortDirection(column.id, sorts);
  const dataProps = { column, columnIndex, columns, data, sortDirection };
  const style = evaluate(cellStyle, dataProps);
  const className = evaluate(cellClassName, dataProps);
  return (
    <th // eslint-disable-line jsx-a11y/no-static-element-interactions
      style={style}
      className={className}
      onClick={e => handleHeaderClick(column.id, e.shiftKey)}
      {...rest}
    >
      {
        typeof column.header === 'function' ? (
          <column.header {...dataProps} />
        ) : column.header
      }
    </th>
  );
}

Th.defaultProps = {
  style: {},
  className: '',
};

Th.propTypes = {
  column: columnType.isRequired,
  columnIndex: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  data: dataType.isRequired,
  sorts: PropTypes.arrayOf(sortType).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  style: styleType,
  className: classNameType,
};

export default Th;
