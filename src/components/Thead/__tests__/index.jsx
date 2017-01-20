import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Thead from '../';

const data = [
  { company: 'Argo', location: 'New York' },
  { company: 'John Hancock', location: 'New York' },
];

const columns = [
  { id: 'company', header: 'Company Name', selector: 'company' },
  { id: 'location', header: () => null, selector: 'location' },
];

describe('<Thead />', () => {
  it('should accept className, style, and other DOM props', () => {
    const tree = shallow(
      <Thead
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        sorts={[]}
        handleHeaderClick={() => null}
        thStyle={{}}
        thClassName="thTestClassName"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('should use a custom ThComponent', () => {
    const FakeThComponent = () => null;
    const tree = shallow(
      <Thead
        style={{
          color: 'green',
        }}
        className="test"
        data={data}
        columns={columns}
        sorts={[]}
        handleHeaderClick={() => null}
        ThComponent={FakeThComponent}
        thStyle={{}}
        thClassName="thTestClassName"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
