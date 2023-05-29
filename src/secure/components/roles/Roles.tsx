import React, { useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Role } from '../../../classes/role';

export default function Roles() {

    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    const fecthRoles = async () => {
        const res = await axios.get('roles');
        // console.log(res);
        setRoles(res.data.data);
    }

    useEffect(() => {
        fecthRoles();
    }, [])


    const deleteRole = async (index: number, id: number) => {

        if (window.confirm('Are you sure, you want to delete?')) {
            await axios.delete(`roles/${id}`);
            // setRoles(roles.filter((role: Role) => role.id !== id))

            roles.splice(index, index + 1);
            setRoles(roles);
            // console.log(roles);
            navigate('/roles');
        }



    }



    return (

        <Wrapper>
            <div className='d-flex justify-content-end flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3'>
                <div className='btn-toolbar mb-2 mb-md-0'>
                    <Link to={"/roles/create"} className='btn btn-sm btn-outline-secondary'>Add Role</Link>
                </div>

            </div>
            <div className='table-responsive'>
                <table className='table table-striped table-sm'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>

                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role: Role, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className='btn-group mr-2'>
                                            <Link to={`/roles/${role.id}/edit`} className='btn btn-sm btn-outline-secondary'>Edit</Link>
                                            <button className='btn btn-sm btn-outline-secondary' onClick={() => deleteRole(index, role.id)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>

                            );
                        })}

                    </tbody>
                </table>
            </div>

        </Wrapper>

    )
}
