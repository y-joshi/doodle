import React from 'react'
import Board from '../board/Board'
import './styles.css'

class Container extends React.Component 
{
    color = '#5d8fdf';

    constructor(props) {
        super(props)
    }

    render() {
        return (
        <div className = "container">
            <div className="color-picker-container">
                <input type="color" value={this.color} onChange={this.onInputChange} ></input>
            </div>
            <div className="board-container">
                <Board color={this.color}></Board>
            </div>
        </div>
        )
    }

    onInputChange(event) {
        this.color = event.target.value;
    }
}

export default Container