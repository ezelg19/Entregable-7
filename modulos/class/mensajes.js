const knex = require('knex')
const { option } = require('../configKnex/config.js')

class Mensajes {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
    }

    async save(obj) {
        try {
            this.knex.schema.hasTable('mensajes').then(async (exists) => {
                if (exists) { return await this.knex(this.table).insert(obj) }
                else { await this.crearTable() }
            })
        }
        catch (error) { console.log(error) }
    }

    async getAll() {
        try {
            const array = await this.knex.schema.hasTable('mensajes').then(async (exists) => {
                if (exists) { return await this.knex.from(this.table).select('*') }
                else { await this.crearTable() }
            })
            return array
        }
        catch (error) { console.log(error) }
    }
    async crearTable() {
        await this.knex.schema.createTable('mensajes', table => {
            table.date('time')
            table.string('mensaje')
            table.string('email')
        })
            .then(() => console.log('creada'))
            .catch((error) => { console.log(error); throw error })
    }
}

const mensajes = new Mensajes(option.sqlite, 'mensajes')

module.exports = mensajes