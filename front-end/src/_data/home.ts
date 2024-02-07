import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCardIcon from '@mui/icons-material/AddCard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentsIcon from '@mui/icons-material/Payments';
import { Person } from '@/_types/index2';
import Cookies from 'js-cookie';

export type Item = {
    name: string;
    slug: string;
    description?: string;
    Icon: any
  };

const storedUser: Person = JSON.parse(Cookies.get('user') as string);

export const adminMenu: { name: string; items: Item[] }[] = [
    {
        name: 'first',
        items:[
            {
                name: 'Usuarios',
                slug: 'service-types',
                Icon: ManageAccountsIcon
            }
        ]
    },
]

export const brokerMenu: { name: string; items: Item[] }[] = [
    {
        name: 'first',
        items:[
            {
                name: 'Imoveis',
                slug: 'plans',
                Icon: AddCardIcon
            },
            {
                name: 'Vendas',
                slug: 'channels',
                Icon: PaymentsIcon
            },
        ]
    },
]

export const clientrMenu: { name: string; items: Item[] }[] = [
    {
        name: 'first',
        items:[
            {
                name: 'Alugar/Comprar imoveis',
                slug: 'location-and-regions',
                Icon: ManageAccountsIcon
            }
        ]
    },
]


export const menus: { name: string; items: Item[] }[] = storedUser.type == 'ADMIN' ? adminMenu : ( storedUser.type == 'BROKER' ? brokerMenu: clientrMenu )
