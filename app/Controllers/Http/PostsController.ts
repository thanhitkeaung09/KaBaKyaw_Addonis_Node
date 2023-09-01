import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import ApiErrorResponse from 'App/Responses/ApiErrorResponse'
import ApiSuccessResponse from 'App/Responses/ApiSuccessResponse'
import { v4 as uuidv4 } from 'uuid'

export default class PostsController {
  public async create({ request, response, bouncer, auth }: HttpContextContract) {
    const user = auth.user
    if (await bouncer.allows('admin')) {
      const image = request.file('image')
      const name = `${uuidv4()}.${image?.extname}`
      const path = `GaBaKyaw/a/`
      const image_path = `${path}${name}`
      await image?.moveToDisk(path, { name: name }, 's3')
      const post = new Post()
      await post
        .fill({
          title: request.input('title'),
          image: image_path,
          category: request.input('category'),
          description: request.input('description'),
          userId: auth.user.id,
        })
        .save()
      return new ApiSuccessResponse().toResponse(response, 'Post is successfully uploaded')
    }
    return new ApiErrorResponse().toResponse(response, 'User can not create posts')
  }

  public async single({ request, response, bouncer }: HttpContextContract) {
    if (await bouncer.allows('user')) {
      const id = request.params().post_id
      const post = await Post.find(id)
      if (post) {
        return new ApiSuccessResponse().toResponse(response, post)
      } else {
        return new ApiErrorResponse().toResponse(response, 'Not Found')
      }
    }
    return new ApiErrorResponse().toResponse(response, 'Admin can not view')
  }
}
