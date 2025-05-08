import { RedisLevel } from "upstash-redis-level";
import Redis from "ioredis";
import { ZRangeCommandOptions, ScoreMember } from "@upstash/redis";

const encode = (value: any) => {
  return encodeURIComponent(value);
};

export class RedisKVAdapter extends RedisLevel {
  constructor(uri: string, namespace = "tinacms", debug = false) {
    // TODO: ioredis is not ideal for vercel(serverless), but works for now
    const client = new Redis(uri);
    super({
      namespace: namespace,
      redis: client as any,
      debug: debug,
    });
    // Fit for upstash/redis
    client.zrange = (async (
      key: string,
      min: `(${string}` | `[${string}` | "-" | "+",
      max: `(${string}` | `[${string}` | "-" | "+",
      opts: {
        byLex: true;
      } & ZRangeCommandOptions
    ) => {
      // console.log("zrange", key, min, max, opts);
      const fcName = opts.rev ? "zrevrangebylex" : "zrangebylex";
      const args = opts.rev ? [key, max, min] : [key, min, max];
      if (opts.count !== undefined && opts.offset !== undefined) {
        return await client[fcName].bind(client)(
          args[0],
          args[1],
          args[2],
          "LIMIT",
          opts.offset,
          opts.count
        );
      }
      return await client[fcName].bind(client)(args[0], args[1], args[2]);
    }) as any;

    const _zadd = client.zadd.bind(this.redis);
    client.zadd = (async (key: string, scoreMember: ScoreMember<string>) => {
      return await _zadd(key, scoreMember.score, scoreMember.member);
    }) as any;
  }

  async _batch(
    batch: any[],
    options: any,
    callback: (error?: Error) => void
  ): Promise<void> {
    if (batch.length === 0) return this.nextTick(callback);
    const p = this.redis.pipeline();
    for (const op of batch) {
      if (op.type === "put") {
        p.hset<string>(this.hKey, { [encode(op.key)]: encode(op.value) });
        (p as any).zadd(this.zKey, 0, encode(op.key));
      } else if (op.type === "del") {
        p.hdel(this.hKey, encode(op.key));
        p.zrem(this.zKey, encode(op.key));
      }
    }
    await p.exec();
    this.nextTick(callback);
  }
}
