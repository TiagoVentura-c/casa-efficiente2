import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AddCardIcon from '@mui/icons-material/AddCard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PaymentsIcon from '@mui/icons-material/Payments';

export type Item = {
    name: string;
    slug: string;
    description?: string;
    Icon: any
  };

export const menus: { name: string; items: Item[] }[] = [
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
            {
                name: 'Usuarios',
                slug: 'service-types',
                Icon: ManageAccountsIcon
            },
            {
                name: 'Alugar/Comprar imoveis',
                slug: 'location-and-regions',
                Icon: ManageAccountsIcon
            },
        ]
    },
    
]

export const menus2 = [
    
]