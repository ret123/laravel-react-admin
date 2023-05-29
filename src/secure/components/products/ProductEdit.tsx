import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../Wrapper'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Product } from '../../../classes/product';


type ProductId = {
    id: string;
};


const ProductEdit = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState(0);


    const navigate = useNavigate();
    const { id } = useParams<ProductId>();


    const fetchProductDetails = async () => {
        const product_id = id;

        const res = await axios.get(`/products/${product_id}`);
        const product: Product = res.data.data;
        setTitle(product.title);
        setDescription(product.description);
        setImage(product.image);
        setPrice(product.price);


    }

    useEffect(() => {

        fetchProductDetails();

        // console.log(id);
    }, []);

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`products/${id}`, {
            title: title,
            description: description,
            image: image,
            price: price
        });
        navigate('/products');

    }

    return (
        <Wrapper>
            <form onSubmit={handleSubmit}>

                <h1 className="h3 mb-3 fw-normal">Edit User</h1>

                <div className="form-floating mb-3">

                    <input type="text" className="form-control" placeholder="product name" onChange={e => setTitle(e.target.value)} value={title} />
                    <label>Product Name</label>

                </div>

                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="product description" onChange={e => setDescription(e.target.value)} value={description} />
                    <label>Product Description</label>

                </div>
                <div className="form-floating mb-3">

                    <input type="text" className="form-control" placeholder="image url" onChange={e => setImage(e.target.value)} value={image} />
                    <label>Image</label>

                </div>

                <div className="form-floating mb-3">

                    <input type="number" className="form-control" placeholder="price" onChange={e => setPrice(parseFloat(e.target.value))} value={price} />
                    <label>Product Price</label>

                </div>



                <button className="w-100 btn btn-lg btn-primary" type="submit">Save</button>

            </form>
        </Wrapper>
    )

}

export default ProductEdit;