import { Gitlab } from "@gitbeaker/rest";
import { Base64 } from "js-base64";
import type { GitProvider } from "@tinacms/datalayer";

interface GitLabProviderOptions {
  commitAuth: {
    host: string;
    projectId: string;
    token: string;
  };
  commitMessage: string;
  commitBranch: string;
  callback?: (key: string) => void;
}

export class GitLabProvider implements GitProvider {
  private projectId: string;
  private branch: string;
  message: string;
  private gitbeaker?: any;
  private callback?: (key: string) => void;

  constructor(args: GitLabProviderOptions) {
    this.projectId = args.commitAuth.projectId;
    this.branch = args.commitBranch;
    this.message = args.commitMessage;
    this.gitbeaker = new Gitlab({
      token: args.commitAuth.token,
      host: args.commitAuth.host,
    });
    this.callback = args.callback;
  }
  async onPut(key: string, value: any) {
    let fileExists = false;
    try {
      await this.gitbeaker.RepositoryFiles.show(
        this.projectId,
        key,
        this.branch
      );
      fileExists = true;
    } catch (e) {}

    await this.gitbeaker.Commits.create(
      this.projectId,
      this.branch,
      this.message,
      [
        {
          filePath: key,
          action: fileExists ? "update" : "create",
          content: Base64.encode(value),
          encoding: "base64",
        },
      ]
    );
    if (this.callback) {
      this.callback(key);
    }
  }
  async onDelete(key: string) {
    let fileExists = false;
    try {
      await this.gitbeaker.RepositoryFiles.show(
        this.projectId,
        key,
        this.branch
      );
      fileExists = true;
    } catch (e) {}

    if (fileExists) {
      await this.gitbeaker.Commits.create(
        this.projectId,
        this.branch,
        this.message,
        [
          {
            filePath: key,
            action: "delete",
          },
        ]
      );
      if (this.callback) {
        this.callback(key);
      }
    }
  }
}
