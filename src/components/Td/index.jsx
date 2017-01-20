import React, { PropTypes } from 'react';
import get from 'lodash.get';

import {
  dataType,
  columnType,
  classNameType,
  styleType,
} from '../../propTypes';

import { evaluate } from '../../utils';

function Td(props) {
  const {
    column,
    columnIndex,
    columns,
    row,
    rowIndex,
    data,
    style: cellStyle,
    className: cellClassName,
    ...rest
  } = props;
  const value = (
    typeof column.selector === 'function' ?
    column.selector(row) :
    get(row, column.selector, null)
  );
  const dataProps = { value, column, columnIndex, columns, row, rowIndex, data };
  const className = evaluate(cellClassName, dataProps);
  const style = evaluate(cellStyle, dataProps);
  return (
    <td style={style} className={className} {...rest}>
      {
        typeof column.render === 'function' ? (
          <column.render {...dataProps} />
        ) : value
      }
    </td>
  );
}

Td.defaultProps = {
  style: {},
  className: '',
};

Td.propTypes = {
  data: dataType.isRequired,
  column: columnType.isRequired,
  columnIndex: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  row: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  rowIndex: PropTypes.number.isRequired,
  style: styleType,
  className: classNameType,
};

export default Td;
