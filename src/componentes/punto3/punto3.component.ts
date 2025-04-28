import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css'],
  imports: [CommonModule],
})
export class Punto3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  // Palabras disponibles
  palabras: string[] = [
    'Hola', 'Mundo', 'Angular', 'Componentes', 'Servicios', 'Inyección de Dependencias', 'Observables', 'Rutas', 'Módulos',      
  ];

  // Letras disponibles
  letras: string[] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o',
    'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
  ];

  // Variables del juego
  letraGuardardadas: string[] = [];
  palabraAleatoria: string = ''; // Palabra aleatoria seleccionada
  categoriaSeleccionadaActual: string = ''; // Categoría seleccionada
  guiones: string[] = [];
  vidasRestantes: number = 5; // 5 vidas por defecto
  juegoGanado: boolean = false; // Variable para controlar si el jugador ha ganado

  categorias: string[] = [
    'Frutas', 'Verduras', 'Carnes', 'Bebidas', 'Snacks',
  ];

  categoriasGuardardas: { [categoria: string]: string[] } = {
    Frutas: ['Manzana', 'Banana', 'Naranja'],
    Verduras: ['Lechuga', 'Tomate', 'Zanahoria'],
    Carnes: ['Pollo', 'Res', 'Cerdo'],
    Bebidas: ['Agua', 'Jugo', 'Refresco'],
    Snacks: ['Papitas', 'Galletas', 'Chocolates'],
  };

  // Método para guardar las letras seleccionadas
  letraSeleccionada(letra: string): void {
    // Verificar si la letra ya fue seleccionada
    if (this.letraGuardardadas.includes(letra)) {
      console.log('Letra ya seleccionada');
      return; // Si ya se seleccionó, no hacer nada
    }

    this.letraGuardardadas.push(letra);
    console.log(this.letraGuardardadas);

    // Verificar si la letra está en la palabra
    if (this.palabraAleatoria.toLowerCase().includes(letra.toLowerCase())) {
      console.log(`La letra ${letra} está en la palabra.`);
      this.actualizarGuiones(letra);
    } else {
      console.log(`La letra ${letra} no está en la palabra.`);
      this.perderVida();
    }

    // Comprobar si el jugador ha ganado
    if (!this.guiones.includes('_')) {
      this.juegoGanado = true;
      console.log('¡Ganaste!');
    }
  }

  // Método para seleccionar la categoría y almacenar la categoría seleccionada
  categoriaSeleccionada(categoria: string): void {
    this.categoriaSeleccionadaActual = categoria;
    console.log(`Categoría seleccionada: ${categoria}`);
    this.palabraAleatoriaSeleccionada();
  }

  // Método para seleccionar una palabra aleatoria de la categoría seleccionada
  palabraAleatoriaSeleccionada(): void {
    if (this.categoriaSeleccionadaActual) {
      const palabras = this.categoriasGuardardas[this.categoriaSeleccionadaActual];

      if (palabras) {
        const palabraAleatoria = palabras[Math.floor(Math.random() * palabras.length)];
        this.palabraAleatoria = palabraAleatoria;
        console.log(`Palabra aleatoria de la categoría "${this.categoriaSeleccionadaActual}": ${palabraAleatoria}`);
        this.mostrarGuionesDePalabra(); // Llamar al método para generar los guiones
      } else {
        console.log('No hay palabras en esta categoría');
      }
    } else {
      console.log('Primero selecciona una categoría');
    }
  }

  // Método para generar los guiones bajo cada letra de la palabra seleccionada
  mostrarGuionesDePalabra(): void {
    this.guiones = [];
    for (let i = 0; i < this.palabraAleatoria.length; i++) {
      this.guiones.push('_'); // Añadir un guion por cada letra
    }
  }

  // Método para actualizar los guiones con las letras adivinadas
  actualizarGuiones(letra: string): void {
    for (let i = 0; i < this.palabraAleatoria.length; i++) {
      if (this.palabraAleatoria[i].toLowerCase() === letra.toLowerCase()) {
        this.guiones[i] = letra; // Actualizar el guion con la letra correcta
      }
    }
  }

  // Método para perder una vida
  perderVida(): void {
    this.vidasRestantes--;
    console.log(`Te quedan ${this.vidasRestantes} vidas`);

    if (this.vidasRestantes === 0) {
      console.log('¡Perdiste el juego!');
      // Puedes agregar una lógica para finalizar el juego, reiniciar, etc.
    }
  }
    // Método para reiniciar el juego
    reiniciarJuego(): void {
      this.letraGuardardadas = [];
      this.palabraAleatoria = '';
      this.categoriaSeleccionadaActual = '';
      this.guiones = [];
      this.vidasRestantes = 5;
      this.juegoGanado = false;
      console.log('Juego reiniciado');
    }
    imagenesAhorcado: string[] = [
      'img/original ahorcado.PNG', // Imagen inicial

      'img/4 ahorcado.PNG', // Imagen inicial
      'img/3 ahorcado.PNG', // Después de 1 vida perdida
      'img/2 ahorcado.PNG', // Después de 2 vidas perdidas
      'img/1 ahorcado.PNG', // Después de 3 vidas perdidas
      'img/0 ahorcado.PNG', // Después de 4 vidas perdidas
    ];
  
    // Función para obtener la imagen correspondiente
    getImage() {
      return this.imagenesAhorcado[5 - this.vidasRestantes]; // Muestra la imagen correspondiente a las vidas restantes
    }
}
