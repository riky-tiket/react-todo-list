import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Todo from '../../todo/index';
import Renderer from 'react-test-renderer';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('Todo Test UI', () => {
  let component = null;

  beforeEach(() => {
    component = (
      <Todo />
    );
  });

  it('Should render without error', () => {
    const tree = Renderer.create(component);

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('Should have main-container class', () => {
    const wrapper = shallow(component);

    expect(wrapper.find('div .main-container').hasClass('main-container')).toBe(true);
  });

  it('Should have main-title class', () => {
    const wrapper = shallow(component);

    expect(wrapper.find('div .main-container .main-title').hasClass('main-title')).toBe(true);
  });

  it('Should have TODO title in main-title class', () => {
    const wrapper = shallow(component);
    const mainTitle = wrapper.find('div .main-container .main-title');

    expect(mainTitle.text()).toContain('TODO');
  })

  it('Should have new-todo class', () => {
    const wrapper = shallow(component);

    expect(wrapper.find('div .main-container .new-todo').hasClass('new-todo')).toBe(true);
  })

  it('Should have Add New Todo text in new-todo class', () => {
    const wrapper = shallow(component);
    const text = wrapper.find('div .main-container .new-todo');

    expect(text.text()).toContain('Add New Todo');
  })

  it('Should have clear-todo class', () => {
    const wrapper = shallow(component);

    expect(wrapper.find('div .main-container .clear-todo').hasClass('clear-todo')).toBe(true);
  })

  it('Should have Clear Todo List text in clear-todo class', () => {
    const wrapper = shallow(component);
    const text = wrapper.find('div .main-container .clear-todo');

    expect(text.text()).toContain('Clear Todo List');
  })
})

// TODO
// ngetes fungsi click