import React, { PropTypes } from 'react';

import {
  dataType,
  columnType,
  classNameType,
  styleType,
} from '../../propTypes';

import { evaluate } from '../../utils';

function Tr(props) {
  const {
    columns,
    row,
    rowIndex,
    data,
    style: rowStyle,
    className: rowClassName,
    CellComponent,
    cellStyle,
    cellClassName,
    ...rest
  } = props;
  const dataProps = { columns, row, rowIndex, data };
  const className = evaluate(rowClassName, dataProps);
  const style = evaluate(rowStyle, dataProps);
  return (
    <tr style={style} className={className} {...rest}>
      {
        columns
          .filter(({ hidden }) => !hidden)
          .map((column, columnIndex, columns) => (
            <CellComponent
              key={column.id}
              style={cellStyle}
              className={cellClassName}
              column={column}
              columnIndex={columnIndex}
              columns={columns}
              row={row}
              rowIndex={rowIndex}
              data={data}
            />
          ))
      }
    </tr>
  );
}

Tr.defaultProps = {
  style: {},
  className: '',
  cellStyle: {},
  cellClassName: '',
};

Tr.propTypes = {
  data: dataType.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  row: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  rowIndex: PropTypes.number.isRequired,
  CellComponent: PropTypes.func.isRequired,
  style: styleType,
  className: classNameType,
  cellStyle: styleType,
  cellClassName: classNameType,
};

export default Tr;
