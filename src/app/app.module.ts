import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DmcaComponent } from './dmca/dmca.component';
import { BooksComponent } from './books/books.component';
import { BookListingComponent } from './books/book-listing/book-listing.component';
import { BookDetialsComponent } from './books/book-detials/book-detials.component';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorComponent } from './error/error.component';
import {APP_BASE_HREF} from '@angular/common';
@NgModule({
  
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DmcaComponent,
    BooksComponent,
    BookListingComponent,
    BookDetialsComponent,
    SpinnerComponent,
    SidebarComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'ebooksden'),
    AngularFireDatabaseModule,
    ReactiveFormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
