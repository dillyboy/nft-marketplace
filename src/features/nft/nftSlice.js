import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://dillyboy.github.io/nft-marketplace';
const initialState = {
  nfts: []
}

export const fetchNts = createAsyncThunk('fetchNts', async () => {
  try {
    const response = await axios.get(`${url}/sample-api.json`)
    return response.data;
  } catch (err) {
    return err.message;
  }
})

export const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    updateBid: ((state, data) => {
      const nfts = current(state).nfts.slice();
      const indexToReplace = nfts.findIndex(nft => nft.id === data.payload.id);
      nfts.splice(indexToReplace, 1, data.payload);
      state.nfts = nfts;
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNts.fulfilled, (state, action) => {
      state.nfts = action.payload;
    })
  },
})

export const { updateBid } = nftSlice.actions;

export default nftSlice.reducer;
