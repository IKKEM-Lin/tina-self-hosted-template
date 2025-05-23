# How to Deploy to Vercel
If you'd like to quickly try out TinaCMS, you can click [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/IKKEM-Lin/tina-self-hosted-template/tree/main&env=GITHUB_PERSONAL_ACCESS_TOKEN,CLOUDINARY_URL,NEXTAUTH_SECRET&envDescription=NEXTAUTH_SECRET%20is%20secret%20for%20tinacms-auth.%20For%20the%20other%20variables%2C%20you%20can&envLink=https://github.com/IKKEM-Lin/tina-self-hosted-template/tree/main/doc/VercelDeploy.md&project-name=tina-self-hosted-template&repository-name=tina-self-hosted-template&stores=%5B%7B%22type%22%3A%22kv%22%7D%5D&) to quick deploy to Vercel with one click. To successfully complete the deployment, you’ll need to configure the following environment variables:

## 1. GITHUB_PERSONAL_ACCESS_TOKEN
First, make sure you're logged into Vercel with your GitHub account. TinaCMS performs Git operations, such as git push, when saving content changes. This template automatically reads the [GitHub Owner, Repo, and Branch](https://github.com/IKKEM-Lin/tina-self-hosted-template/blob/main/tina/gitProvider/index.ts#L15-L16) information from your Vercel environment variables.
To authorize these operations, you’ll need to provide a [GitHub Personal Access Token](https://github.com/settings/personal-access-tokens/new) with the appropriate repository access permissions. For details, refer to the [GitHub Git Provider](https://tina.io/docs/reference/self-hosted/git-provider/github).

## 2. CLOUDINARY_URL
For the media store deployed on Vercel, we’re using Cloudinary. Simply sign up for a free account on [Cloudinary](https://cloudinary.com/users/register_free), then navigate to Dashboard -> API Keys page. Enter your credentials as following format: `cloudinary://<API_KEY>:<API_SECRET>@<CLOUD_NAME>`.

![cloudinary URL on setting page](./images/cloudinary-api-key.png)

## 3. NEXTAUTH_SECRET
This is a secret key used by TinaCMS with `tinacms-authjs` for authentication. You can use any random string. For details, refer to the [Auth Provider](https://tina.io/docs/reference/self-hosted/auth-provider/authjs#update-tina-backend).

## After Build Successfully
You can visit `https://{your_domain}/admin/index.html` to edit content. The default username/password is `admin/Aa123456`.