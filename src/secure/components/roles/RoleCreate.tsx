import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Permission } from '../../../classes/permission';

export default function RoleCreate() {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);

    let selected: number[] = [];

    const fetchPermissions = async () => {

        const res = await axios.get('permissions');

        setPermissions(res.data.data);
    }

    useEffect(() => {

        fetchPermissions();

    }, [])


    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();


        await axios.post('roles', {
            name: name,
            permissions: selected
        });
        navigate('/roles');
    }

    const checked = (id: number) => {

        if (selected.filter(permission_id => permission_id === id).length > 0) {
            selected = selected.filter(permission_id => permission_id !== id)
            return
        }

        selected.push(id);
    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>

                <h1 className="h3 mb-3 fw-normal">Create Role</h1>

                <div className="form-group row">
                    <label className='col-sm-2 col-form-label'>Role Name</label>
                    <div className='col-sm-10'>
                        <input type="text" className="form-control" onChange={e => setName(e.target.value)} />
                    </div>


                </div>
                <div className="form-group row mt-2">
                    <label className='col-sm-2 col-form-label'>Permissions</label>
                    <div className='col-sm-10'>
                        {permissions.map((p: Permission) => (
                            <div className='form-check-inline col-3' key={p.id}>
                                <input type="checkbox" className="form-check-input" value={p.id} onChange={() => checked(p.id)} />
                                <label className='ml-2 form-check-label'>{p.name}</label>
                            </div>
                        ))}



                    </div>


                </div>


                <button className="btn mt-4 btn-primary" type="submit">Create Role</button>

            </form>
        </Wrapper>
    )
}
