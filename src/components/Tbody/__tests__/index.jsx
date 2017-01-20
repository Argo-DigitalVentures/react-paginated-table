import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Tbody from '../';

const data = [
  { company: 'Argo', location: 'New York' },
  { company: 'John Hancock', location: 'New York' },
];

const columns = [
  { id: 'company', header: 'Company Name', selector: 'company' },
  { id: 'location', header: () => null, selector: 'location' },
];

describe('<Tbody />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Tbody
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should use a custom row and cell components', () => {
    const FakeTrComponent = () => null;
    const FakeTdComponent = () => null;
    const tree = shallow(
      <Tbody
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        TrComponent={FakeTrComponent}
        TdComponent={FakeTdComponent}
        trStyle={{
          color: 'yellow',
        }}
        tdStyle={{
          color: 'purple',
        }}
        trClassName="trTestClassName"
        tdClassName="tdTestClassName"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
