import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Role } from '../../../classes/role';
import { User } from '../../../classes/user';


type UserId = {
    id: string;
};


const UserEdit = () => {

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role_id, setRoleId] = useState(3);
    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams<UserId>();

    const fetchRoles = async () => {

        const res = await axios.get('roles');
        setRoles(res.data.data)

    }

    const fetchUserDetails = async () => {
        const user_id = id;
        console.log(user_id);
        const res = await axios.get(`/users/${user_id}`);
        const user: User = res.data.data;
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setEmail(user.email);
        setRoleId(user.role.id);

    }

    useEffect(() => {

        fetchUserDetails();
        fetchRoles();
        // console.log(id);
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`users/${id}`, {
            first_name: first_name,
            last_name: last_name,
            email: email,
            role_id: role_id
        });
        navigate('/users');

    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>

                <h1 className="h3 mb-3 fw-normal">Edit User</h1>

                <div className="form-floating mb-3">

                    <input type="text" className="form-control" placeholder="first name" onChange={e => setFirstName(e.target.value)} value={first_name} />
                    <label>First Name</label>

                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="last name" onChange={e => setLastName(e.target.value)} value={last_name} />
                    <label>Last Name</label>

                </div>
                <div className="form-floating mb-3">

                    <input type="email" className="form-control" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} value={email} />
                    <label>Email address</label>

                </div>

                <div className="form-floating mb-3">
                    <select className="form-select" id="floatingSelect" onChange={e => setRoleId(parseInt(e.target.value))} value={role_id}>

                        {roles.map((role: Role) => {
                            return <option key={role.id} value={role.id}>{role.name}</option>
                        })}

                    </select>
                    <label>Select Role</label>
                </div>

                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>

            </form>
        </Wrapper>
    )

}

export default UserEdit;