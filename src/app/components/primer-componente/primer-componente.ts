import { Component, inject, signal } from '@angular/core';
import { Persona } from '../../Interface/persona';
import { form, min, required, FormField } from '@angular/forms/signals';
import { PrimerComponenteService } from '../../services/primer-componente.service';
import Swal from 'sweetalert2';

@Component({
  imports: [FormField],
  selector: 'app-primer-componente',
  styleUrl: './primer-componente.css',
  templateUrl: './primer-componente.html',
})
export class PrimerComponente {
  private personaService = inject(PrimerComponenteService)
  listaPersonas: Persona[] = [];

  personaModelo = signal<Persona>({
    nombre: '',
    edad: 0
  })

  personaFormulario = form(this.personaModelo, (esquema)=>{
  required(esquema.nombre, {message:'El nombre es obligatorio'})
  min(esquema.edad, 10, {message: 'La edad minima es de 10 años'})
  })

  constructor(){
    this.mostrarPersonas()
  }

  guardarPersona(evento: Event){
    evento.preventDefault()
    let persona = {
      'nombre': this.personaModelo().nombre,
      'edad' : this.personaModelo().edad
    }
    this.personaService.guardar(persona)
    Swal.fire({
  title: "Registro guardado!",
  text: "Se guardo exitosamente!",
  icon: "success"
});
    //console.log(persona) //los parentesis significan que queremos el valor
    this.limpiar()
  }
  
  mostrarPersonas(){
    this.listaPersonas = this.personaService.mostrar()
  }

  limpiar(){
    this.personaModelo.set({
      nombre: '', 
      edad: 0
    })
  }
}
