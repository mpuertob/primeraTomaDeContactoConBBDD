import { SqliteDbCopy } from "@ionic-native/sqlite-db-copy/ngx";
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class CopiaService {
  constructor(private sqlDbCopy: SqliteDbCopy, private platform: Platform) {}
  async copiarBBDD() {
    await this.platform
      .ready()
      .then(async () => {
        console.log("Empezando, la plataforma está lista");
        console.log("Vamos a proceder a copiar la bbdd");
        await this.sqlDbCopy
          .copy("Horario16.db", 0)
          .then(() => {
            console.log("Copiado correctamente");
          })
          .catch((error) => {
            console.log("Fallo al copiar la bbdd por: " + error);
            console.log("error con stringify" + JSON.stringify(error));
          });
      })
      .catch((error) => {
        console.log("La plataforma no está lista para copiar la bbdd");
        console.log("POR: " + error);
      });
  }
  async copiarBBDDJose() {
    if (await this.platform.ready()) {
      console.log("copia la plataforma está lista");
      await this.sqlDbCopy
        .copy("Horario16e.db", 0)
        .then(() => {
          console.log("copia copiada correctamente");
        })
        .catch((error) => {
          console.log("copia fallo al copiar");
          console.log("copia" + JSON.stringify(error));
        });
      console.log("copia, terminando");
    } else {
      console.log("copia plataforma no preparada");
    }
    console.log("copia, comenzando");
  }
}
