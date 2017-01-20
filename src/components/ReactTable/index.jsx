import React, { PureComponent, PropTypes } from 'react';
import find from 'lodash.find';

import TableComponent from '../Table';
import TheadComponent from '../Thead';
import TbodyComponent from '../Tbody';
import TrComponent from '../Tr';
import ThComponent from '../Th';
import TdComponent from '../Td';
import PaginationComponent from '../Pagination';
import PreviousComponent from '../Previous';
import NextComponent from '../Next';
import LoadingComponent from '../Loading';

import {
  dataType,
  columnType,
  sortType,
  styleType,
  classNameType,
} from '../../propTypes';

class ReactTable extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sorts: [...props.initialSorts],
      pageSize: props.pageSize,
      page: 1,
    };
    this.changeSort = ::this.changeSort;
    this.setPageSize = ::this.setPageSize;
    this.jumpToPage = ::this.jumpToPage;
    this.incrementPage = ::this.incrementPage;
    this.decrementPage = ::this.decrementPage;
  }

  componentWillMount() {
    this.onChange();
  }

  onChange() {
    this.props.onChange({
      ...this.state,
      count: this.props.count,
    });
  }

  setSort(sorts) {
    this.setState({ sorts }, this.onChange);
  }

  setPageSize(pageSize) {
    this.setState({ pageSize, page: 1 }, this.onChange);
  }

  changeSort(columnId, additive) {
    const sort = find(this.state.sorts, sort => sort.columnId === columnId);
    const sorts = additive ? this.state.sorts.filter(sort => sort.columnId !== columnId) : [];
    const newSort = sort && sort.direction === 'DESC' ? [] : [{
      columnId,
      direction: !sort ? 'ASC' : 'DESC',
    }];
    const newSorts = [...sorts, ...newSort];
    this.setSort(newSorts);
  }

  jumpToPage(page) {
    this.setState({ page }, this.onChange);
  }

  incrementPage() {
    this.jumpToPage(this.state.page + 1);
  }

  decrementPage() {
    this.jumpToPage(this.state.page - 1);
  }

  render() {
    const {
      sorts,
      pageSize,
      page,
    } = this.state;
    const {
      /* eslint-disable no-unused-vars */
      initialSorts,
      pageSize: pageSizeProp,
      onChange,
      /* eslint-enable no-unused-vars */
      data,
      columns,
      loading,
      count,
      showPagination,
      showPageJump,
      showPageSizeOptions,
      pageSizeOptions,
      TableComponent,
      TheadComponent,
      TbodyComponent,
      TrComponent,
      ThComponent,
      TdComponent,
      PaginationComponent,
      PreviousComponent,
      NextComponent,
      LoadingComponent,
      tableStyle,
      theadStyle,
      tbodyStyle,
      trStyle,
      thStyle,
      tdStyle,
      paginationStyle,
      previousStyle,
      nextStyle,
      loadingStyle,
      tableClassName,
      theadClassName,
      tbodyClassName,
      trClassName,
      thClassName,
      tdClassName,
      paginationClassName,
      previousClassName,
      nextClassName,
      loadingClassName,
      ...rest
    } = this.props;
    return (
      <div {...rest}>
        { loading ? <LoadingComponent style={loadingStyle} className={loadingClassName} /> : null }
        <TableComponent
          style={tableStyle}
          className={tableClassName}
          data={data}
          columns={columns}
          sorts={sorts}
          handleHeaderClick={this.changeSort}
          TheadComponent={TheadComponent}
          TbodyComponent={TbodyComponent}
          TrComponent={TrComponent}
          ThComponent={ThComponent}
          TdComponent={TdComponent}
          theadStyle={theadStyle}
          tbodyStyle={tbodyStyle}
          trStyle={trStyle}
          thStyle={thStyle}
          tdStyle={tdStyle}
          theadClassName={theadClassName}
          tbodyClassName={tbodyClassName}
          trClassName={trClassName}
          thClassName={thClassName}
          tdClassName={tdClassName}
        />
        {
          showPagination ? (
            <PaginationComponent
              style={paginationStyle}
              className={paginationClassName}
              page={page}
              count={count}
              pageSize={pageSize}
              showPageJump={showPageJump}
              showPageSizeOptions={showPageSizeOptions}
              pageSizeOptions={pageSizeOptions}
              PreviousComponent={PreviousComponent}
              NextComponent={NextComponent}
              previousStyle={previousStyle}
              nextStyle={nextStyle}
              previousClassName={previousClassName}
              nextClassName={nextClassName}
              setPageSize={this.setPageSize}
              jumpToPage={this.jumpToPage}
              incrementPage={this.incrementPage}
              decrementPage={this.decrementPage}
            />
          ) : null
        }
      </div>
    );
  }
}

ReactTable.defaultProps = {
  loading: false,
  pageSize: 20,
  showPagination: true,
  showPageJump: true,
  showPageSizeOptions: true,
  pageSizeOptions: [5, 10, 20, 25, 50, 100],
  TableComponent,
  TheadComponent,
  TbodyComponent,
  TrComponent,
  ThComponent,
  TdComponent,
  PaginationComponent,
  PreviousComponent,
  NextComponent,
  LoadingComponent,
  style: {},
  tableStyle: {},
  theadStyle: {},
  tbodyStyle: {},
  trStyle: {},
  thStyle: {},
  tdStyle: {},
  paginationStyle: {},
  previousStyle: {},
  nextStyle: {},
  loadingStyle: {},
  className: '',
  tableClassName: '',
  theadClassName: '',
  tbodyClassName: '',
  trClassName: '',
  thClassName: '',
  tdClassName: '',
  paginationClassName: '',
  previousClassName: '',
  nextClassName: '',
  loadingClassName: '',
};

ReactTable.propTypes = {
  data: dataType.isRequired,
  columns: PropTypes.arrayOf(columnType).isRequired,
  initialSorts: PropTypes.arrayOf(sortType).isRequired,
  count: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
  loading: PropTypes.bool,
  showPagination: PropTypes.bool,
  showPageJump: PropTypes.bool,
  showPageSizeOptions: PropTypes.bool,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  TableComponent: PropTypes.func,
  TheadComponent: PropTypes.func,
  TbodyComponent: PropTypes.func,
  TrComponent: PropTypes.func,
  ThComponent: PropTypes.func,
  TdComponent: PropTypes.func,
  PaginationComponent: PropTypes.func,
  PreviousComponent: PropTypes.func,
  NextComponent: PropTypes.func,
  LoadingComponent: PropTypes.func,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tableStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  theadStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  tbodyStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  trStyle: styleType,
  thStyle: styleType,
  tdStyle: styleType,
  paginationStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  previousStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  nextStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  loadingStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  className: PropTypes.string,
  tableClassName: PropTypes.string,
  theadClassName: PropTypes.string,
  tbodyClassName: PropTypes.string,
  trClassName: classNameType,
  thClassName: classNameType,
  tdClassName: classNameType,
  paginationClassName: PropTypes.string,
  previousClassName: PropTypes.string,
  nextClassName: PropTypes.string,
  loadingClassName: PropTypes.string,
};

export default ReactTable;
