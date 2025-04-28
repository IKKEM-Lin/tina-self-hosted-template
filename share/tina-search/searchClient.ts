export type SearchClient = {
  query: (
    query: string,
    options?: {
      cursor?: string
      limit?: number
    }
  ) => Promise<{
    results: any[]
    total: number
    nextCursor: string | null
    prevCursor: string | null
  }>
  put: (docs: any[]) => Promise<any>
  del: (ids: string[]) => Promise<any>
  onStartIndexing?: () => Promise<void>
  onFinishIndexing?: () => Promise<void>
  supportsClientSideIndexing?: () => boolean
}

export class CustomSearchClient implements SearchClient {
  constructor() {}
  async query(
    query: string,
    options?: {
      limit?: number;
      cursor?: string;
    }
  ): Promise<{
    results: any[];
    nextCursor: string | null;
    total: number;
    prevCursor: string | null;
  }> {
    const matches = query.match(/(\S*)\s*AND\s*_collection:(\S*)/);
    const keyword = matches ? matches[1] : "";
    const collection = matches ? matches[2] : "";
    const res = await fetch(
      `/api/tina-search?path=${collection}&kw=${keyword}`
    );
    const results = await res.json();
    return {results, total: results.length, nextCursor: null, prevCursor: null};
  }

  del(ids: string[]): Promise<any> {
    return Promise.resolve(undefined);
  }

  put(docs: any[]): Promise<any> {
    return Promise.resolve(undefined);
  }

  supportsClientSideIndexing(): boolean {
    // chokidar will keep index updated
    return false;
  }
}
