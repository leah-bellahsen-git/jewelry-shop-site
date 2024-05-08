
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from './service/productService';
import { Rating } from 'primereact/rating';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { useDeleteOrderMutation, useGetOrdersQuery, useUpdateOrderMutation } from '../app/appOrders/orderApiSlice';
import { useGetProductsQuery } from '../app/appProduct/productApiSlice';
import { Checkbox } from '@mui/material';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import AdminAppBar from './adminAppBar';

const AllOrders = () => {

    const { data, isLoading, isSuccess, isError, error, refetch } = useGetOrdersQuery({})
    const { data: d, isLoading: il, isSuccess: is, isError: ie, error: e, refetch: r } = useGetProductsQuery({})
    const [update, { data: d1, isLoading: il1, isSuccess: is1, isError: ie1, error: e1, refetch: r1 }] = useUpdateOrderMutation({})
    const [deleteOrderFunc, { data: d2, isLoading: il2, isSuccess: is2, isError: ie2, error: e2, refetch: r2 }] = useDeleteOrderMutation({})



    // console.log("all orders: ", data);


    // const getCustomersSmall = () => {
    //     return Promise.resolve(data.slice(0, 10));
    // }
    // const getCustomersMedium = () => {
    //     return Promise.resolve(data.slice(0, 50));
    // }
    // const getCustomersLarge = () => {
    //     return Promise.resolve(data.slice(0, 200));
    // }
    // const getCustomersXLarge = () =>{
    //     return Promise.resolve(data);
    // }
    // const getCustomers = (params)=> {
    //     const queryParams = params
    //         ? Object.keys(params)
    //               .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    //               .join('&')
    //         : '';

    //     return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    // }


    const getProductsMini = () => {
        return Promise.resolve(d.slice(0, 5));
    }

    const getProductsSmall = () => {
        return Promise.resolve(d.slice(0, 10));
    }

    const getProducts = () => {
        return Promise.resolve(d);
    }

    const getProductsWithOrdersSmall = () => {
        return Promise.resolve(data?.slice(0, 10));
    }

    const getProductsWithOrders = () => {
        return Promise.resolve(data);
    }


    const [products, setProducts] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const toast = useRef(null);

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] }
    });



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
        // return value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        return value?.toLocaleString();

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
    const nameUserBodyTemplate = (rowData) => {
        return formatCurrency(rowData.userName);
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
    const onGlobalFilterChange = (event) => {
        const value = event.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        console.log("filters:", filters);
    };
    const deleteBodyTemplate = (rowData) => {
        <Button id='myButton' />

        const newOrder = {
            id: rowData._id,
            active: false
        }
        //  update(newOrder);

        return (
            <>
                {/* <Checkbox checked={field.value} inputRef={field.ref} /> */}
                <Button label="Delete" icon="pi pi-trash" onClick={() => { deleteOrderFunc(rowData._id); alert("Deleted"); refetch() }} />
                {/* <Button icon="pi pi-times" rounded severity="danger" aria-label="Cancel" /> */}
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
                    <Column field="name" header="Amount" body={priceBodyTemplate} sortable></Column>
                    <Column field="status" header="Status" body={statusOrderBodyTemplate} sortable></Column>
                    <Column headerStyle={{ width: '4rem' }} body={searchBodyTemplate}>iiiiiiiiiiiiiiiiiiii</Column>
                </DataTable>
            </div>
        );
    };

    // const header = (
    //     <div className="flex flex-wrap justify-content-end gap-2">
    //         <Button icon="pi pi-plus" label="Expand All" onClick={expandAll} text />
    //         <Button icon="pi pi-minus" label="Collapse All" onClick={collapseAll} text />
    //     </div>
    // );
    const renderHeader = () => {
        const value = filters['global'] ? filters['global'].value : '';

        return (
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" value={value || ''} onChange={(e) => onGlobalFilterChange(e)} placeholder="Global Search" />
            </span>
        );
    };
    const header = renderHeader();

    return (
        <>
            <AdminAppBar />
            <br/><br/>
            <div className="card">
                <Toast ref={toast} />
                <DataTable value={products} expandedRows={expandedRows} header={header} onRowToggle={(e) => setExpandedRows(e.data)}
                    onRowExpand={onRowExpand} onRowCollapse={onRowCollapse} rowExpansionTemplate={rowExpansionTemplate}
                    dataKey="id" tableStyle={{ minWidth: '60rem' }}>
                    {/* dataKey="id" header={header} tableStyle={{ minWidth: '60rem' }}> */}

                    <Column expander={allowExpansion} style={{ width: '5rem' }} />
                    <Column field="name" header="Product name" sortable body={nameProdBodyTemplate} />
                    <Column header="name" body={nameUserBodyTemplate} sortable sortField="userName" filter filterField="userName" filterPlaceholder="Search" style={{ width: '25%' }} />

                    {/* <Column field="name" header="Name"  body={nameBodyTemplate} sortable filter filterPlaceholder="Search" style={{ width: '25%' }}></Column> */}
                    <Column header="Image" body={imageBodyTemplate} />
                    <Column field="name" header="Amount" sortable sortField="amount" body={priceBodyTemplate} />
                    <Column field="rating" header="Reviews" sortable sortField="rating" body={ratingBodyTemplate} />
                    <Column field="active" header="Active" sortable sortField="active" body={statusBodyTemplate} />
                    <Column field="delete" header="Delete" body={deleteBodyTemplate} />
                </DataTable>
        </div >
         </>
    );
}



export default AllOrders