import Appointment from '../models/Appointment'
import { isEqual } from 'date-fns'

// DTO -> Data Transfer Object
interface CreateAppointmetDTO {
    provider: string
    date: Date
}

class AppointmentsRepository {
    private appointments: Appointment[]

    constructor(){
        this.appointments = []
    }

    //desestruturar
    public create({provider, date}: CreateAppointmetDTO): Appointment {
        const appointment = new Appointment({ provider, date })

        this.appointments.push(appointment)

        return appointment
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => 
            isEqual(date, appointment.date)
        )

        return findAppointment || null
    }

    public all(): Appointment[] {
        return this.appointments
    }
}

export default AppointmentsRepository;