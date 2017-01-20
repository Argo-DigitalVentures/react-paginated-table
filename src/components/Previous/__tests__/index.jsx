import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Previous from '../';

describe('<Previous />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Previous
        className="test"
        style={{
          color: 'green',
        }}
        aria-label="previous page button"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
