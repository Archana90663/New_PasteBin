export class Paste{
    constructor (
        public id: string,
        public userID: string, //changed it
        public title: string,
        public created_at: string,
        public expire_at: string,
        public body: string,
        public tag: string
    ){ }
}