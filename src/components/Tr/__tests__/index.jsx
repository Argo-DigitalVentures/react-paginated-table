import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Tr from '../';

const data = [
  { company: 'Argo', location: 'New York' },
  { company: 'John Hancock', location: 'New York' },
];

const columns = [
  { id: 'company', header: 'Company Name', selector: 'company' },
  { id: 'location', header: 'Location', selector: 'location' },
];

const FakeCellComponent = () => null;

describe('<Tr />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Tr
        className="test"
        style={{
          color: 'green',
        }}
        title="This is a row in the table."
        data={data}
        columns={columns}
        row={data[1]}
        rowIndex={1}
        CellComponent={FakeCellComponent}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should accept className and style functions', () => {
    const classNameFn = jest.fn().mockReturnValue('test');
    const styleFn = jest.fn().mockReturnValue({
      color: 'green',
    });
    const tree = shallow(
      <Tr
        className={classNameFn}
        style={styleFn}
        title="This is a row in the table."
        data={data}
        columns={columns}
        row={data[1]}
        rowIndex={1}
        CellComponent={FakeCellComponent}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
    expect(styleFn).toBeCalledWith({
      data,
      columns,
      row: data[1],
      rowIndex: 1,
    });
    expect(classNameFn).toBeCalledWith({
      data,
      columns,
      row: data[1],
      rowIndex: 1,
    });
  });
});
