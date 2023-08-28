import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AppCheckKeyFactory from 'Database/factories/AppCheckKeyFactory'

export default class extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await AppCheckKeyFactory.createMany(3)
  }
}
