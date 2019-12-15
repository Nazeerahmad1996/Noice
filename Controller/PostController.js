import Post from '../Models/Post'
import { observable, action } from 'mobx'

class PostController {
    @observable 
    data = [];

    @action
    setListPost(data){
        if(data != null){
            this.data = data;
        }
    }
}
export default new PostController();