export interface ResponseAPI {
    user: User;
    token: string;
}
export interface User {
    id: string;
    email: string;
    name: string;
}