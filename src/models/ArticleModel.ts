class ArticleModel {
    id: number;
    title: string;
    author: string;
    full_text: string;
    category: string;
    img?: string;

    constructor (id: number, title: string, author: string, full_text: string, category: string, img?: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.full_text = full_text;
        this.category = category;
        this.img = img;
    }
}

export default ArticleModel;
