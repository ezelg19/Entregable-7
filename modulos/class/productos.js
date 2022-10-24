const knex = require('knex')
const { option } = require('../configKnex/config.js')

class Productos {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
    }

    async save(obj) {
        await this.crearTable(0)
        try {
            return await this.knex(this.table).insert(obj)
        } catch (error) {
            console.log(error)
        }
    }
    async actualizar(obj) {
        await this.crearTable(4)
        try {
            return await this.knex.from(this.table).where('id', '=', obj.id).update(obj)
        } catch (error) {
            console.log('error?', error)
        }
    }
    async getById(id) {
        await this.crearTable(2)
        try {
            return await this.knex.from(this.table).select('*').where('id', '=', parseInt(id))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        await this.crearTable(1)
        try {
            return await this.knex.from(this.table).select('*')
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(id) {
        await this.crearTable(3)
        try {
            return await this.knex.from(this.table).where('id', '=', parseInt(id)).del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteAll() {
        try {
            return await this.knex.from(this.table).select('*').del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }
    async crearTable(num) {
        await this.knex.schema.hasTable('productos').then(async (exists) => {
            if (!exists) {
                const array = [this.save,this.getAll, this.getById,this.deleteById,this.actualizar]
                if (num <= 1){ console.log('La BD se esta creando'); array[num]}
                else{console.log('la BD esta vacia, no se pueden realizar la accion pedida')}
                await this.knex.schema.createTable('productos', table => {
                    table.increments('id')
                    table.string('title')
                    table.integer('price')
                    table.string('thumbnail')
                })
                    .then(() => console.log('BD creada'))
                    .catch((error) => { console.log(error); throw error })
            }
        })
    }
}
const productos = new Productos(option.mysql, 'productos')

module.exports = productos