// Solo contiene la definición de cómo luce un usuario
export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  fechaRegistro?: string;
}
