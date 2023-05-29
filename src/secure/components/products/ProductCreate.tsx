import React, { Component, SyntheticEvent } from 'react'
import Wrapper from '../../Wrapper'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class ProductCreate extends Component {

    title = '';
    description = '';
    image = '';
    price = 0;

    state = {
        image: '',
        redirect: false
    }

    handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('products', {
            title: this.title,
            description: this.description,
            image: this.image,
            price: this.price
        })
        this.setState({
            redirect: true
        })

    }


    uploadImage = async (files: FileList | null) => {

        if (files === null) return;
        const data = new FormData();
        data.append('image', files[0]);
        const res = await axios.post('upload', data);
        this.image = res.data.url;
        // console.log(this.image);
        this.setState({
            image: this.image
        })


    }

    render() {
        if (this.state.redirect) {
            return <Navigate to={'/products'} />
        }
        return (
            <Wrapper>
                <h1 className="h3 mb-3 fw-normal">Create Product</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label>Title</label>
                        <input type="text" className='form-control' name='title' onChange={e => this.title = e.target.value} />
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <textarea className='form-control' onChange={e => this.description = e.target.value}></textarea>
                    </div>
                    <div className='form-group'>
                        <label>Image</label>
                        <div className='input-group'>
                            <input type="text" className='form-control' name='image' onChange={e => this.image = e.target.value} value={this.image = this.state.image} />
                            <div className='input-group-append'>
                                <label className='btn btn-primary' >
                                    Upload <input type="file" hidden onChange={e => this.uploadImage(e.target.files)} />
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className='form-group'>
                        <label>Price</label>
                        <input type="number" className='form-control' name='price' onChange={e => this.price = parseFloat(e.target.value)} />
                    </div>
                    <button className="btn btn-outline-secondary mt-4">Save</button>
                </form>
            </Wrapper>
        )
    }
}
