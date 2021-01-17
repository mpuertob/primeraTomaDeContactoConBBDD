import { Component } from "@angular/core";
import { CopiaService } from "../copia.service";
import { DatosService } from "../datos.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  horasList: any[] = [];
  constructor(
    private copiaService: CopiaService,
    private datosService: DatosService
  ) {}
  async copiar() {
    await this.copiaService
      .copiarBBDD()
      .then(() => {
        //pasa cuando ya se ha ejecutado la promise
        //Es lo mismo que hace async/await
        alert("BBDD Copiada");
      })
      .catch((err) => {
        alert("BBDD NO copiada");
        console.log(err);
      });
  }
  async abrir() {
    await this.datosService.openDB();
    alert("BBDD Abierta");
  }
  async getHoras() {
    await this.datosService.getHorasWithId();
    this.getHorasList();
  }
  private getHorasList() {
    this.horasList = this.datosService.getHorasList();
    console.log("COPIADO");
    console.log(this.horasList);
  }
}
