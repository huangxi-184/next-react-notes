import Redis from "ioredis"

const redis = new Redis({
  host: "47.116.192.204",
  port: 6379,
  db: 0,
})

const initialData = {
  "1702459181837":
    '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837":
    '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}',
}

export async function getAllNotes() {
  const data = await redis.hgetall("notes")
  if (Object.keys(data).length == 0) {
    await redis.hset("notes", initialData)
  }
  return await redis.hgetall("notes")
}

export async function addNote(data: string) {
  const uuid = Date.now().toString()
  await redis.hset("notes", uuid, data)
  return uuid
}

export async function updateNote(uuid: string, data: string) {
  await redis.hset("notes", uuid, data)
}

export async function getNote(uuid: string) {
  const res = await redis.hget("notes", uuid)
  if (res) {
    return JSON.parse(res)
  }
  return ""
}

export async function delNote(uuid: string) {
  return redis.hdel("notes", uuid)
}

export default redis
