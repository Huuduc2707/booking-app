export interface Event {
    id: string;
    name: string;
    date: Date;
    image_url: string;
    price: number;
    state: string;
    location: string;
    category: string;
}

export const eventList: Event[] = [
    {
        id: "1",
        name: "Born Pink",
        date: new Date(),
        image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        price: 80000,
        state: "public",
        location: "Ho Chi Minh",
        category: "Play"
    },
    {
        id: "2",
        name: "Born Orange",
        date: new Date(),
        image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        price: 40000,
        state: "public",
        location: "Ha Noi",
        category: "Play"
    },
    {
        id: "3",
        name: "Born Stale",
        date: new Date(),
        image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        price: 10000,
        state: "public",
        location: "Hai Phong",
        category: "Play"
    },

]