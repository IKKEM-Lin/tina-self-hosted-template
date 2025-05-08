import { revalidatePath } from "./revalidatePath";
import { GitLabProvider } from "./gitLab";
import { GitHubProvider } from "./github";
import { GitLocalProvider } from "./gitLocal";
import type { GitProvider } from "@tinacms/datalayer";
import {
  isGitHub,
  isGitLab,
  gitlabHost,
  gitlabProjectId,
  gitlabToken,
  githubOwner,
  githubRepo,
  githubToken,
  gitLocalCommitterName,
  gitLocalCommitterEmail,
  gitCommitMessage,
  gitCommitBranch,
} from "@/share/env";

let gitProvider: GitProvider;
if (isGitLab) {
  gitProvider = new GitLabProvider({
    commitAuth: {
      host: gitlabHost,
      projectId: gitlabProjectId,
      token: gitlabToken,
    },
    commitMessage: gitCommitMessage,
    commitBranch: gitCommitBranch,
    callback: revalidatePath,
  });
} else if (isGitHub) {
  gitProvider = new GitHubProvider({
    commitAuth: {
      owner: githubOwner,
      repo: githubRepo,
      token: githubToken,
    },
    commitMessage: gitCommitMessage,
    commitBranch: gitCommitBranch,
    callback: revalidatePath,
  });
} else {
  gitProvider = new GitLocalProvider({
    commitAuth: {
      name: gitLocalCommitterName,
      email: gitLocalCommitterEmail,
    },
    commitMessage: gitCommitMessage,
    commitBranch: gitCommitBranch,
    callback: revalidatePath,
  });
}

export { gitProvider };
