import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import ReactTable from '../';

const data = [
  { company: 'Argo', location: 'New York' },
  { company: 'John Hancock', location: 'New York' },
];

const columns = [
  { id: 'company', header: 'Company Name', selector: 'company' },
  { id: 'location', header: () => null, selector: 'location' },
];

describe('<ReactTable />', () => {
  it('should use custom style, className, and other DOM props', () => {
    const tree = shallow(
      <ReactTable
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        initialSorts={[]}
        count={10}
        onChange={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should initialize sorts and pageSize state based on props', () => {
    const tree = shallow(
      <ReactTable
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        initialSorts={[{ columnId: 'test', direction: 'DESC' }]}
        pageSize={42}
        count={10}
        onChange={() => null}
      />,
    );
    expect(tree.instance().state.sorts).toEqual([{ columnId: 'test', direction: 'DESC' }]);
    expect(tree.instance().state.pageSize).toEqual(42);
  });

  it('should display the loading component if loading prop is true', () => {
    const tree = shallow(
      <ReactTable
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        initialSorts={[]}
        count={10}
        loading
        onChange={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should hide the pagination component if showPagination prop is false', () => {
    const tree = shallow(
      <ReactTable
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        initialSorts={[]}
        count={10}
        showPagination={false}
        onChange={() => null}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  describe('onChange()', () => {
    it('should be invoked on mount and call the onChange prop when invoked', () => {
      const onChangeSpy = jest.fn();
      const tree = shallow(
        <ReactTable
          style={{
            color: 'green',
          }}
          className="test"
          data={data}
          columns={columns}
          initialSorts={[{ columnId: 'test', direction: 'DESC' }]}
          count={10}
          onChange={onChangeSpy}
        />,
      );
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      tree.instance().onChange();
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      expect(onChangeSpy).toBeCalledWith({
        sorts: [{ columnId: 'test', direction: 'DESC' }],
        pageSize: 20,
        page: 1,
        count: 10,
      });
    });
  });

  describe('changeSort()', () => {
    it('should add, replace, and update sorts', () => {
      const onChangeSpy = jest.fn();
      const tree = shallow(
        <ReactTable
          style={{
            color: 'green',
          }}
          className="test"
          data={data}
          columns={columns}
          initialSorts={[{ columnId: 'test', direction: 'DESC' }]}
          count={10}
          onChange={onChangeSpy}
        />,
      );

      expect(onChangeSpy).toHaveBeenCalledTimes(1);

      tree.instance().changeSort('other', true);
      expect(tree.instance().state.sorts).toEqual([
        { columnId: 'test', direction: 'DESC' },
        { columnId: 'other', direction: 'ASC' },
      ]);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);

      tree.instance().changeSort('test', true);
      expect(tree.instance().state.sorts).toEqual([
        { columnId: 'other', direction: 'ASC' },
      ]);
      expect(onChangeSpy).toHaveBeenCalledTimes(3);

      tree.instance().changeSort('another', false);
      expect(tree.instance().state.sorts).toEqual([
        { columnId: 'another', direction: 'ASC' },
      ]);
      expect(onChangeSpy).toHaveBeenCalledTimes(4);

      tree.instance().changeSort('another', false);
      expect(tree.instance().state.sorts).toEqual([
        { columnId: 'another', direction: 'DESC' },
      ]);
      expect(onChangeSpy).toHaveBeenCalledTimes(5);

      tree.instance().changeSort('another', false);
      expect(tree.instance().state.sorts).toEqual([]);
      expect(onChangeSpy).toHaveBeenCalledTimes(6);
    });
  });

  describe('jumpToPage()', () => {
    it('should change the page and call the onChange prop', () => {
      const onChangeSpy = jest.fn();
      const tree = shallow(
        <ReactTable
          style={{
            color: 'green',
          }}
          className="test"
          data={data}
          columns={columns}
          initialSorts={[]}
          count={100}
          onChange={onChangeSpy}
        />,
      );
      const instance = tree.instance();
      expect(instance.state.page).toBe(1);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      instance.jumpToPage(3);
      expect(instance.state.page).toBe(3);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('incrementPage()', () => {
    it('should increment the page and call the onChange prop', () => {
      const onChangeSpy = jest.fn();
      const tree = shallow(
        <ReactTable
          style={{
            color: 'green',
          }}
          className="test"
          data={data}
          columns={columns}
          initialSorts={[]}
          count={100}
          onChange={onChangeSpy}
        />,
      );
      const instance = tree.instance();
      expect(instance.state.page).toBe(1);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      instance.incrementPage();
      expect(instance.state.page).toBe(2);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      instance.incrementPage();
      expect(instance.state.page).toBe(3);
      expect(onChangeSpy).toHaveBeenCalledTimes(3);
    });
  });

  describe('decrementPage()', () => {
    it('should decrement the page and call the onChange prop', () => {
      const onChangeSpy = jest.fn();
      const tree = shallow(
        <ReactTable
          style={{
            color: 'green',
          }}
          className="test"
          data={data}
          columns={columns}
          initialSorts={[]}
          count={100}
          onChange={onChangeSpy}
        />,
      );
      const instance = tree.instance();
      expect(instance.state.page).toBe(1);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      instance.jumpToPage(5);
      expect(instance.state.page).toBe(5);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      instance.decrementPage();
      expect(instance.state.page).toBe(4);
      expect(onChangeSpy).toHaveBeenCalledTimes(3);
      instance.decrementPage();
      expect(instance.state.page).toBe(3);
      expect(onChangeSpy).toHaveBeenCalledTimes(4);
    });
  });

  describe('setPageSize()', () => {
    it('should decrement the page and call the onChange prop', () => {
      const onChangeSpy = jest.fn();
      const tree = shallow(
        <ReactTable
          style={{
            color: 'green',
          }}
          className="test"
          data={data}
          columns={columns}
          initialSorts={[]}
          count={100}
          onChange={onChangeSpy}
        />,
      );
      const instance = tree.instance();
      expect(instance.state.pageSize).toBe(20);
      expect(onChangeSpy).toHaveBeenCalledTimes(1);
      instance.setPageSize(50);
      expect(instance.state.pageSize).toBe(50);
      expect(onChangeSpy).toHaveBeenCalledTimes(2);
      instance.setPageSize(100);
      expect(instance.state.pageSize).toBe(100);
      expect(onChangeSpy).toHaveBeenCalledTimes(3);
    });
  });
  // setPageSize
});
