import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { HttpClientModule } from '@angular/common/http';
import { ServicesModule } from './services/services.module';
import { LoginUserComponent } from './login-user/login-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UsersListComponent } from './user-list/user-list.component';
import { CreateTourComponent } from './create-tour/create-tour.component';
import { TourInformationComponent } from './tour-information/tour-information.component';
import { TourEditorComponent } from './tour-editor/tour-editor.component';
import { TourSearchComponent } from './tour-search/tour-search.component';
import { TourListComponent } from './tour-list/tour-list.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    LoginUserComponent,
    UsersListComponent,
    UserInfoComponent,
    UserProfileComponent,
    CreateTourComponent,
    TourInformationComponent,
    TourEditorComponent,
    TourSearchComponent,
    TourListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
