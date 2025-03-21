export type SortOption = 'updated' | 'full_name';
export interface SortState {
    sortOption: SortOption;
}
export declare const setSortOption: import("@reduxjs/toolkit").ActionCreatorWithPayload<SortOption, "sort/setSortOption">;
declare const _default: import("redux").Reducer<SortState>;
export default _default;
