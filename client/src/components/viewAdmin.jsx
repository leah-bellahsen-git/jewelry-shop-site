import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import useAxios from "axios-hooks"
import useHTTP from '../Hooks/useHttp';
import { useDeleteProductMutation, useGetProductsQuery } from '../app/appProduct/productApiSlice';
import AddToBasket from './addToBasket';
import DeleteItem from './deleteItem'
import AddProduct from './addProduct';
import AdminAppBar from './adminAppBar';

export default function ViewAdmin() {
    const a = ["aa", "bb"]
    const [delItem, setDelItem] = useState(false)
    const [pToDel, setPToDel] = useState(0)
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetProductsQuery({})
    
    const [deleteFunc, { data: d, isLoading: il, isSuccess: is, isErro: ier, error: e, refetch: r }] = useDeleteProductMutation({})

    console.log("dataOfProduct: ", data);
    // const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/product')
    const [products, setProducts] = useState(a);
    const [layout, setLayout] = useState('grid');
    // const { delItem, updateItem, addItem } = useHTTP()

    const deleteItem = () => {
        setDelItem(false)


    }

    useEffect(() => {
        setProducts(data)
    }, [data]);

    const getSeverity = (product) => {
        switch (product.amount) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    const gridItem = (product) => {
        return (

            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product.id}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-tag"></i>
                            <span className="font-semibold">{product.category}</span>
                        </div>
                        <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        <img className="w-9 shadow-2 border-round" src={product.url} />
                        <div className="text-2xl font-bold">{product.name}</div>
                        <Rating value={product.rating} readOnly cancel={false}></Rating>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        <Button onClick={() => { ; deleteFunc(product._id); alert(`${product.name} deleted`); refetch() }} icon="pi pi-delete-left" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        {/* <Button onClick={() => { setPToDel(product); setDelItem(true) }} icon="pi pi-delete-left" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}

                        {/* AddToBasket(product, amount.current.value) */}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products?.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <>
            <AdminAppBar />
            <br/><br/>
            {/* {    console.log("amount: ",amount.current)} */}
            {delItem && <DeleteItem product={pToDel} />}
            <div className="card">
                <AddProduct />
                {/* {isSuccess && refetch()} */}
                <DataView value={products} listTemplate={listTemplate} layout={layout} />
                {/* <button onClick={refetch}>refetch</button> */}
            </div>
        </>
    )
}
