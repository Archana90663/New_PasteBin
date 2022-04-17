export class Paste{
    constructor (
        public id: string,
        public userID: string,
        public title: string,
        public created_at: string,
        public expire_at: string,
        public body: string,
        public tag: string,
        public language: string
    ){ }
}