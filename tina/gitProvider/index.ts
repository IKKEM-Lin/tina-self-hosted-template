import { revalidatePath } from "./revalidatePath";
import { GitLabProvider } from "./gitLab";
import { GitHubProvider } from "./github";
import { GitLocalProvider } from "./gitLocal";
import type { GitProvider } from "@tinacms/datalayer";

// const isGitLocal = process.env.GIT_TYPE === "local";
const isGitLab = process.env.GIT_TYPE === "gitlab";
const isGitHub = process.env.GIT_TYPE === "github";

const gitlabHost = process.env.GITLAB_HOST as string;
const gitlabProjectId = process.env.GITLAB_PROJECT_ID as string;
const gitlabToken = process.env.GITLAB_PERSONAL_ACCESS_TOKEN as string;

const githubOwner = process.env.GITHUB_OWNER || process.env.VERCEL_GIT_REPO_OWNER as string;
const githubRepo = process.env.GITHUB_REPO || process.env.VERCEL_GIT_REPO_SLUG as string;
const githubToken = process.env.GITHUB_PERSONAL_ACCESS_TOKEN as string;

const gitLocalCommitterName = process.env.GIT_LOCAL_COMMITTER_NAME as string;
const gitLocalCommitterEmail = process.env.GIT_LOCAL_COMMITTER_EMAIL as string;

const gitCommitMessage = process.env.GIT_COMMIT_MESSAGE as string || "content: Edited with TinaCMS";
const gitCommitBranch = process.env.GIT_COMMIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF as string || "tina";

if (process.env.ENV_DEBUG) {
  console.log("ENV_DEBUG: ", JSON.stringify(process.env, null, 2));
}

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
