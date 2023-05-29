import React, { Component, SyntheticEvent } from 'react'
import Wrapper from '../../Wrapper'
import axios from 'axios';
import { Role } from '../../../classes/role';
import { Navigate } from 'react-router-dom';

export default class UserCreate extends Component {

    first_name = '';
    last_name = '';
    email = '';
    role_id = 3;

    state = {
        roles: [],
        redirect: false,
    }

    componentDidMount = async () => {

        const res = await axios.get('roles');
        // console.log(res.data.data);
        this.setState({
            roles: res.data.data
        })

    }

    handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await axios.post('users', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            role_id: this.role_id
        })
        this.setState({
            redirect: true
        });
    }
    render() {
        if (this.state.redirect) {
            return <Navigate to={'/users'} />
        }
        return (
            <Wrapper>
                <form onSubmit={this.handleSubmit}>

                    <h1 className="h3 mb-3 fw-normal">Create User</h1>

                    <div className="form-floating mb-3">

                        <input type="text" className="form-control" placeholder="first name" onChange={e => this.first_name = e.target.value} />
                        <label>First Name</label>

                    </div>

                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" placeholder="last name" onChange={e => this.last_name = e.target.value} />
                        <label>Last Name</label>

                    </div>
                    <div className="form-floating mb-3">

                        <input type="email" className="form-control" placeholder="name@example.com" onChange={e => this.email = e.target.value} />
                        <label>Email address</label>

                    </div>

                    <div className="form-floating mb-3">
                        <select className="form-select" id="floatingSelect" onChange={e => this.role_id = parseInt(e.target.value)}>
                            {this.state.roles.map((role: Role) =>
                                <option value={role.id} key={role.id}>{role.name}</option>
                            )}

                        </select>
                        <label>Select Role</label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>

                </form>
            </Wrapper>
        )
    }
}
