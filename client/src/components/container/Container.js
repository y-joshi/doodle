import React from 'react'
import './styles.scss'
import Board from '../board/Board'
import UserContainer from '../userContainer/UserContainer';
import ChatContainer from '../chatContainer/ChatContainer';

class Container extends React.Component 
{
    color = '#5d8fdf';

    constructor(props) {
        super(props)
        this.state = {
            color: this.color,
            users: [
            {
                name: 'abc',
                imageUrl : 'https://i.pravatar.cc/300',
                points: 100
            },
            {
                name: 'abc',
                imageUrl : 'https://i.pravatar.cc',
                points: 200
            },
            {
                name: 'def',
                imageUrl : 'https://i.pravatar.cc',
                points: 300
            },
            {
                name: 'ghijklmnop',
                imageUrl : 'https://i.pravatar.cc',
                points: 400
            },

        
        ]
        }
        this.onInputChange = this.onInputChange.bind(this)
    }

    render() {
        return (
        <div className = "container">
            <div className="color-picker-container">
                <input type="color" value={this.state.color} onChange={this.onInputChange} ></input>
            </div>
            <div className='user-board-container'>
                <div className='user-container container-item'>
                    <UserContainer users = {this.state.users}></UserContainer>
                </div>
                <div className="board-container container-item">
                    <Board color={this.color}></Board>
                </div>
                <div className='chat-container container-item'>
                    <ChatContainer></ChatContainer>
                </div>
            </div>
        </div>
        )
    }

    onInputChange(event) {
        this.color = event.target.value;
        const result = this.setState({color: event.target.value});
        console.log('result, ',result)
    }
}

export default Container