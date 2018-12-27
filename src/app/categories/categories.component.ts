import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  topics: string[] = ['Technology',
    'Biology',
    'Business',
    'Chemistry',
    'Computers',
    'Economy',
    'Education',
    'Mathematics',
    'Medicine',
    'Physics',
  ];
  cards: string[] = [
    'bg-primary', 'bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-secondary', 'bg-dark', 'bg-light'
  ]
  tempIndex:number = this.cards.length-1;
  constructor() { }

  ngOnInit() {
    

  }

  updateClass( index:number):string {
    if(index > this.cards.length && this.tempIndex > 0){
      index =this.tempIndex;
    } 
    if(this.tempIndex < 0){
      this.tempIndex = this.cards.length-1;
    }
    let x:string  =  'col-12 col-md-6 px-25 card text-white '
    +(this.cards[index]=='undefined'?'bg-secondary':this.cards[index]);
    console.log(x)
    this.tempIndex = this.tempIndex-1;
    return x;
  }
}
