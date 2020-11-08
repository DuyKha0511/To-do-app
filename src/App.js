import './App.css';
import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';

class App extends Component
{
  constructor(props){
    super(props);
    this.state = {
      tasks : [], //id, name, status
      isDisplayForm : false,
      taskEditting: null,
      filter : {
        name : '',
        status : -1
      },
      keyword : ''
    };
  }

  componentWillMount() { //Duoc goi khi refresh trang web
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks')); //chuyen thanh object
      this.setState({
        tasks: tasks
      });
    }
  }

  onGenerateData = () => {
    var tasks = [
      {
        id : this.generateID(),
        name : 'Học lập trình',
        status : true
      },
      {
        id : this.generateID(),
        name : 'Đi bơi',
        status : false
      },
      {
        id : this.generateID(),
        name : 'Đi quẩy',
        status : true
      }
    ];
    this.setState({
      tasks : tasks
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  s4() {
    return Math.floor((1+Math.random())*0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
  }

  onToggleForm = () => {
    if (this.state.taskEditting) {
      this.setState({
        isDisplayForm : true,
        taskEditting : null
      });
    }
    else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditting : null
      });
    }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm : false,
      taskEditting : null
    });
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm : true
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if (data.id ==='') {
      data.id = this.generateID(); //data: 1 task moi
      tasks.push(data);
    }
    else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks,
      taskEditting : null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      this.onCloseForm();
    }
  }

  onUpdate = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditting = tasks[index];
    this.setState({
      taskEditting: taskEditting
    });
    this.onShowForm();
  }

  onFilter = (filterName, filterStatus) => {
    filterStatus = parseInt(filterStatus);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    });
  }

  onSearch = (keyword) => {
    console.log(keyword);
    this.setState({
      keyword : keyword.toLowerCase()
    });
  }

  render() 
  {
    var {tasks, isDisplayForm, taskEditting, filter, keyword} = this.state; //var tasks = this.state.tasks
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.status === -1) {
          return task;
        }
        else {
          return task.status === (filter.status ? true : false);
        }
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    var elementTaskForm = 
        isDisplayForm
        ? <TaskForm 
            onCloseForm={this.onCloseForm}
            onSubmit={this.onSubmit}
            task = {taskEditting}
          />
        : '';
    return (
      <div className="container">
        <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr/>
        </div>
        <div className="row">
            <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":""}>
              {elementTaskForm}
            </div>
            <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={this.onToggleForm}
                >
                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger ml-5"
                  onClick = {this.onGenerateData}
                >
                    Generate Data
                </button>
                <Control onSearch={this.onSearch}/>
                <TaskList 
                  tasks = {tasks} 
                  onUpdateStatus={this.onUpdateStatus}
                  onDelete = {this.onDelete}
                  onUpdate = {this.onUpdate}
                  onFilter = {this.onFilter}
                />
            </div>
        </div>
    </div>
    );
  }
}

export default App;
