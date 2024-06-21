import Redis from "ioredis"

const redis = new Redis({
  host: "47.116.192.204",
  port: 6379,
  db: 0,
  password: "huangxi",
})

export async function getAllNotes() {
  const data = await redis.hgetall("notes")
  return data
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
