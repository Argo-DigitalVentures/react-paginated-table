import React, { PropTypes } from 'react';

import TheadComponent from '../Thead';
import TbodyComponent from '../Tbody';
import TrComponent from '../Tr';
import ThComponent from '../Th';
import TdComponent from '../Td';

import {
  styleType,
  classNameType,
  dataType,
  columnType,
  sortType,
} from '../../propTypes';

function Table(props) {
  const {
    data,
    columns,
    sorts,
    handleHeaderClick,
    TheadComponent,
    TbodyComponent,
    TrComponent,
    ThComponent,
    TdComponent,
    theadStyle,
    tbodyStyle,
    trStyle,
    thStyle,
    tdStyle,
    theadClassName,
    tbodyClassName,
    trClassName,
    thClassName,
    tdClassName,
    ...rest
  } = props;
  return (
    <table {...rest}>
      <TheadComponent
        style={theadStyle}
        className={theadClassName}
        data={data}
        columns={columns}
        sorts={sorts}
        handleHeaderClick={handleHeaderClick}
        ThComponent={ThComponent}
        thStyle={thStyle}
        thClassName={thClassName}
      />
      <TbodyComponent
        style={tbodyStyle}
        className={tbodyClassName}
        data={data}
        columns={columns}
        TrComponent={TrComponent}
        TdComponent={TdComponent}
        trStyle={trStyle}
        tdStyle={tdStyle}
        trClassName={trClassName}
        tdClassName={tdClassName}
      />
    </table>
  );
}

Table.defaultProps = {
  style: {},
  className: '',
  TheadComponent,
  TbodyComponent,
  TrComponent,
  ThComponent,
  TdComponent,
  theadStyle: {},
  tbodyStyle: {},
  trStyle: {},
  thStyle: {},
  tdStyle: {},
  theadClassName: '',
  tbodyClassName: '',
  trClassName: '',
  thClassName: '',
  tdClassName: '',
};

Table.propTypes = {
  data: dataType.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  sorts: PropTypes.arrayOf(sortType).isRequired,
  handleHeaderClick: PropTypes.func.isRequired,
  style: styleType,
  className: classNameType,
  TheadComponent: PropTypes.func,
  TbodyComponent: PropTypes.func,
  TrComponent: PropTypes.func,
  ThComponent: PropTypes.func,
  TdComponent: PropTypes.func,
  theadStyle: styleType,
  tbodyStyle: styleType,
  trStyle: styleType,
  thStyle: styleType,
  tdStyle: styleType,
  theadClassName: classNameType,
  tbodyClassName: classNameType,
  trClassName: classNameType,
  thClassName: classNameType,
  tdClassName: classNameType,
};

export default Table;
