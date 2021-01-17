import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { CopiaService } from "./copia.service";
import { SqliteDbCopy } from "@ionic-native/sqlite-db-copy/ngx";
import { DatosService } from "./datos.service";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SqliteDbCopy,
    CopiaService,
    // DatosService,
    SQLite,
    // SQLiteObject,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
