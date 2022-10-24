const knex = require('knex')
const { option } = require('../configKnex/config.js')

class Productos {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
    }

    async save(obj) {
        await this.crearTable()
        try {
            return await this.knex(this.table).insert(obj)
        } catch (error) {
            console.log(error)
        }
    }
    async actualizar(obj) {
        await this.crearTable()
        try {
            return await this.knex.from(this.table).where('id', '=', obj.id).update(obj)
        } catch (error) {
            console.log('error?', error)
        }
    }
    async getById(id) {
        await this.crearTable()
        try {
            return await this.knex.from(this.table).select('*').where('id', '=', parseInt(id))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        await this.crearTable()
        try {
            return await this.knex.from(this.table).select('*')
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(id) {
        await this.crearTable()
        try {
            return await this.knex.from(this.table).where('id', '=', parseInt(id)).del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteAll() {
        await this.crearTable()
        try {
            return await this.knex.from(this.table).select('*').del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }
    async crearTable() {
        await this.knex.schema.hasTable('productos').then(async (exists) => {
            if (!exists) {
                await this.knex.schema.createTable('productos', table => {
                    table.increments('id')
                    table.string('title')
                    table.iteger('price')
                    table.string('thumbnail')
                })
                    .then(() => console.log('tabla creada'))
                    .catch((error) => { console.log(error); throw error })
            }
        })
    }
}
const productos = new Productos(option.mysql, 'productos')

module.exports = productos