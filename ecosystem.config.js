module.exports = {
  apps: [
      {
        name: 'API',
        cwd: './API',
        script: 'npm',
        args: "run start:dev",
        instances: 1,
        max_memory_restart: '1G',
        merge_logs: true,
        autorestart: false,
        exec_mode: 'fork',
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production'
        }
      },
        {
            name: 'AuthService',
            cwd: './AuthService',
            script: 'npm',
            args: "run start:dev",
            instances: 1,
            merge_logs: true,
            autorestart: false,
            exec_mode: 'fork',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'DataService',
            cwd: './DataService',
            script: 'npm',
            args: 'run start:dev',
            instances: 1,
            merge_logs: true,
            autorestart: false,
            exec_mode: 'fork',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'ProjectsService',
            cwd: './ProjectsService',
            script: 'npm',
            args: 'run start:dev',
            instances: 1,
            merge_logs: true,
            autorestart: false,
            exec_mode: 'fork',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'UsersService',
            cwd: './UsersService',
            script: 'npm',
            args: 'run start:dev',
            instances: 1,
            merge_logs: true,
            exec_mode: 'fork',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'PaymentsService',
            cwd: './PaymentsService',
            script: 'npm',
            args: 'run start:dev',
            instances: 1,
            merge_logs: true,
            autorestart: false,
            exec_mode: 'fork',
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'development'
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
      {
          name: 'EmailsService',
          cwd: './EmailsService',
          script: 'npm',
          args: 'run start:dev',
          instances: 1,
          merge_logs: true,
          autorestart: false,
          exec_mode: 'fork',
          max_memory_restart: '1G',
          env: {
              NODE_ENV: 'development'
          },
          env_production: {
              NODE_ENV: 'production'
          }
      },
    {
      name: 'SocketsService',
      cwd: './SocketsService',
      script: 'npm',
      args: 'run start:dev',
      instances: 1,
      merge_logs: true,
      autorestart: false,
      exec_mode: 'fork',
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
  ]
};