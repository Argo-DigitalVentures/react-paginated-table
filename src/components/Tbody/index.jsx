import React, { PropTypes } from 'react';

import TrComponent from '../Tr';
import TdComponent from '../Td';

import {
  styleType,
  classNameType,
  dataType,
  columnType,
} from '../../propTypes';

function Tbody(props) {
  const {
    style,
    className,
    data,
    columns,
    TrComponent,
    TdComponent,
    trStyle,
    tdStyle,
    trClassName,
    tdClassName,
    ...rest
  } = props;
  return (
    <tbody style={style} className={className} {...rest}>
      {
        data.map((row, rowIndex, data) => (
          <TrComponent
            key={rowIndex} // eslint-disable-line react/no-array-index-key
            style={trStyle}
            className={trClassName}
            columns={columns}
            row={row}
            rowIndex={rowIndex}
            data={data}
            CellComponent={TdComponent}
            cellStyle={tdStyle}
            cellClassName={tdClassName}
          />
        ))
      }
    </tbody>
  );
}

Tbody.defaultProps = {
  style: {},
  className: '',
  TrComponent,
  TdComponent,
  trStyle: {},
  tdStyle: {},
  trClassName: '',
  tdClassName: '',
};

Tbody.propTypes = {
  data: dataType.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  TrComponent: PropTypes.func,
  TdComponent: PropTypes.func,
  trStyle: styleType,
  tdStyle: styleType,
  trClassName: classNameType,
  tdClassName: classNameType,
};

export default Tbody;
