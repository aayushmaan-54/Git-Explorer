import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface RepoData {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string | null;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  temp_clone_token: string | null;
  custom_properties: Record<string, unknown>;
  organization: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  network_count: number;
  subscribers_count: number;
}

const RepoDetails = () => {
  const [repoDetails, setRepoDetails] = useState<RepoData | null>(null);
  const [copyClipboard, setCopyClipboard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { name, username } = useParams<{ name: string; username: string }>();
  const URL = `https://api.github.com/repos/${username}/${name}`;

  useEffect(() => {
    const getRepoDetails = async () => {
      try {
        const response = await axios.get<RepoData>(URL);
        setRepoDetails(response.data);
      } catch (e) {
        setError("Failed to fetch repository details.");
      } finally {
        setLoading(false);
      }
    };
    getRepoDetails();
  }, [username, name, URL]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      {repoDetails && (
        <article className="w-screen mt-32">
          <div className="flex flex-wrap items-center justify-center gap-10 pb-10">
            <img src={repoDetails.owner.avatar_url} alt={repoDetails.name} className="w-[200px]" />
            <div className="flex flex-col items-center justify-center">
              <p>
                Owner: <Link to={`/users/user/${repoDetails.owner.login}`} className="text-[#7d34f1] underline">{repoDetails.owner.login}</Link>
              </p>
              <h1 className="text-red-500">Language: {repoDetails.language}</h1>
              <h1 className="my-8 text-4xl font-bold">{repoDetails.name}</h1>
              <a href={repoDetails.html_url} className="text-[#7d34f1] underline mb-5">View on GitHub</a>
              <div>
                <input type="text" value={repoDetails.clone_url} readOnly className="bg-[#181819] py-2 rounded-lg px-6 hover:bg-[#0e0d0d] ml outline outline-1 outline-white hover:outline-indigo-600 transition-all duration-200 cursor-pointer" />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(repoDetails.clone_url);
                    setCopyClipboard(true);
                    setTimeout(() => {
                      setCopyClipboard(false);
                    }, 3000);
                  }}
                  className="bg-[#181819] py-2 rounded-lg px-6 hover:bg-[#0e0d0d] ml-2 outline outline-1 outline-white hover:outline-indigo-600 transition-all duration-200"
                >
                  {copyClipboard ? "Copied" : "Clone"}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default RepoDetails;