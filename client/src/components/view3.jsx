import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import useAxios from "axios-hooks"
import useHTTP from '../Hooks/useHttp';
import { useGetProductsQuery } from '../app/appProduct/productApiSlice';
import AddToBasket from './addToBasket';
import { useAddOrderMutation } from '../app/appOrders/orderApiSlice';
//import { InputNumber } from 'primereact/inputnumber';
import { Flex, InputNumber } from 'antd';

export default function BasicDemo() {
    const a = ["aa", "bb"]
    //const [count, setCount] = useState(1)
    const [value, setValue] = useState(0)
    const [addBasket, setAddBaset] = useState(false)
    // const [pToAdd, setPToAdd] = useState("8578fb6d39f0ecf1447")
    const userAll = sessionStorage.getItem("userAll")
    console.log("userAll: ", userAll);
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetProductsQuery({})
    const [addFunc, { isError: ie1, isSuccess: is1, isLoading: il1, data: d1, error: e1 }] = useAddOrderMutation()



    const userName = sessionStorage.getItem("user")
    const userId = sessionStorage.getItem("userId")?.toString()
    console.log("dataOfProduct: ", data);
    // const [{ data, loading, error }, refetch] = useAxios('http://localhost:4444/api/product')
    const [products, setProducts] = useState(a);
    const [layout, setLayout] = useState('grid');
    const amountOfProduct = useRef("ref")
    // const { delItem, updateItem, addItem } = useHTTP()

    //const AddToTheBasket = async (p, amount) => {



    // const userName = sessionStorage.getItem("user")
    // console.log("userName: ",userName);
    // const myUser = data?.find((u)=>u.userName==userName)
    // console.log("myUserOnView ",myUser);

    //*****************//

    //console.log(props.user.Shoppingbasket)
    // props.user.Shoppingbasket.append(amount,p)
    // props.user.Shoppingbasket = {amount,p}
    // }


    useEffect(() => {
        setProducts(data)
    }, [data]);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
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



    // const listItem = (product, index) => {
    //     return (
    //         <div className="col-12" key={product.id}>
    //             <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
    //                 <img className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`https://primefaces.org/cdn/primereact/images/product/${product.image}`} alt={product.name} />
    //                 <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
    //                     <div className="flex flex-column align-items-center sm:align-items-start gap-3">
    //                         <div className="text-2xl font-bold text-900">{product.name}</div>
    //                         <Rating value={product.rating} readOnly cancel={false}></Rating>
    //                         <div className="flex align-items-center gap-3">
    //                             <span className="flex align-items-center gap-2">
    //                                 <i className="pi pi-tag"></i>
    //                                 <span className="font-semibold">{product.category}</span>
    //                             </span>
    //                             <Tag value={product.inventoryStatus} severity={getSeverity(product)}></Tag>
    //                         </div>
    //                     </div>
    //                     <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
    //                         <span className="text-2xl font-semibold">${product.price}</span>
    //                         <Button icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

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
                        {/* :כמות*/}
                        {/* <InputNumber value={value} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons buttonLayout="vertical" style={{width: '3em', height:'2px'}}
    decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" /> */}
                        {/* <InputNumber value={value} onValueChange={(e) => setValue1(e.value)} mode="decimal" showButtons buttonLayout="vertical" min={0} max={100} decrementButtonClassName="p-button-secondary" incrementButtonClassName="p-button-secondary" incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" /> */}
                        {/* <InputNumber value={value} onValueChange={(e) => setValue1(e.value)} min={0} max={100} /> */}

                        {/* <InputNumber value={value} onValueChange={(e) => setValue1(e.value)} showButtons buttonLayout="horizontal"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus" mode="decimal" /> */}
                        <InputNumber onChange={(e)=>{setValue(e)}} ref={amountOfProduct} placeholder="amount" style={{ width: 200 }} min={0} />


                        {/* <button onClick={() => { setCount(count + 1) }}>+</button>
                        //    decrementButtonClassName="p-button-success" incrementButtonClassName="p-button-success" 
                        <div>{count}</div>
                        <button onClick= {() => { if(count!==0)setCount(count - 1) }}>-</button> */}
                        {/* <input ref={amount} type={Number} /> */}

                        <Button onClick={() => {
                            setValue("")
                            console.log("userIdd: ",userId)
                            addFunc({ userId: userId?.toString(), productId: product._id, amount: value, url: product.url, productName: product.name, status: product.inventoryStatus, userName: userName?.toString() });
                            alert(`${value} ${product.name} added`)
                        }} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button>
                        {/* <Button onClick={async () => { await addFunc({ productId: product._id, amount: count, url: product.url, productName: product.name, status: product.inventoryStatus, userName: userName }); alert(`${count} ${product.name} added ${product.inventoryStatus}`) }} icon="pi pi-shopping-cart" className="p-button-rounded" disabled={product.inventoryStatus === 'OUTOFSTOCK'}></Button> */}

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

        // if (layout === 'list') return listItem(product, index);else
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
        < >


            {/* {addBasket && <AddToBasket productId={pToAdd} amount={parseInt(amount.current)} />} */}
            <div className='card' >
                <DataView value={products} listTemplate={listTemplate} layout={layout} />
                {/* <DataView value={products} listTemplate={listTemplate} layout={layout} header={header()} /> */}
                <button onClick={refetch}>refetch</button>
            </div>
        </>
    )
}
