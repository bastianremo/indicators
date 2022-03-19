export class Indicator {
    codigo: string;
    fecha: string;
    nombre: string;
    unidad_medida: string;
    valor: number;

    constructor(data?: any) {
        this.codigo = data?.codigo || null;
        this.fecha = data?.fecha || null;
        this.nombre = data?.nombre || null;
        this.unidad_medida = data?.unidad_medida || null;
        this.valor = data?.valor || 0;
    }
}