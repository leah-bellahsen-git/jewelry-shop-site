import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/productService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useDeleteOrderMutation, useGetOrderByIdQuery, useUpdateOrderMutation } from '../app/appOrders/orderApiSlice';
import { useGetProductsQuery } from '../app/appProduct/productApiSlice';
import { Checkbox } from '@mui/material';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';

export default function RowExpansionDemo() {


    const userName = sessionStorage.getItem("user")
    console.log("userName:" ,userName);
    const { data, isLoading, isSuccess, isError, error, refetch } = useGetOrderByIdQuery({})
        const [deleteFunc, { data:d, isLoading:il, isSuccess:is, isError:ie, error:e, refetch:r }] = useDeleteOrderMutation({})
        useEffect(() => {
            refetch()
        }, []); // eslint-disable-line react-hooks/exhaustive-deps
     //const { data: d, isLoading: il, isSuccess: is, isError: ie, error: e, refetch: r } = useGetProductsQuery({})
    // const [ update, {data: d1, isLoading: il1, isSuccess: is1, isError: ie1, error: e1, refetch: r1}] = useUpdateOrderMutation({})



    console.log("all orders by id: ", data);


    // const getProductsMini = () => {
    //     return Promise.resolve(d.slice(0, 5));
    // }

    // const getProductsSmall = () => {
    //     return Promise.resolve(d.slice(0, 10));
    // }

    // const getProducts = () => {
    //     return Promise.resolve(d);
    // }

    const getProductsWithOrdersSmall = () => {
        return Promise.resolve(data?.slice(0, 10));
    }

    const getProductsWithOrders = () => {
        return Promise.resolve(data);
    }


    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    // const toast = useRef(null);





    useEffect(() => {
        console.log("use effect");
        getProductsWithOrdersSmall().then((data) => setProducts(data));
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    const onRowExpand = (event) => {
        toast.current.show({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    };

    const onRowCollapse = (event) => {
        toast.current.show({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    };

    const expandAll = () => {
        let _expandedRows = {};

        products?.forEach((p) => (_expandedRows[`${p.id}`] = true));

        setExpandedRows(_expandedRows);
    };

    const collapseAll = () => {
        setExpandedRows(null);
    };

    const formatCurrency = (value) => {
        return value?.toLocaleString('en-US');
    };

    const amountBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const statusOrderBodyTemplate = (rowData) => {
        return <Tag value={rowData.status.toLowerCase()} severity={getOrderSeverity(rowData)}></Tag>;
    };

    const searchBodyTemplate = () => {
        return <Button icon="pi pi-search" />;
    };
    const nameProdBodyTemplate = (rowData) => {
        return formatCurrency(rowData.productName);
    };
    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.url} alt={rowData.url} width="64px" className="shadow-4" />;
    };

    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.amount);
    };

    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.rating} readOnly cancel={false} />;
    };

    const statusBodyTemplate = (rowData) => {

        return <Tag value={rowData.status} severity={getProductSeverity(rowData)}></Tag>;
    };
    const field = useRef(false)
    const toast = useRef(null)

   

    const deleteBodyTemplate = (rowData) => {

      //  update(newOrder);

        return (
            <>
                <Button label="Delete" icon="pi pi-trash" onClick={()=>{ deleteFunc(rowData._id); refetch()}}/>
            </>
        )

        //   <Button icon="pi delete-left" color='black'></Button>;//style={}
        // <Tag value={rowData.status} severity={getProductSeverity(rowData)}></Tag>;
        //inputId={field.name}
        //<Checkbox inputId={field.name} checked={field.value} inputRef={field.ref} onChange={(e) => field.onChange(e.checked)} />
    };

    const getProductSeverity = (product) => {
        switch (product.status) {
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

    const getOrderSeverity = (order) => {
        switch (order.status) {
            case 'DELIVERED':
                return 'success';

            case 'CANCELLED':
                return 'danger';

            case 'PENDING':
                return 'warning';

            case 'RETURNED':
                return 'info';

            default:
                return null;
        }
    };

    const allowExpansion = (rowData) => {
        return rowData?.orders?.length > 0;
    };

    const rowExpansionTemplate = (data) => {
        return (
            <div className="p-3">
                <h5>Orders for {data.name}</h5>
                <DataTable value={data.orders}>
                    <Column field="id" header="Id" sortable></Column>
                    <Column field="customer" header="Customer" sortable></Column>
                    <Column field="date" header="Date" sortable></Column>
                    <Column field="amount" header="Amount" body={amountBodyTemplate} sortable></Column>
                    <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column>
                    <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}>iiiiiiiiiiiiiiiiiiii</Column>
                </DataTable>
            </div>
        );
    };

    const header = (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
            <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
        </div>
    );

    return (
        <div className="card">
            <Toast ref={toast} />
            <DataTable value={products} expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
                onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}>
                <Column expander={allowExpansion} style={{ width: '5rem' }} />
                <Column field="name" header="Name" sortable body={nameProdBodyTemplate} />
                <Column header="Image" body={imageBodyTemplate} />
                <Column field="amount" header="Amount" sortable body={priceBodyTemplate} />
                <Column field="rating" header="Reviews" sortable body={ratingBodyTemplate} />
                <Column field="active" header="Active" sortable body={statusBodyTemplate} />
                <Column field="delete" header="Delete" sortable body={deleteBodyTemplate} />
            </DataTable>
        </div>
    );
}
