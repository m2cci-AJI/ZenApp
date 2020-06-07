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
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    PranayamaModule,
    NgbModule,
    FormsModule
  ],
  providers: [PranayamaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
