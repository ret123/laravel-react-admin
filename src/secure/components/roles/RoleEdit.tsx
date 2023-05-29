import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Permission } from '../../../classes/permission';
import { Role } from '../../../classes/role';

export default function RoleEdit() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [name, setName] = useState('');
    let [selected, setSelected] = useState<number[]>([]);;

    const [permissions, setPermissions] = useState([]);

    let isSelected: number[] = [];

    const fetchPermissions = async () => {

        const res = await axios.get('permissions');

        setPermissions(res.data.data);
    }

    const fetchRole = async () => {
        const res = await axios.get(`roles/${id}`);
        const role: Role = res.data.data;
        setName(role.name);
        setSelected(role.permissions.map((p: Permission) => p.id));

    }

    useEffect(() => {

        fetchPermissions();
        fetchRole();

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

        if (isChecked(id)) {
            selected = selected.filter(permission_id => permission_id !== id)
            return
        }

        selected.push(id);

    }

    const isChecked = (id: number) => {
        return selected.filter(permission_id => permission_id === id).length > 0

    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>

                <h1 className="h3 mb-3 fw-normal">Edit Role</h1>

                <div className="form-group row">
                    <label className='col-sm-2 col-form-label'>Role Name</label>
                    <div className='col-sm-10'>
                        <input type="text" className="form-control" onChange={e => setName(e.target.value)} value={name} />
                    </div>


                </div>
                <div className="form-group row mt-2">
                    <label className='col-sm-2 col-form-label'>Permissions</label>
                    <div className='col-sm-10'>
                        {permissions.map((p: Permission) => (
                            <div className='form-check-inline col-3' key={p.id}>
                                <input type="checkbox" className="form-check-input" value={p.id}
                                    defaultChecked={isChecked(p.id)} onChange={() => checked(p.id)} />
                                <label className='ml-2 form-check-label'>{p.name}</label>
                            </div>
                        ))}

                    </div>

                </div>


                <button className="btn mt-4 btn-primary" type="submit">Update Role</button>

            </form>
        </Wrapper>
    )
}
