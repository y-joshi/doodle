import React from 'react'
import './styles.scss'

class UserContainer extends React.Component {
    constructor(props) {
        super(props)
        const users = props.users
        this.state = { users }
        console.log('users', users)
    }
    render() {
        return (
            <div>
                {/* {
                    this.state.users.map(user => ({
                        <div>
                                user.name
                                <img src = {user.imageUrl}>
                            </div>              
                    }))
                    } */

                    this.state.users.map((user, i) => (
                        <div className='user' key={i}>
                            <div className='user-fields metadata'>
                                <div className='name'> {user.name}</div>
                                <div className='points'> Points : {user.points} </div>
                            </div>
                            <div className='user-fields image'>
                                <img src={user.imageUrl} width='100%'></img>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default UserContainer