import React from 'react';
import { render } from 'react-dom';
import find from 'lodash.find';
import keyBy from 'lodash.keyBy';

import ReactTable from '../../src/components';

import { select } from '../../src/utils';

import data from './data';

const columns = [
  {
    id: 'name',
    header: 'Name',
    selector: 'name',
  },
  {
    id: 'email',
    header: 'E-mail',
    selector: 'email',
  },
  {
    id: 'address.street',
    header: 'Street',
    selector: 'address.street',
  },
  {
    id: 'address.city',
    header: 'City',
    selector: 'address.city',
  },
  {
    id: 'address.county',
    header: 'County',
    selector: 'address.county',
  },
  {
    id: 'address.state',
    header: 'State',
    selector: 'address.state',
  },
  {
    id: 'address.zip',
    header: 'Zip',
    selector: 'address.zip',
  },
  {
    id: 'birthmonth',
    header: 'Birth Month',
    selector: 'birthmonth',
  },
];

class Test extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      data: [],
      loading: false,
    };
    this.onChange = ::this.onChange;
  }

  onChange(state) {
    this.setState({ loading: true });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!state.sorts.length) {
        this.setState({
          data: data.slice((state.page - 1) * state.pageSize, state.page * state.pageSize),
          loading: false,
        });
      } else {
        const columnsById = keyBy(columns, 'id');
        this.setState({
          data: data.slice()
            .sort((a, b) => (
              state.sorts.reduceRight((value, sort) => {
                if (value !== 0) return value;
                const { selector } = columnsById[sort.columnId];
                const valueA = select(a, selector);
                const valueB = select(b, selector);
                return valueA === valueB ? 0 : valueA > valueB ? 1 : -1;
              }, 0)
            ))
            .slice((state.page - 1) * state.pageSize, state.page * state.pageSize),
          loading: false,
        });
      }
    }, 1000);
  }

  render() {
    return (
      <ReactTable
        data={this.state.data}
        loading={this.state.loading}
        columns={columns}
        initialSorts={[]}
        count={data.length}
        onChange={this.onChange}
      />
    );
  }
}

render(<Test />, document.querySelector('#react'));
