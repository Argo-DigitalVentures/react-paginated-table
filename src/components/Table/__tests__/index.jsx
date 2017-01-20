import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import Table from '../';

function createFakeComponent() {
  return () => null;
}

describe('<Table />', () => {
  it('should accept className, style, and other DOM props', () => {
    const fakeFn = () => null;
    const TheadComponent = createFakeComponent();
    const TbodyComponent = createFakeComponent();
    const TrComponent = createFakeComponent();
    const ThComponent = createFakeComponent();
    const TdComponent = createFakeComponent();
    const tree = shallow(
      <Table
        data={[]}
        columns={[]}
        sorts={[]}
        handleHeaderClick={fakeFn}
        style={{
          color: 'green',
        }}
        className="test"
        TheadComponent={TheadComponent}
        TbodyComponent={TbodyComponent}
        TrComponent={TrComponent}
        ThComponent={ThComponent}
        TdComponent={TdComponent}
        theadStyle={{
          color: 'red',
        }}
        tbodyStyle={{
          color: 'blue',
        }}
        trStyle={{
          color: 'orange',
        }}
        thStyle={{
          color: 'purple',
        }}
        tdStyle={{
          color: 'gray',
        }}
        theadClassName="theadClassName"
        tbodyClassName="tbodyClassName"
        trClassName="trClassName"
        thClassName="thClassName"
        tdClassName="tdClassName"
      />,
    );
    expect(toJson(tree)).toMatchSnapshot();
  });
});
