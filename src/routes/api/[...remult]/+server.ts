import { remultSveltekit } from 'remult/remult-sveltekit'
import { Task } from '../../../shared/task'
import { TasksController } from '../../../shared/tasksController'
import { InMemoryDataProvider, type UserInfo } from 'remult'
import { generateMigrations } from 'remult/migrations'

export const _api = remultSveltekit({
  entities: [Task],
  controllers: [TasksController],
  getUser: async (event) => {
    const auth = await event?.locals?.auth()
    return auth?.user as UserInfo
  },
  initApi: async () => {
    await generateMigrations({
      entities: [Task],
      dataProvider: new InMemoryDataProvider(),
      migrationsFolder: 'src/migrations',
    })
  },
})

export const { GET, POST, PUT, DELETE } = _api
