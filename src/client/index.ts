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

  const createUser = await trpc.createUser.mutate({
    email: 'abc@gmail.com',
    password: 'abc#$443243',
    username: 'abc'
  })
  console.log('Created User: ', createUser)

  const getUser = await trpc.getUserById.query('2')
  console.log("Find User: ", getUser)

  const removeUser = await trpc.removeUser.query('1')
  console.log("Removed User: ", removeUser)
}

main()