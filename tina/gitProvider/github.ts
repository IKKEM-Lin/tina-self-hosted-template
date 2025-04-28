import {
  GitHubProvider as TinaGithubProvider,
  GitHubProviderOptions as TinaGitHubProviderOptions,
} from "tinacms-gitprovider-github";
import type { GitProvider } from "@tinacms/datalayer";

interface GitLabProviderOptions {
  commitAuth: Pick<TinaGitHubProviderOptions, "owner" | "repo" | "token">;
  commitMessage: string;
  commitBranch: string;
  callback?: (key: string) => void;
}

export class GitHubProvider implements GitProvider {
  private owner: string;
  private repo: string;
  private token: string;
  private branch: string;
  message: string;
  private provider?: TinaGithubProvider;
  private callback?: (key: string) => void;

  constructor(args: GitLabProviderOptions) {
    this.owner = args.commitAuth.owner;
    this.repo = args.commitAuth.repo;
    this.token = args.commitAuth.token;

    this.branch = args.commitBranch;
    this.message = args.commitMessage;
    this.provider = new TinaGithubProvider({
      owner: this.owner,
      repo: this.repo,
      token: this.token,
      branch: this.branch,
      commitMessage: this.message,
    });
    this.callback = args.callback;
  }
  async onPut(key: string, value: any) {
    await this.provider?.onPut(key, value);
    if (this.callback) {
      this.callback(key);
    }
  }
  async onDelete(key: string) {
    await this.provider?.onDelete(key);
    if (this.callback) {
      this.callback(key);
    }
  }
}
