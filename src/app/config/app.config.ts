export type SearchType = 'people' | 'planets';

export interface AppFeatureConfig {
  peopleSearch: boolean;
  planetSearch: boolean;
}

export const appConfig: { features: AppFeatureConfig } = {
  features: {
    peopleSearch: true,
    planetSearch: true,
  },
};

export const getDefaultSearchType = (): SearchType => (
  appConfig.features.peopleSearch ? 'people' : 'planets'
);

export const isSearchTypeEnabled = (searchType: SearchType): boolean => {
  if (searchType === 'people') return appConfig.features.peopleSearch;
  if (searchType === 'planets') return appConfig.features.planetSearch;
  return false;
};
