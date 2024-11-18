import { validarEvento } from "./validaciones/eventos.js"
import ModelMongoDBEventos from "../model/DAOs/eventosMongoDB.js";
import PDFDocument from 'pdfkit';

class ServicioEventos {
    constructor() {
        this.model = new ModelMongoDBEventos();
    }

    obtenerEventos = async id => {
        if (id) {
            const evento = await this.model.obtenerEvento(id)
            return evento
        }
        else {
            const eventos = await this.model.obtenerEventos()
            return eventos
        }
    }

    guardarEvento = async evento => {
        const rta = validarEvento(evento)
        if (rta.result) {
            const eventoGuardado = await this.model.guardarEvento(evento)
            return eventoGuardado
        }
        else {
            throw rta.error
        }
    }

    actualizarEvento = async (id, evento) => {
        const rta = validarEvento(evento)
        if (rta.result) {
            const eventoActualizado = await this.model.actualizarEvento(id, evento)
            return eventoActualizado
        }
        else {
            throw rta.error
        }
    }

    borrarEvento = async id => {
        const eventoEliminado = await this.model.borrarEvento(id)
        return eventoEliminado
    }

    generarReporteEventos = async () => {
        const eventos = await this.model.obtenerEventos();

        if (!eventos || eventos.length === 0) {
            throw new Error('No hay eventos disponibles para generar el reporte.');
        }

        const doc = new PDFDocument();

        doc.fontSize(20).text('Reporte de Eventos', { align: 'center' });
        doc.moveDown();

        eventos.forEach((evento, index) => {
            doc.fontSize(12).text(`Evento #${index + 1}`);
            doc.text(`Nombre: ${evento.nombre}`);
            doc.text(`Lugar: ${evento.lugar}`);
            doc.text(`Equipamiento: ${evento.equipamiento || 'N/A'}`);
            doc.text(`Fecha: ${new Date(evento.fecha).toLocaleDateString('es-ES')}`);
            doc.text(`Cantidad de personas: ${evento.cantidad_personas}`);
            doc.moveDown();
        });

        return doc;
    };

}

export default ServicioEventos