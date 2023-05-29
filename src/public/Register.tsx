import React, { Component, SyntheticEvent } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class Register extends Component {

    first_name = '';
    last_name = '';
    email = '';
    password = '';
    password_confirm = '';
    state = {
        redirect: false
    }

    handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const res = await axios.post('register', {
            'first_name': this.first_name,
            'last_name': this.last_name,
            'email': this.email,
            'password': this.password,
            'password_confirm': this.password_confirm
        })
        // console.log(res.data);
        this.setState({
            redirect: true
        })
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/login'} />
        }
        return (
            <main className="form-signin w-100 m-auto" >
                <form onSubmit={this.handleSubmit}>

                    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="first name" onChange={e => this.first_name = e.target.value} />
                        <label>First Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="last name" onChange={e => this.last_name = e.target.value} />
                        <label>Last Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="name@example.com" onChange={e => this.email = e.target.value} />
                        <label>Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Password" onChange={e => this.password = e.target.value} />
                        <label>Password</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Confirm Password" onChange={e => this.password_confirm = e.target.value} />
                        <label>Confirm Password</label>
                    </div>


                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>

                </form>
            </main >
        )
    }
}
