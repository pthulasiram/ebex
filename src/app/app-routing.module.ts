import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { BookListingComponent } from './books/book-listing/book-listing.component';
import { BookDetialsComponent } from './books/book-detials/book-detials.component';
import { DmcaComponent } from './dmca/dmca.component';
import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
const routes: Routes = [

  {
    path: '', component: HomeComponent,
  },
  {
    path: 'books', component: BooksComponent,
  },
  {
    path: 'books/:id',
    component: BookDetialsComponent,
    
    // resolve: {
    //   books: BooksResolveService
    // }
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'dmca',
    component: DmcaComponent
  },
  {
    path: 'topics',
    component: CategoriesComponent
  },
  {
    path: 'topics/:id',
    component: CategoriesDetailsComponent
  },
  // {
  //   path: '',
  //   redirectTo: 'books',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    component: ErrorComponent
  }
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
  providers: [
  ]
})
export class AppRoutingModule { }
