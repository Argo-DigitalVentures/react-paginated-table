import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Td from '../';

const data = [
  {
    company: 'Argo',
    location: 'New York',
    ceo: {
      firstName: 'Mark',
      lastName: 'Watson',
    },
  },
  {
    company: 'John Hancock',
    location: 'New York',
    ceo: {
      firstName: 'Andrew',
      lastName: 'Arnott',
    },
  },
];

const columns = [
  { id: 'company', header: 'Company Name', selector: 'company' },
  { id: 'location', header: 'Location', selector: 'location', render: () => null },
  { id: 'ceoFullName', header: 'CEO', selector: ({ ceo: { firstName, lastName } }) => `${firstName} ${lastName}` },
];

describe('<Td />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Td
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        column={columns[0]}
        columnIndex={0}
        columns={columns}
        row={data[1]}
        rowIndex={1}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept className and style functions', () => {
    const styleFn = jest.fn().mockReturnValue({
      color: 'green',
    });
    const classNameFn = jest.fn().mockReturnValue('test');
    const tree = shallow(
      <Td
        style={styleFn}
        className={classNameFn}
        data={data}
        column={columns[0]}
        columnIndex={0}
        columns={columns}
        row={data[1]}
        rowIndex={1}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
    expect(styleFn).toBeCalledWith({
      value: 'John Hancock',
      column: columns[0],
      columnIndex: 0,
      columns,
      row: data[1],
      rowIndex: 1,
      data,
    });
    expect(classNameFn).toBeCalledWith({
      value: 'John Hancock',
      column: columns[0],
      columnIndex: 0,
      columns,
      row: data[1],
      rowIndex: 1,
      data,
    });
  });

  it('should use a custom renderer if available', () => {
    const tree = shallow(
      <Td
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        column={columns[2]}
        columnIndex={2}
        columns={columns}
        row={data[1]}
        rowIndex={1}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should use a selector function to get the appropriate value from the row if available', () => {
    const tree = shallow(
      <Td
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        column={columns[1]}
        columnIndex={1}
        columns={columns}
        row={data[1]}
        rowIndex={1}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
