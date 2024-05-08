export const CustomerService = {

    


    getData() {
       // const { data, isLoading, isSuccess, isError, error, refetch } = useGetOrderByIdQuery()
        return [
            {
                id: 1102,
                name: 'Angella Cetta',
                country: {
                    name: 'Vietnam',
                    code: 'vn'
                },
                company: 'Bender & Hatley Pc',
                date: '2018-04-10',
                status: 'qualified',
                verified: false,
                activity: 88,
                representative: {
                    name: 'Ivan Magalhaes',
                    image: 'ivanmagalhaes.png'
                },
                balance: 58964
            },
            {
                id: 1499,
                name: 'Chauncey Motley',
                country: {
                    name: 'Argentina',
                    code: 'ar'
                },
                company: 'Affiliated With Travelodge',
                date: '2019-04-23',
                status: 'renewal',
                verified: true,
                activity: 42,
                representative: {
                    name: 'Amy Elsner',
                    image: 'amyelsner.png'
                },
                balance: 88090
            }
        ];
    },

    getCustomersSmall() {
        return Promise.resolve(this.getData().slice(0, 10));
    },

    getCustomersMedium() {
        return Promise.resolve(this.getData().slice(0, 50));
    },

    getCustomersLarge() {
        return Promise.resolve(this.getData().slice(0, 200));
    },

    getCustomersXLarge() {
        return Promise.resolve(this.getData());
    },

    getCustomers(params) {
        const queryParams = params
            ? Object.keys(params)
                  .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                  .join('&')
            : '';

        return fetch('https://www.primefaces.org/data/customers?' + queryParams).then((res) => res.json());
    }
};
