import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './services/usuario.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';






@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule
  ]
})
export class AppComponent {
  usuarios: Usuario[] = [];
  mostrarFormulario = false;

  // Datos del formulario
  idEditar?: number;
  nombre: string = '';
  correo: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (data) => this.usuarios = data,
      error: (err) => console.error('Error al obtener usuarios:', err)
    });
  }

  toggleFormulario(): void {
    this.limpiarFormulario();
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  guardarUsuario(): void {
    if (!this.nombre || !this.correo) {
      alert('Nombre y correo obligatorios');
      return;
    }

    const usuario: Usuario = { nombre: this.nombre, correo: this.correo };

    if (this.idEditar) {
      // Actualizar
      this.usuarioService.actualizarUsuario(this.idEditar, usuario).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.toggleFormulario();
        },
        error: (err) => alert('Error al actualizar usuario')
      });
    } else {
      // Crear nuevo
      this.usuarioService.crearUsuario(usuario).subscribe({
        next: () => {
          this.obtenerUsuarios();
          this.toggleFormulario();
        },
        error: (err) => alert('Error al crear usuario')
      });
    }
  }

  editarUsuario(usuario: Usuario): void {
    this.idEditar = usuario.id;
    this.nombre = usuario.nombre;
    this.correo = usuario.correo;
    this.mostrarFormulario = true;
  }

  eliminarUsuario(id?: number): void {
    if (!id) return;
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarioService.eliminarUsuario(id).subscribe({
        next: () => this.obtenerUsuarios(),
        error: (err) => alert('Error al eliminar usuario')
      });
    }
  }

  limpiarFormulario(): void {
    this.idEditar = undefined;
    this.nombre = '';
    this.correo = '';
  }
  
}
