import { RedisLevel } from "upstash-redis-level";

export class VercelKVAdapter extends RedisLevel {
  constructor(
    url: string,
    token: string,
    namespace = "tinacms",
    debug = false
  ) {
    super({
      namespace: namespace,
      redis: {
        url,
        token,
      },
      debug: debug,
    });
  }
}
