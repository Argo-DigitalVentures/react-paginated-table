import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Pagination from '../';

describe('<Pagination />', () => {
  it('should accept className, style, and other DOM props', () => {
    const fakeFn = () => null;
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should allow the page jump to be hidden', () => {
    const fakeFn = () => null;
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
        showPageJump={false}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should allow the page size selector to be hidden', () => {
    const fakeFn = () => null;
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
        showPageSizeOptions={false}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should allow custom page size options', () => {
    const fakeFn = () => null;
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
        pageSizeOptions={[5, 10, 30, 60]}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should pass custom styles and classNames to Next and Previous components', () => {
    const fakeFn = () => null;
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
        previousStyle={{
          color: 'blue',
        }}
        nextStyle={{
          color: 'red',
        }}
        previousClassName="testPrevious"
        nextClassName="testNext"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should use custom Next and Previous components', () => {
    const CustomPrevious = () => null;
    const CustomNext = () => null;
    const fakeFn = () => null;
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
        PreviousComponent={CustomPrevious}
        NextComponent={CustomNext}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should call the jumpToPage function when new page is selected', () => {
    const fakeFn = () => null;
    const jumpToPageSpy = jest.fn();
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={fakeFn}
        jumpToPage={jumpToPageSpy}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
      />,
    );
    const pageNumberSelect = tree.find('select').at(0);
    pageNumberSelect.simulate('change', {
      target: {
        value: '3',
      },
    });
    expect(jumpToPageSpy).toBeCalledWith(3);
  });

  it('should call the setPageSize function when new page size is selected', () => {
    const fakeFn = () => null;
    const setPageSizeSpy = jest.fn();
    const tree = shallow(
      <Pagination
        style={{
          color: 'green',
        }}
        className="test"
        count={20}
        page={2}
        pageSize={5}
        setPageSize={setPageSizeSpy}
        jumpToPage={fakeFn}
        incrementPage={fakeFn}
        decrementPage={fakeFn}
      />,
    );
    const pageNumberSelect = tree.find('select').at(1);
    pageNumberSelect.simulate('change', {
      target: {
        value: '25',
      },
    });
    expect(setPageSizeSpy).toBeCalledWith(25);
  });
});
