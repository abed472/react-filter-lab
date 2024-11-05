import React from "react";
type FilterValue = string | string[] | {
    start: string;
    end: string;
} | number | null;
interface FilterOption {
    name: string;
    type: 'string' | 'dateRange' | 'select' | 'radio' | 'checkbox' | 'range';
    label: string;
    options?: {
        label: string;
        value: string;
        icon?: JSX.Element;
    }[];
    min?: number;
    max?: number;
}
interface Filter {
    name: string;
    value: FilterValue;
}
interface FilterComponentProps {
    filters: Filter[];
    filterOptions: FilterOption[];
    onFilterChange: (updatedFilters: Filter[]) => void;
}
declare const FilterComponent: React.FC<FilterComponentProps>;
export default FilterComponent;
