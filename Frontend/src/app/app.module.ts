import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PranayamaModule } from './pranayama/pranayama.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { PranayamaService } from './pranayama/pranayama.service';
import { CommentComponent } from './comment/comment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MeditationModule } from './meditation/meditation.module';
import { CalendrierModule } from './calendrier/calendrier.module';
import { StatisticsModule } from './statistics/statistics.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { LoginModule } from './login/login.module';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { MatFormFieldModule } from '@angular/material';
import { ResponseResetPasswordComponent } from './response-reset-password/response-reset-password.component';
import { CalendrierService } from './services/calendrier.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CommentComponent,
    FooterComponent,
    HeaderComponent,
    RequestResetPasswordComponent,
    ResponseResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    PranayamaModule,
    MeditationModule,
    CalendrierModule,
    StatisticsModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    SignUpModule,
    LoginModule,
    ReactiveFormsModule,
    MatFormFieldModule
  ],
  entryComponents: [CommentComponent],
  providers: [PranayamaService, CalendrierService,  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
