import { Balance, SubscriptionItem, SubscriptionType } from "@/_types";

export const balances: Balance[] = [
    {
        name: 'ussd catalogue for menu 123 ',
        balance: 'ussd123',
        srcIcon: '/images/current-usage.svg'
    },
    {
        name: 'Catalogue for mobile...',
        balance: 'AfriVendas',
        srcIcon: '/images/available-credit.svg'
    },
    {
        name: 'mobile money solution.',
        balance: 'AfriMoney',
        srcIcon: '/images/prepaid-balance.svg'
    }
]

export const subscriptionItem: SubscriptionItem[] = [
    {
        type: SubscriptionType.Data,
        remaining: 16,
        total: 32
    },
    {
        type: SubscriptionType.Voice,
        remaining: 86,
        total: 100
    },
    {
        type: SubscriptionType.SMS,
        remaining: 100,
        total: 1200
    }
]