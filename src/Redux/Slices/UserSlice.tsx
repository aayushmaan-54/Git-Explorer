import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GitHubUser {
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

export enum STATUSES {
  IDLE = 'idle',
  ERROR = 'error',
  LOADING = 'loading',
}

interface InitialState {
  data: GitHubUser[];
  status: STATUSES;
}

const initialState: InitialState = {
  data: [],
  status: STATUSES.IDLE,
};

// Thunks
export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  const res = await fetch('https://api.github.com/users?since=XXXX');
  const data = await res.json();
  console.log(data);
  return data as GitHubUser[];
});

// Slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<GitHubUser[]>) {
      state.data = action.payload;
    },
    setStatus(state, action: PayloadAction<STATUSES>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<GitHubUser[]>) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setUsers, setStatus } = usersSlice.actions;
export default usersSlice.reducer;