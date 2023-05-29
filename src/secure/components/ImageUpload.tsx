import axios from 'axios';
import React, { useState } from 'react'

interface Props {
    value: string;
    imageChanged: any
}

export default function ImageUpload({ value, imageChanged }: Props) {

    let [image, setImage] = useState('');

    const uploadImage = async (files: FileList | null) => {

        if (files === null) return;
        const data = new FormData();
        data.append('image', files[0]);
        const res = await axios.post('upload', data);

        setImage(res.data.url);

        imageChanged(image);
        console.log(image);


    }

    return (
        <div className='form-group'>
            <label>Image</label>
            <div className='input-group'>
                <input type="text" className='form-control' name='image'
                    onChange={
                        e => {
                            setImage(e.target.value);
                            imageChanged(e.target.value)
                        }
                    }
                    value={value} />
                <div className='input-group-append'>
                    <label className='btn btn-primary' >
                        Upload <input type="file" hidden onChange={e => uploadImage(e.target.files)} />
                    </label>
                </div>
            </div>

        </div>
    )
}
