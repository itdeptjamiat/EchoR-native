import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchMagazines, fetchMagazineDetail } from '@/redux/actions/magazineActions';

export interface Magazine {
  _id: string;
  mid: number;
  name: string;
  image: string;
  file: string;
  type: 'pro' | 'free';
  fileType: string;
  magzineType: 'magzine' | 'article' | 'digest';
  isActive: boolean;
  category: string;
  downloads: number;
  description: string;
  rating: number;
  reviews: Array<{
    userId: number;
    rating: number;
    review: string;
    time: string;
    _id: string;
  }>;
  createdAt: string;
  __v: number;
}

interface MagazineState {
  magazines: Magazine[];
  articles: Magazine[];
  digests: Magazine[];
  selectedMagazine: Magazine | null;
  loading: boolean;
  detailLoading: boolean;
  error: string | null;
}

const initialState: MagazineState = {
  magazines: [],
  articles: [],
  digests: [],
  selectedMagazine: null,
  loading: false,
  detailLoading: false,
  error: null,
};

const magazineSlice = createSlice({
  name: 'magazine',
  initialState,
  reducers: {
    clearMagazineError: (state) => {
      state.error = null;
    },
    clearSelectedMagazine: (state) => {
      state.selectedMagazine = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMagazines.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMagazines.fulfilled, (state, action: PayloadAction<Magazine[]>) => {
        state.loading = false;
        state.error = null;
        
        // Categorize magazines based on magzineType
        const magazines = action.payload.filter(mag => mag.magzineType === 'magzine');
        const articles = action.payload.filter(mag => mag.magzineType === 'article');
        const digests = action.payload.filter(mag => mag.magzineType === 'digest');
        
        state.magazines = magazines;
        state.articles = articles;
        state.digests = digests;
      })
      .addCase(fetchMagazines.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch magazines';
      })
      .addCase(fetchMagazineDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(fetchMagazineDetail.fulfilled, (state, action: PayloadAction<Magazine>) => {
        state.detailLoading = false;
        state.error = null;
        state.selectedMagazine = action.payload;
      })
      .addCase(fetchMagazineDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload as string || 'Failed to fetch magazine details';
      });
  },
});

export const { clearMagazineError, clearSelectedMagazine } = magazineSlice.actions;
export default magazineSlice.reducer; 