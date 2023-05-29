import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './secure/components/dashboard/Dashboard';
import Users from './secure/components/users/Users';
import Login from './public/Login';
import Register from './public/Register';
import UserCreate from './secure/components/users/UserCreate';
import UserEdit from './secure/components/users/UserEdit';
import RoleCreate from './secure/components/roles/RoleCreate';
import Roles from './secure/components/roles/Roles';
import RoleEdit from './secure/components/roles/RoleEdit';
import Products from './secure/components/products/Products';
import ProductCreate from './secure/components/products/ProductCreate';
import ProductEdit from './secure/components/products/ProductEdit';

function App() {
  return (
    <div>

      <Routes>
        <Route path={'/'} element={<Dashboard />} />
        <Route path={'/users'} element={<Users />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/register'} element={<Register />} />
        <Route path={'/users/create'} element={<UserCreate />} />
        <Route path={'/users/:id/edit'} element={<UserEdit />} />
        <Route path={'/roles'} element={<Roles />} />
        <Route path={'/roles/create'} element={<RoleCreate />} />
        <Route path={'/roles/:id/edit'} element={<RoleEdit />} />
        <Route path={'/products'} element={<Products />} />
        <Route path={'/products/create'} element={<ProductCreate />} />
        <Route path={'/products/:id/edit'} element={<ProductEdit />} />

      </Routes>


    </div >
  );
}

export default App;
