export interface Post {
    title: string
    date: Date
    imageUrl: string
    userName: string
}
export interface addPost {
    title: string
    image?: File
}