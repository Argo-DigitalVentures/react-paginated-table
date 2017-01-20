import React, { PropTypes } from 'react';

import ThComponent from '../Th';

import {
  styleType,
  classNameType,
  dataType,
  columnType,
  sortType,
} from '../../propTypes';

function Thead(props) {
  const {
    style,
    className,
    data,
    columns,
    sorts,
    handleHeaderClick,
    ThComponent,
    thStyle,
    thClassName,
    ...rest
  } = props;
  return (
    <thead style={style} className={className} {...rest}>
      <tr>
        {
          columns.map((column, columnIndex, columns) => (
            <ThComponent
              key={column.id}
              style={thStyle}
              className={thClassName}
              column={column}
              columnIndex={columnIndex}
              columns={columns}
              data={data}
              sorts={sorts}
              handleHeaderClick={handleHeaderClick}
            />
          ))
        }
      </tr>
    </thead>
  );
}

Thead.defaultProps = {
  style: {},
  className: '',
  ThComponent,
  thStyle: {},
  thClassName: '',
};

Thead.propTypes = {
  data: dataType.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  sorts: PropTypes.arrayOf(sortType).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  ThComponent: PropTypes.func,
  thStyle: styleType,
  thClassName: classNameType,
};

export default Thead;
