export const stages = [
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'Open Deal',
        count: '6/55',
        deals: [
            {
                name: 'Deal 1',
                amount: 10000,
                closeDate: '2021-09-15',
                companyName: 'Company 1',
                id: 1,
            },
            {
                name: 'Deal 2',
                amount: 30000,
                closeDate: '2021-09-13',
                companyName: 'Company 12',
                id: 2,
            },
            {
                name: 'Deal 3',
                amount: 20000,
                closeDate: '2021-09-12',
                companyName: 'Company 13',
                id: 3,
            },
            {
                name: 'Deal 4',
                amount: 20000,
                closeDate: '2021-09-12',
                companyName: 'Company 13',
                id: 4,
            },
            {
                name: 'Deal 5',
                amount: 20000,
                closeDate: '2021-09-12',
                companyName: 'Company 13',
                id: 5,
            },
            {
                name: 'Deal 6',
                amount: 20000,
                closeDate: '2021-09-12',
                companyName: 'Company 13',
                id: 6,
            },
            {
                name: 'Deal 7',
                amount: 20000,
                closeDate: '2021-09-12',
                companyName: 'Company 13',
                id: 7,
            },
        ],
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'In Progress',
        count: '13/55',
        deals: [
            {
                name: 'Deal 2',
                amount: 20000,
                closeDate: '2021-09-15',
                companyName: 'Company 2',
                id: 8,
            },
            {
                name: 'Deal 8',
                amount: 20000,
                closeDate: '2021-09-12',
                companyName: 'Company 13',
                id: 9,
            },
        ],
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'Likely to Win',
        count: '4/55',
        deals: [
            {
                name: 'Deal 3',
                amount: 30000,
                closeDate: '2021-09-15',
                companyName: 'Company 3',
                id: 10,
            },
        ],
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'On Hold',
        count: '3/55',
        deals: [
            {
                name: 'Deal 4',
                amount: 40000,
                closeDate: '2021-09-15',
                companyName: 'Company 4',
                id: 11,
            },
        ],
    },
    {
        id: Math.floor(Math.random() * 1000000),
        title: 'First Priority',
        count: '2/55',
        deals: [
            {
                name: 'Deal 5',
                amount: 50000,
                closeDate: '2021-09-15',
                companyName: 'Company 5',
                id: 12,
            },
        ],
    },
];

export type StagesType = typeof stages;
export type StageType = (typeof stages)[0];

export type DealsType = StageType['deals'];
export type DealType = DealsType[0];
