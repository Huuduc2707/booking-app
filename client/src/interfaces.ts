export interface Event {
    id: string;
    title: string;
    date: Date;
    imageUrl: string;
    // priceRange: { name: string, price: number, quantity: number }[];
    price: number;
    location: string;
    category: { id: string, name: string }[];
    bookingNum: string;
    revenue: number | null;
}

export interface EventSummary {
    eventNum: number;
    detail: Event[];
    highestRevenue: Event[];
    mostBooked: Event[];
}

export interface Seat {
    id: string;
    status: string;
    seatType: {
        name: string;
        price: number;
    }
}

export interface Booking {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    totalPayment: number;
    event: string;
    seatsId: string[];
    seatsName: string[];
}