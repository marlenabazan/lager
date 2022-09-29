export default interface Invoice {
    id: number,
    order_id: number,
    total_price: number,
    creation_date: new Date(),
    due_date: string,
    api_key: string
}