import { simpleGit } from "simple-git";
import fsExtra from "fs-extra";
import path from "path";
import type { GitProvider } from "@tinacms/datalayer";

interface GitLocalProviderOptions {
  commitAuth: {
    name: string;
    email: string;
  };
  commitMessage: string;
  commitBranch: string;
  callback?: (key: string) => void;
}

export class GitLocalProvider implements GitProvider {
  private committer: {
    name: string;
    email: string;
  };
  private branch: string;
  message: string;
  private callback?: (key: string) => void;

  constructor(args: GitLocalProviderOptions) {
    this.committer = args.commitAuth;
    this.branch = args.commitBranch;
    this.message = args.commitMessage;
    this.callback = args.callback;
  }

  private async gitLocalCheckout(branchName: string) {
    const git = simpleGit();
    const branchSummary = await git.branch();
    const { email, name } = this.committer;
    await git.addConfig("user.email", email, undefined, "global");
    await git.addConfig("user.name", name, undefined, "global");

    if (branchSummary.all.includes(branchName)) {
      await git.checkout(branchName);
    } else {
      await git.checkoutLocalBranch(branchName);
    }
  }

  async onPut(key: string, value: any) {
    const filePath = path.join(process.cwd(), key);
    let fileExists = fsExtra.pathExistsSync(filePath);
    try {
      await fsExtra.accessSync(filePath, fsExtra.constants.W_OK);
      fileExists = true;
    } catch (e) {}

    const git = simpleGit();
    await this.gitLocalCheckout(this.branch);
    await fsExtra.outputFileSync(filePath, value);
    await git.add(".");
    await git.commit(this.message);
    if (this.callback) {
      this.callback(key);
    }
  }

  async onDelete(key: string) {
    const git = simpleGit();
    await this.gitLocalCheckout(this.branch);
    await fsExtra.removeSync(path.join(process.cwd(), key));
    await git.add(".");
    await git.commit(this.message);
    if (this.callback) {
      this.callback(key);
    }
  }
}
