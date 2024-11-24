export enum OrderStatusEnum {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected',
}

export const OrderStatus: Record<OrderStatusEnum, string> = {
    [OrderStatusEnum.Pending]: 'Pending',
    [OrderStatusEnum.Accepted]: 'Accepted',
    [OrderStatusEnum.Rejected]: 'Rejected',
}
