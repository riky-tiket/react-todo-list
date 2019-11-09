import React, { Component } from 'react'
import map from 'lodash/map';
import foreach from 'lodash/forEach';

import './Styles.css';

export default class todo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          name: 'Baca Dokumentasi',
          status: true,
          subTodo: [
            {
              name: 'Javascript',
              status: true,
            },
            {
              name: 'ReactJS',
              status: true,
            },
          ]
        },
        {
          name: 'Update Jira',
          status: true,
          subTodo: []
        },
        {
          name: 'Pemanasan Coding',
          status: true,
          subTodo: []
        },
        {
          name: 'Task Hari ini',
          status: true,
          subTodo: [
            {
              name: 'Feature Order',
              status: true,
            },
            {
              name: 'Feature Payment',
              status: true,
            },
            {
              name: 'Feature Booking',
              status: true,
            },
          ]
        },
      ]
    }
  }

  handleClickParent = name => {
    let currentState = this.state.data;

    foreach(currentState, function (value) {
      if (value.name === name) {
        value.status = !value.status;
      }
    })

    this.setState({
      data: currentState
    })
  }

  handleClickChild = (childName, parentName) => {
    let currentState = this.state.data;

    foreach(currentState, function (value) {
      if (value.name === parentName) {
        foreach(value.subTodo, function (val) {
          if (val.name === childName) {
            val.status = !val.status;
          }
        })
      }
    })

    this.setState({
      data: currentState
    })
  }

  handleAddSubTodo = name => {
    let inputText = prompt('Tambah sub Todo');
    if (inputText.length > 0) {
      let currentState = this.state.data;
      let newSubTodo = {
        name: inputText,
        status: true
      };

      foreach(currentState, function (value) {
        if (value.name === name) {
          value.subTodo.push(newSubTodo);
        }
      })

      this.setState({
        data: currentState
      })
    }
  }

  clearTodo = () => {
    this.setState({
      data: []
    })
  }

  addNewTodo = () => {
    let inputText = prompt('Tambah Todo Baru');
    if (inputText.length > 0) {
      let currentState = this.state.data;
      let newSubTodo = {
        name: inputText,
        status: true,
        subTodo: []
      };

      currentState.push(newSubTodo);

      this.setState({
        data: currentState
      })
    }
  }

  removeItem = (name) => {
    let newVal = [];
    let currentState = this.state.data;

    foreach(currentState, function (value) {
      if (value.name !== name) {
        newVal.push(value)
      }
    })

    this.setState({
      data: newVal
    })
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <div className="main-container">
          <div className="main-title">
            TODO
          </div>
          <div className="new-todo" onClick={this.addNewTodo}>
            Add New Todo
          </div>
          <div className="clear-todo" onClick={this.clearTodo}>
            Clear Todo List
          </div>
          {map(data, (list, key) => {
            return (
              <div key={key}>
                <div
                  onClick={() => this.handleClickParent(list.name)}
                  className={!list.status ? 'todo-list todo-done' : 'todo-list'}
                >
                  <span>{key + 1} .</span>
                  {list.name}
                </div>
                <div className="remove-todo" onClick={() => this.removeItem(list.name)}>Hapus</div>
                <div className="pull-right" onClick={() => this.handleAddSubTodo(list.name)}><button>+</button></div>
                {map(list.subTodo, (sub, keys) => {
                  return (
                    <div
                      key={keys}
                      onClick={() => this.handleClickChild(sub.name, list.name)}
                      className={!sub.status ? 'todo-list sub-todo todo-done' : 'todo-list sub-todo'}
                    >
                      - {sub.name}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
