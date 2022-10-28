class Prenda {
  constructor(precioBase: number, tipo: string, estado: IEstado) {
    this.precioBase = precioBase;
    this.tipo = tipo;
    this.estado = estado;
  }
  
  precioFinal() {
    this.estado.precioFinal(this.precioBase);
  }
}

interface IEstado {
  precioFinal(precioBase: number) : number;
}

class Nueva implements IEstado {
  precioFinal(precioBase: number) {
    return precioBase;
  }
}

class Promocion implements IEstado {
  
  constructor(valorFijo: number) {
    this.valorFijo = valorFijo;
  }
  
  precioFinal(precioBase: number) {
    return precioBase - this.valorFijo;
  }
}

class Liquidacion implements IEstado {
  precioFinal(precioBase: number) {
    return precioBase / 2;
  }
}

let subtotal = 0;
class Venta {
  constructor(fecha: string, prendas: Array, tipoPago: ITipoPago) {
    this.fecha = fecha;
    this.prendas = prendas;
    this.tipoPago = tipoPago;
  }
  
  montoTotal() {
    this.prendas.forEach(prenda => {
      subtotal += prenda.nombre.precioFinal() * prenda.cantidad;
    })
    return this.tipoPago.recargo(subtotal);
  }
}

interface ITipoPago {
  recargo(subtotal: number) : number;
}

class Efectivo implements ITipoPago {
  recargo(subtotal: number) {
   return subtotal;
  }
}

class Tarjeta implements ITipoPago {
  
  constructor(cantidadDeCuotas: number, coeficienteFijo: number) {
    this.coeficienteFijo = coeficienteFijo;
    this.cantidadDeCuotas = cantidadDeCuotas;
  }
  
  recargo(subtotal: number) {
    return subtotal + (this.coeficienteFijo * this.cantidadDeCuotas);
  }
}

const estadoCamisaFloreada = new Nueva();
const estadoJean = new Promocion(1200);
const estadoSacoSlim = new Liquidacion();
const pagoDePrueba = new Efectivo();

const camisaFloreada = new Prenda(4350, "Camisa", estadoCamisaFloreada);
const jean = new Prenda(9000, "Pantalon", estadoJean);
const sacoSlim = new Prenda(11500, "Saco", estadoSacoSlim);
const ventaPrueba = new Venta("25-10-2022", [{nombre: camisaFloreada, cantidad: 1}, {nombre: jean, cantidad: 1}, {nombre: sacoSlim, cantidad: 2}], pagoDePrueba);

//Se desea saber el precio de venta de una prenda.
camisaFloreada.precioFinal();
jean.precioFinal();
sacoSlim.precioFinal();

//Se desea saber el tipo de una prenda.
camisaFloreada.tipo;
jean.tipo;
sacoSlim.tipo;

ventaPrueba.montoTotal();