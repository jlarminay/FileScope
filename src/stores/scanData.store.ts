import { defineStore } from 'pinia';

export const useScanDataStore = defineStore('scanData', {
  state: () => ({
    target: {
      path: '',
      gitignore: false,
    },
    results: {
      scan: {
        start: 0,
        end: 0,
      },
      total: {
        size: 0,
        files: 0,
      },
      folders: {
        total: 0,
        empty: 0,
      },
      files: {
        total: 0,
        empty: 0,
        largest: { size: 0, path: '' },
        first: { date: Infinity, path: '' },
        last: { date: 0, path: '' },
        extensions: {} as { [key: string]: number },
      },
      rawData: [] as any[],
    },
  }),

  getters: {},

  actions: {
    resetTarget(): void {
      this.target = {
        path: '',
        gitignore: false,
      };
    },
    resetResults(): void {
      this.results = {
        scan: {
          start: 0,
          end: 0,
        },
        total: {
          size: 0,
          files: 0,
        },
        folders: {
          total: 0,
          empty: 0,
        },
        files: {
          total: 0,
          empty: 0,
          largest: { size: 0, path: '' },
          first: { date: Infinity, path: '' },
          last: { date: 0, path: '' },
          extensions: {} as { [key: string]: number },
        },
        rawData: [] as any[],
      };
    },
  },
});
