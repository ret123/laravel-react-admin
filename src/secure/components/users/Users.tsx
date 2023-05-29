import React, { Component } from 'react';
import Wrapper from '../../Wrapper';
import axios from 'axios';
import { User } from '../../../classes/user';
import { Link } from 'react-router-dom';


class Users extends Component {

    state = {
        users: []
    }

    page = 1;
    last_page = 0;
    serial_no = 1;

    componentDidMount = async () => {
        const res = await axios.get(`users?page=${this.page}`);
        this.setState({
            users: res.data.data
        })
        // console.log(res.data);
        this.last_page = res.data.meta.last_page;
        this.serial_no = res.data.meta.from;



    }

    next = async () => {
        if (this.page === this.last_page) return;
        this.page++;
        await this.componentDidMount()
    }

    prev = async () => {
        if (this.page === 1) return;
        this.page--;
        await this.componentDidMount()
    }

    delete = async (id: number) => {

        if (window.confirm('Are you sure, you want delete?')) {
            await axios.delete('users/' + id);

            this.setState({
                // users: this.state.users.filter((user: User) => user.id !== id)
                users: this.state.users.splice(id,)
            });
        }
    }

    render() {
        return (
            <Wrapper>
                <div className='d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
                    <div className='btn-toolbar mb-2 mb-md-0'>
                        <Link to={"/users/create"} className='btn btn-sm btn-outline-secondary'>Add</Link>
                    </div>

                </div>
                <div className='table-responsive'>
                    <table className='table table-striped table-sm'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users.map((user: User, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + this.serial_no}</td>
                                        <td>{user.first_name + ' ' + user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>
                                            <div className='btn-group mr-2'>
                                                <Link to={`/users/${user.id}/edit`} className='btn btn-sm btn-outline-secondary'>Edit</Link>
                                                <button className='btn btn-sm btn-outline-secondary' onClick={() => this.delete(user.id)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
                <nav>
                    <ul className='pagination'>
                        <li className='page-item'>
                            <a href="#" className='page-link' onClick={this.prev}>Previous</a>
                        </li>
                        <li className='page-item'>
                            <a href="#" className='page-link' onClick={this.next}>Next</a>
                        </li>
                    </ul>
                </nav>
            </Wrapper>
        )
    }
}


export default Users;