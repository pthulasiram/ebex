import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookListingComponent } from './books/book-listing/book-listing.component';
import { BookDetialsComponent } from './books/book-detials/book-detials.component';
import { DmcaComponent } from './dmca/dmca.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [

  {
    path: 'books', component: BooksComponent
  },
  {
    path: 'books/:id',
    component: BookDetialsComponent
  },
  {
    path: 'dmca',
    component: DmcaComponent
  },
  {
    path: '', 
    redirectTo: 'books', 
    pathMatch: 'full' 
 },





  // {
  //   path: '',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // },
  // {
  //   path: '**',
  //   component: ErrorComponent
  // }



]

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
