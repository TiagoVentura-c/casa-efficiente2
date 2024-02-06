export type Balance = {
    name: string,
    balance: string,
    srcIcon: string,
}

export enum SubscriptionType {
    Data = 'Data', 
    Voice = 'Voice', 
    SMS = 'SMS', 
}

export type SubscriptionItem = {
    type: SubscriptionType,
    remaining: number,
    total: number
}

export enum ValidityType {
    Daily = 'Daily', 
    Weekly = 'Weekly', 
    Monthly = 'Monthly'
}

export enum Typebundle {
    Data = 'Data', 
    Voice = 'Voice', 
    SMS = 'SMS', 
    Combo = 'Combo',
    Credit = 'Credit'
}

export type Bundle = {
    Key: string,
    Name_PT: string,
    Description: string | null,
    Price:number,
    ValidityDays: number | undefined,
    ValidityType: ValidityType | string
    IsPromotional: number | undefined
    ProductionFlag: number | undefined
    ServiceType: Typebundle 
}


export type CatalogueEntry = {
    Description:string
    Description_Lang1:string
    Description_Lang2:string
    Description_Lang3:string
    Bundles: string[]
}


export type CatalogueApi = {
    Key?: string
    Id?: number
    Channel_Key: string
    Plan_Key: string
    Version: number | string
    Description: string
    Catalogue_Entries: CatalogueEntry[]
    Derived_Catalogue_Channel_Key?: string
    Derived_Catalogue_Plan_Key?: string
    Derived_Catalogue_Version?: string
}


export type EntryPerVersionAndPlan = {
    version: number | string
    plans: {
        planKey: string
        entries: CatalogueEntry[]
        Key: string
    }[]
}

export type MCatalogues = {
    channelKey: string
    key: string
    plansPerVersion: EntryPerVersionAndPlan[]
    description: string
}

export type Channel = {
    Key: string
    Id: number
    Description: string
}

export type Plan = {
    Key: string
    Id: number
    Description: string
}

export type ServiceType = {
    Key: string
    Id: number
    Description: string
}

export type BundleApi = {
    Key: string;
    Id: number;
    Name_Lang1: string;
    Name_Lang2: string;
    Name_Lang3: string;
    Description_Lang1: string;
    Description_Lang2: string;
    Description_Lang3: string;
    ServiceType: string;
    Validity_Type: string;
    Validity_Value: number;
    Validity_In_Days: number;
    Price: number;
    ChargingReason: string;
    AllowOverdraft: boolean;
    OverdraftLimit: number;
    Notification_Sender: string;
    Notification_Profile_Successful: string;
    Notification_Profile_Failed_General: string;
    Notification_Profile_Failed_LowBalance: string;
    Notification_Profile_AutoRenewAhead: string;
    Notification_Profile_AutoRenewSuccessful: string;
    Notification_Profile_AutoRenewFailed_General: string;
    Notification_Profile_AutoRenewFailed_LowBalance: string;
    Status: string;
    ProductionFlag: number;
    IsRecurring: boolean;
    RecuringBundleKey: string;
    IsAvailableForOthers: boolean;
    IsPromotional: boolean;
    Location_Areas?: any;
  }

  export type CatalogueMap = {
    [x: string]: {
        id: string,
        content: BundleApi
    }[]
  }

  export type LocationEntry = {
    Key: string;
    Id: number;
    LAC: string;
    Cell_ID: string;
    Bsname: string;
    Bssector: string;
    Latitude: string;
    Longitude: string;
    Region: string;
    Provinces: string;
    Municipality: string;
    Technology: string;
    IsOnAir: boolean;
    Add_Date: string;
  }

  export type LocationArea = {
    Key: string;
    Id: number;
    Type: string;
    Provinces: string;
    Municipality: string;
    Description: string;
    Location_Enties?: {
        [x: string]: string
    }[]
  }