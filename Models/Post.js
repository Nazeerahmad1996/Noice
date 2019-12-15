
//Post Model
export default class Post {
    constructor(Description, User,Name,Email) {
        this.Email = Email;
        this.User = User;
        this.Name = Name;
        this.Description = Description;
        this.Date = new Date().toDateString();
        this.Node = "null";
        this.LikeCount = 0;
    }
}