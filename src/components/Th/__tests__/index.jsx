import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Th from '../';

const data = [
  { company: 'Argo', location: 'New York' },
  { company: 'John Hancock', location: 'New York' },
];

const columns = [
  { id: 'company', header: 'Company Name', selector: 'company' },
  { id: 'location', header: () => null, selector: 'location' },
];

describe('<Th />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Th
        style={{
          color: 'green',
        }}
        className="test"
        column={columns[0]}
        columnIndex={0}
        columns={columns}
        data={data}
        sorts={[]}
        handleHeaderClick={() => null}
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
      <Th
        style={styleFn}
        className={classNameFn}
        column={columns[0]}
        columnIndex={0}
        columns={columns}
        data={data}
        sorts={[]}
        handleHeaderClick={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
    expect(styleFn).toBeCalledWith({
      column: columns[0],
      columnIndex: 0,
      columns,
      data,
      sortDirection: null,
    });
    expect(classNameFn).toBeCalledWith({
      column: columns[0],
      columnIndex: 0,
      columns,
      data,
      sortDirection: null,
    });
  });


  it('should use a custom header renderer if available', () => {
    const tree = shallow(
      <Th
        style={{
          color: 'green',
        }}
        className="test"
        column={columns[1]}
        columnIndex={1}
        columns={columns}
        data={data}
        sorts={[]}
        handleHeaderClick={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should pass the sort direction to the style and className functions', () => {
    const classNameFn = jest.fn().mockReturnValue('test');
    const styleFn = jest.fn().mockReturnValue({
      color: 'green',
    });
    shallow(
      <Th
        style={styleFn}
        className={classNameFn}
        column={columns[0]}
        columnIndex={0}
        columns={columns}
        data={data}
        sorts={[{
          id: columns[0].id,
          direction: 'ASC',
        }]}
        handleHeaderClick={() => null}
      />,
    );
    expect(styleFn).toBeCalledWith({
      column: columns[0],
      columnIndex: 0,
      columns,
      data,
      sortDirection: 'ASC',
    });
    expect(classNameFn).toBeCalledWith({
      column: columns[0],
      columnIndex: 0,
      columns,
      data,
      sortDirection: 'ASC',
    });
  });

  it('should call the handleHeaderClick prop with column id and event shiftKey property', () => {
    const handleHeaderClickSpy = jest.fn();
    const tree = shallow(
      <Th
        column={columns[0]}
        columnIndex={0}
        columns={columns}
        data={data}
        sorts={[]}
        handleHeaderClick={handleHeaderClickSpy}
      />,
    );
    tree.find('th').simulate('click', { shiftKey: false });
    expect(handleHeaderClickSpy).toBeCalledWith(columns[0].id, false);
    tree.find('th').simulate('click', { shiftKey: true });
    expect(handleHeaderClickSpy).toBeCalledWith(columns[0].id, false);
  });
});
