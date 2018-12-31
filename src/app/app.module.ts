import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DmcaComponent } from './dmca/dmca.component';
import { BooksComponent } from './books/books.component';
import { BookListingComponent } from './books/book-listing/book-listing.component';
import { BookDetialsComponent } from './books/book-detials/book-detials.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { SpinnerComponent } from './spinner/spinner.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ErrorComponent } from './error/error.component';
import { APP_BASE_HREF } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesDetailsComponent } from './categories/categories-details/categories-details.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';
import { AdsenseModule } from 'ng2-adsense';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './home/home.component'
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
    ErrorComponent,
    CategoriesComponent,
    CategoriesDetailsComponent,
    AboutComponent,
    ContactComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ebooksden' }),
    AppRoutingModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-1958898085199553'
    }),
    AngularFireModule.initializeApp(environment.firebase, 'ebooksden'),
    AngularFireDatabaseModule,
    HttpClientModule,
    FormsModule,
    JwSocialButtonsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
