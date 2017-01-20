import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Next from '../';

describe('<Next />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Next
        className="test"
        style={{
          color: 'green',
        }}
        aria-label="next page button"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
