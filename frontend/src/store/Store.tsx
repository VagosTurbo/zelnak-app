const Store: Record<string, any> = {}

export enum StoreKeys {
    Address = 'Address',
    Pictures = 'Pictures',
    Availability = 'Availability',
    VerificationDocument = 'VerificationDocument',
    GetPropertyById = 'GetPropertyById',
}

export const getStore = (key: StoreKeys) => {
    return Store[key]
}

export const setStore = (key: StoreKeys, value: any) => {
    Store[key] = value
}

export default Store
