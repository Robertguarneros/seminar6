import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgIf, UpperCasePipe} from '@angular/common';
import { Post } from '../models/post';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  imports: [ FormsModule,NgIf, UpperCasePipe, CommonModule,ReactiveFormsModule],
  standalone: true,
})
export class PostDetailsComponent {
  @Input() post?: Post;
  @Input() userId?: string;
  @Output() postUpdated = new EventEmitter<Post>();

  newPostForm: FormGroup;
  editPostForm: FormGroup;
  posts: Post[] = [];
  update: boolean = false;
  showAddPostForm: boolean = false;


  constructor(public postService: PostService, private formBuilder:FormBuilder) {
    this.newPostForm = this.formBuilder.group({
      author: ['',[Validators.required]],
      content: ['',[Validators.required]],
      title: ['',[Validators.required]]
    });
    this.editPostForm = this.formBuilder.group({
      author: [''],
      content: [''],
      title: ['',]
    });
  }

ngOnInit(){
  this.fetchPosts();
}

// Method to fetch posts
fetchPosts() {
  if (this.userId){
    this.postService.getPosts(this.userId).subscribe(posts => {
      this.posts = posts;
      console.log("Posts", this.posts);
      });
    }
  }

  createPost(): void{
    if (this.newPostForm.valid) {
      console.log(this.newPostForm.value)
      this.postService.createPost(this.newPostForm.value).subscribe((res: any) => {
        console.log("Post created", res.post);
        this.posts.push(res.post);
        this.newPostForm.reset();
      });
    } else {
      console.error("El formulario no es válido. No se puede agregar el usuario.");
    }
  } 

  showAddUser(state: boolean) {
    this.showAddPostForm = state;
    console.log("Cambio modo edición/lectura", this.showAddPostForm);
  }

  updatePost(post?: Post): void {
    if (post && post._id) {
      const updatedPost: Post = {
        _id: post._id,
        author: this.editPostForm.value.author || post.author,
        title: this.editPostForm.value.title || post.title,
        content: this.editPostForm.value.content || post.content
      };
      console.log(updatedPost);
      this.postService.updatePost(updatedPost).subscribe((res: any) => {
        console.log("Post updated", res.post);
        this.postUpdated.emit(updatedPost);
        this.toggleUpdateMode();
        // Fetch posts again after updating
        this.fetchPosts();
      });
    } else {
      console.error("El formulario no es válido. No se puede actualizar el post.");
    }
  }
  
  
  toggleUpdateMode(): void {
    this.update = !this.update;
    if (this.update) {
      this.editPostForm.patchValue({
        author: this.post?.author,
        title: this.post?.title,
        content: this.post?.content
      });
    } else {
      this.editPostForm.reset();
    }
  }

}