import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from "@ionic-native/sqlite/ngx";
import { Platform } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class DatosService {
  private db: SQLiteObject;
  private horasList: any[] = [];
  /*
  -Este servicio supone que ya se ha copiado la bbdd 
  -Platform  nos dice si la plataforma (MovilAndroid, paginasWeb,etc) a usar está lista, entre otras cosas
  -Un objeto SQLite se encarga de gestionar  la bbdd
  -Un objeto SQLiteObject es el objeto de la bbdd, ya es la propia bbdd
  */
  constructor(private platform: Platform, private sqlite: SQLite) {}
  async executeSentence(
    target: any[],
    sqlSentence: string,
    searchParam: any[]
  ) {
    let consultable = true;
    if (!this.db) {
      await this.openDB()
        .then(() => {
          console.log("Ya la hemos abierto");
          console.log(this.db);
        })
        .catch(() => {
          consultable = false;
          console.log("A ocurrido algun problema");
        });
    }
    if (consultable) {
      //procedemos a enviar la consulta
      this.db
        .executeSql(sqlSentence, searchParam)
        .then((data) => {
          //data seria lo que nos ha devuelto la consulta, es como una matriz,en cada posicion tiene una tupla
          for (let i = 0; i < data.rows.length; i++) {
            let obj = data.rows.item(i);
            console.log(obj);
            target.push(obj);
          }
        })
        .catch((e) => {
          console.log("Fallo al ejecutar la sentencia por: " + e);
          console.log(JSON.stringify(e));
        });
    }
  }

  async getHoras() {
    const sql = "Select descripcion as nombre from horasSemana";
    await this.executeSentence(this.horasList, sql, []);
  }
  async getHorasWithId() {
    const sql =
      "Select idHorasSemana as id, descripcion as nombre from horasSemana";
    await this.executeSentence(this.horasList, sql, []);
  }
  async openDB() {
    await this.platform
      .ready()
      .then(async () => {
        console.log("La Plataforma SI esta lista");
        //si la plataforma esta preparada voy a abrir la bbdd ya copiada
        await this.sqlite
          //si la bbdd no existe la crea y la abre y si existe la abre
          .create(this.getConector())
          .then((db: SQLiteObject) => {
            this.db = db;
            console.log(db);
            //aqui tenemos ya la bbdd
          })
          .catch((error) => {
            console.log(
              "Error al intentar crear la bbdd o retornar la que teniamos"
            );
            console.log("Motivo por: " + error);
          });
      })
      .catch(() => {
        console.log("La Plataforma NO esta lista");
      });
  }

  private getConector() {
    return {
      name: "Horario16.db",
      location: "default",
      createFromLocation: 1,
    };
  }
  getHorasList() {
    return this.horasList;
  }
}
