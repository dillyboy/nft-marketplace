import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  nfts: []
}

export const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    getAll: ((state, data) => {
      state.nfts = data.payload
    }),
    updateBid: ((state, data) => {
      const nfts = current(state).nfts.slice();
      const indexToReplace = nfts.findIndex(nft => nft.id === data.payload.id);
      nfts.splice(indexToReplace, 1, data.payload);
      state.nfts = nfts;
    }),
  }
})

export const { getAll, updateBid } = nftSlice.actions;

export default nftSlice.reducer;
