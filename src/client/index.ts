import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../server";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000'
    })
  ]
})

async function main() {
  const users = await trpc.getUserList.query()
  console.log('List of All Users: ', users)

  const getUserById = await trpc.getUserById.query('2')
  console.log("Find User: ", getUserById)

  const createUser = await trpc.createUser.mutate({
    email: 'abc@zyc.com',
    password: 'abc#$443243',
    username: 'abc'
  })
  console.log('Created User: ', createUser)

  const updatedUser = await trpc.updateUser.mutate({
    id: '2',
    email: 'qwe@fvc.com',
    password: '7907325872934549'
  })
  console.log(updatedUser)

  const removeUser = await trpc.removeUser.query('3')
  console.log("Removed User: ", removeUser)
}

main()