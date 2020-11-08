import React, { Component } from 'react';

class TaskItem extends Component
{
    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.id);
    }

    onDelete = () => {
        this.props.onDelete(this.props.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.id);
    }

    render() 
    {
        var {task, index} = this.props;

        return (
            <tr>
                <td>{index+1}</td>
                <td>{task.name}</td>
                <td className="text-center">
                    <span 
                        className={task.status?"label label-success":"label label-danger"}
                        onClick={this.onUpdateStatus}
                    >
                        {task.status?"Kích hoạt":"Ẩn"}
                    </span>
                </td>
                <td className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-warning"
                        onClick = {this.onUpdate}
                    >
                        <span className="fa fa-edit mr-5"></span>Sửa
                    </button>
                    &nbsp;
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick = {this.onDelete}
                    >
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;
