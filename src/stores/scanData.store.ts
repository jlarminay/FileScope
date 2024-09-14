import { defineStore } from 'pinia';

export const useScanDataStore = defineStore('scanData', {
  state: () => ({
    target: {
      path: '',
      gitignore: false,
      skipGit: false,
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
      files: {
        total: 0,
        empty: 0,
        skipped: 0,
        largest: { size: 0, path: '' },
        first: { date: Infinity, path: '' },
        last: { date: 0, path: '' },
        extensions: {} as { [key: string]: number },
        types: {} as { [key: string]: number },
        specifics: {
          images: {
            count: 0,
            largest: { resolution: [0, 0], path: '' },
            smallest: {
              resolution: [Infinity, Infinity],
              path: '',
            },
          },
          videos: {
            count: 0,
            totalLength: 0,
            longest: { duration: 0, path: '' },
            shortest: { duration: Infinity, path: '' },
            largest: { resolution: { total: 0, width: 0, height: 0 }, path: '' },
            smallest: {
              resolution: { total: Infinity, width: Infinity, height: Infinity },
              path: '',
            },
          },
          audio: {
            count: 0,
          },
          text: {
            count: 0,
          },
        },
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
        skipGit: false,
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
        files: {
          total: 0,
          empty: 0,
          skipped: 0,
          largest: { size: 0, path: '' },
          first: { date: Infinity, path: '' },
          last: { date: 0, path: '' },
          extensions: {},
          types: {},
          specifics: {
            images: {
              count: 0,
              largest: { resolution: [0, 0], path: '' },
              smallest: {
                resolution: [Infinity, Infinity],
                path: '',
              },
            },
            videos: {
              count: 0,
              totalLength: 0,
              longest: { duration: 0, path: '' },
              shortest: { duration: Infinity, path: '' },
              largest: { resolution: { total: 0, width: 0, height: 0 }, path: '' },
              smallest: {
                resolution: { total: Infinity, width: Infinity, height: Infinity },
                path: '',
              },
            },
            audio: {
              count: 0,
            },
            text: {
              count: 0,
            },
          },
        },
        rawData: [] as any[],
      };
    },
  },
});
