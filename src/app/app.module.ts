import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

//
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoadingComponent } from './components/loading/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { TableModule } from 'primeng/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    MessagesModule,
    ProgressSpinnerModule,
    DialogModule,
    FileUploadModule,
    TableModule,
    ReactiveFormsModule,
    ConfirmDialogModule
  ],
  providers: [MessageService,ConfirmationService,provideHttpClient(withInterceptors([authInterceptor,loadingInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
