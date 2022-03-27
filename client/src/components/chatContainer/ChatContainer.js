import React from "react";
import './styles.scss'

export default class ChatContainer extends React.Component {
    constructor(props){
        super(props)
        // this.state.previousMessages = props.previousMessages
    }
    

    render() {
        return (
            <div className="chat-container">
                <input type='text' className='input-comment' onenter></input>
            </div>
        )
    }
}
