import Env from '@ioc:Adonis/Core/Env'
import Route from '@ioc:Adonis/Core/Route'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column({
    consume: (image: string) =>
      Route.makeUrl('imageShow', [image], {
        prefixUrl: `http://${Env.get('HOST')}:${Env.get('PORT')}`,
      }),
  })
  @column()
  public image: string

  @column()
  public category: string

  @column()
  public description: string

  @column()
  public userId: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
