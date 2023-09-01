import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * Create Post
   */
  Route.post('/posts', 'PostsController.create').as('post.create')

  /**
   * Get a post
   */
  Route.get('/posts/:post_id', 'PostsController.single').as('post.single')
})
  .middleware(['check.app.key', 'auth:api'])
  .prefix('v1')
  .namespace('App/Controllers/Http')
