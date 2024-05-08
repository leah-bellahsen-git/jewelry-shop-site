export const ProductService = {
        getData() {
            return [
                {
                    id: 1000,
                    name: 'James Butt',
                    country: {
                        name: 'Algeria',
                        code: 'dz'
                    },
                    company: 'Benton, John B Jr',
                    date: '2015-09-13',
                    status: 'unqualified',
                    verified: true,
                    activity: 17,
                    representative: {
                        name: 'Ioni Bowcher',
                        image: 'ionibowcher.png'
                    },
                    balance: 70663
                },
                {
                    id: 1498,
                    name: 'Jani Biddy',
                    country: {
                        name: 'Switzerland',
                        code: 'ch'
                    },
                    company: 'Warehouse Office & Paper Prod',
                    date: '2019-11-07',
                    status: 'negotiation',
                    verified: false,
                    activity: 20,
                    representative: {
                        name: 'Onyama Limba',
                        image: 'onyamalimba.png'
                    },
                    balance: 69613
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
    