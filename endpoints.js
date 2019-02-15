exports.endPoints = {
  app: {
    routes: {
      '/api': {
        'GET /api': {
          description: 'servers a JSON object displaying all endpoints',
        },
        'api/topics': {
          'GET /api/fetchTopic': {
            description: 'Endpoint to obtain all Topics',
            'POST /api/postTopic': 'Endpoint to post a single Topic',
          },
          'api/articles': {
            'GET /api/articles/:article_id': 'Endpoint to receive an Article by its Article ID',
            'PATCH /api/articles/:article_id': 'Endpoint to update content in an Article using Article ID',
            'DELETE /api/articles/:article_id': 'Endpoint to delete an Article using Article ID',
            'GET /api/articles/:article_id/comments': 'Endpoint to display comments of an Article using Article ID',
            'POST /api/articles/:article_id/comments': 'Endpoint to post Comment in an Article using Article ID',
          },
          'api/comments': {
            'PATCH /api/comments/:comment_id': 'Endpoint to update content in Comments using its Comment ID',
            'DELETE /api/comments/:comment_id': 'Endpoint to delete a Comment using its Comment ID',
          },
          'api/users': {
            'GET /api/users': 'Endpoint to obtain all Users',
            'POST /api/users': 'Endpoint to post a Single User',
            'GET /api/users/:username': 'Endpoint to receive a User using their Username',
          },
        },
      },
    },
  },
};
