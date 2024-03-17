import { Component, Input, Output, EventEmitter } from '@angular/core';
import {CommonModule, NgIf, UpperCasePipe} from '@angular/common';
import { Post } from '../models/post';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css'],
  imports: [ NgIf, UpperCasePipe, CommonModule],
  standalone: true,
})
export class PostDetailsComponent {
  @Input() post?: Post;
  @Output() goBack = new EventEmitter<void>();
}