module.exports = {
    apps : [{
      name      : 'PetAgenda',
      script    : 'app.js',
      node_args : '-r dotenv-flow/config',
      env:{
        NODE_ENV: ''
      }
    }]
  }