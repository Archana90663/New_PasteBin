export class Paste{
    constructor (
        public id: string,
        public title: string,
        public created_at: string,
        public expire_at: string,
        public body: string
    ){ }
}