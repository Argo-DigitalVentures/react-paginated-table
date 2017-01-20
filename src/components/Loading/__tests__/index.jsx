import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Loading from '../';

describe('<Loading />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Loading
        className="test"
        style={{
          color: 'green',
        }}
        aria-label="loading indicator"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
