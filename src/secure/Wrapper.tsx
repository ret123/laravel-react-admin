import React, { Component, ReactNode } from 'react'
import Nav from './components/Nav'
import Sidebar from './components/Sidebar'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class Wrapper extends Component<{ children?: ReactNode; }> {

    state = {
        redirect: false
    }

    componentDidMount = async () => {
        const token = localStorage.getItem('token');

        if (token !== null) {
            const res = await axios.get('user');
            // console.log(res);
        } else {
            this.setState({
                redirect: true
            })
        }
    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/login'} />
        }
        return (
            <>
                <Nav />
                <div className="container-fluid">
                    <div className="row">
                        <Sidebar />
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>

        )
    }
}
