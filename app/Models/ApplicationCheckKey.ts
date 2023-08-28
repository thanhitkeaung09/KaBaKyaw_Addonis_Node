import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class ApplicationCheckKey extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public appId: string

  @column()
  public appSecret: string

  @column()
  public obsolete: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
