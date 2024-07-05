import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface License {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

interface Owner {
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
}

export interface Repository {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: Owner;
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
  license: License;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  score: number;
}

export enum STATUSES {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
}

export interface INITIAL_STATE {
  data: Repository[],
  status: STATUSES
}

const initialState: INITIAL_STATE = {
  data: [],
  status: STATUSES.IDLE
}

// Thunks
export const fetchRepositories = createAsyncThunk('repositories/fetch', async () => {
  const res = await fetch('https://api.github.com/search/repositories?q=created:%3E2023-06-01&sort=stars&order=desc');
  const data = await res.json();
  return data.items as Repository[];
});

// export function fetchRepositories() {
//     return async function fetchRepositoriesThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING));
//         try {
//             const res = await fetch('https://api.github.com/search/repositories?q=XXX');
//             const data = await res.json();
//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE));
//         } catch (err) {
//             console.log(err);
//             dispatch(setStatus(STATUSES.ERROR));
//         }
//     };



// Slice
export const repositorySlice = createSlice({
  name: 'repositories',
  initialState,

  reducers: {

    SET_REPO(state, action: PayloadAction<Repository[]>) {
      state.data = action.payload;
    },
    SET_STATUS(state, action: PayloadAction<STATUSES>) {
      state.status = action.payload;
    },
    // setProducts(state, action) {
    //     state.data = action.payload;
    // },
    // setStatus(state, action) {
    //     state.status = action.payload;
    // },

  },


  extraReducers: (builder) => {

    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchRepositories.fulfilled, (state, action: PayloadAction<Repository[]>) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchRepositories.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });

  },
});

export const { SET_REPO, SET_STATUS } = repositorySlice.actions;
export default repositorySlice.reducer;