export interface Event {
    id: string;
    name: string;
    date: Date;
    image_url: string;
    priceRange: { name: string, price: number, quantity: number }[];
    location: string;
    category: string[];
}

export interface Seat {
    id: string;
    status: string;
    seatType: {
        name: string;
        price: number;
    }
}

export const eventList: Event[] = [
    {
        id: "EzZhjh6kS6",
        name: "Born Pink",
        date: new Date(),
        image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        priceRange: [
            {
                name: "Normal",
                price: 40000,
                quantity: 100
            },
            {
                name: "Vip",
                price: 80000,
                quantity: 20
            }
        ],
        location: "Ho Chi Minh",
        category: ["conference", "theater"]
    },
    {
        id: "2",
        name: "Born Orange",
        date: new Date(),
        image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        priceRange: [
            {
                name: "Normal",
                price: 90000,
                quantity: 100
            },
            {
                name: "Vip",
                price: 80000,
                quantity: 20
            }
        ],
        location: "Ha Noi",
        category: ["conference", "theater"]
    },
    {
        id: "3",
        name: "Born Stale",
        date: new Date(),
        image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        priceRange: [
            {
                name: "Normal",
                price: 40000,
                quantity: 100
            },
            {
                name: "Vip",
                price: 80000,
                quantity: 20
            }
        ],
        location: "Hai Phong",
        category: ["conference", "theater"]
    },

]