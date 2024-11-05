import React from "react";
import { Box, Chip, Button, MenuItem, TextField, IconButton, Popover, FormControl, InputLabel, Select, RadioGroup, Radio, FormControlLabel, Checkbox, Slider, Typography, Grow, } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { format } from "date-fns";
const FilterComponent = ({ filters, filterOptions, onFilterChange }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedFilterIndex, setSelectedFilterIndex] = React.useState(null);
    const openPopover = (event, index) => {
        setSelectedFilterIndex(index);
        setAnchorEl(event.currentTarget);
    };
    const closePopover = () => {
        setAnchorEl(null);
    };
    const handleFilterChange = (index, value) => {
        const updatedFilters = [...filters];
        updatedFilters[index].value = value;
        onFilterChange(updatedFilters);
    };
    const formatDateRange = (range) => {
        if (!range || !range.start || !range.end)
            return "";
        return `${format(new Date(range.start), "dd/MM/yyyy")} - ${format(new Date(range.end), "dd/MM/yyyy")}`;
    };
    const renderInputField = (filter, index) => {
        var _a, _b, _c;
        const selectedOption = filterOptions.find((option) => option.name === filter.name);
        if (!selectedOption)
            return null;
        switch (selectedOption.type) {
            case "string":
                return (React.createElement(TextField, { label: selectedOption.label, variant: "outlined", value: filter.value, onChange: (e) => handleFilterChange(index, e.target.value), fullWidth: true }));
            case "dateRange":
                const dateRangeValue = filter.value || { start: "", end: "" };
                return (React.createElement(Box, { display: "flex", gap: 2 },
                    React.createElement(TextField, { label: "Start Date", type: "date", InputLabelProps: { shrink: true }, value: dateRangeValue.start, onChange: (e) => handleFilterChange(index, Object.assign(Object.assign({}, dateRangeValue), { start: e.target.value })), fullWidth: true }),
                    React.createElement(TextField, { label: "End Date", type: "date", InputLabelProps: { shrink: true }, value: dateRangeValue.end, onChange: (e) => handleFilterChange(index, Object.assign(Object.assign({}, dateRangeValue), { end: e.target.value })), fullWidth: true })));
            case "select":
                return (React.createElement(FormControl, { fullWidth: true },
                    React.createElement(InputLabel, null, selectedOption.label),
                    React.createElement(Select, { value: filter.value, onChange: (e) => handleFilterChange(index, e.target.value) }, (_a = selectedOption.options) === null || _a === void 0 ? void 0 : _a.map((option, idx) => (React.createElement(MenuItem, { key: idx, value: option.value },
                        option.icon,
                        " ",
                        option.label))))));
            case "radio":
                return (React.createElement(RadioGroup, { value: filter.value, onChange: (e) => handleFilterChange(index, e.target.value) }, (_b = selectedOption.options) === null || _b === void 0 ? void 0 : _b.map((option, idx) => (React.createElement(FormControlLabel, { key: idx, value: option.value, control: React.createElement(Radio, null), label: option.label })))));
            case "checkbox":
                const checkboxValue = filter.value || [];
                return (_c = selectedOption.options) === null || _c === void 0 ? void 0 : _c.map((option, idx) => (React.createElement(FormControlLabel, { key: idx, control: React.createElement(Checkbox, { checked: checkboxValue.includes(option.value), onChange: (e) => {
                            const newValue = [...checkboxValue];
                            if (e.target.checked) {
                                newValue.push(option.value);
                            }
                            else {
                                newValue.splice(newValue.indexOf(option.value), 1);
                            }
                            handleFilterChange(index, newValue);
                        } }), label: option.label })));
            case "range":
                return (React.createElement(Slider, { value: filter.value || 0, onChange: (e, newValue) => handleFilterChange(index, newValue), valueLabelDisplay: "auto", min: selectedOption.min, max: selectedOption.max }));
            default:
                return null;
        }
    };
    return (React.createElement(Box, { sx: { padding: 2 } },
        React.createElement(Box, { sx: {
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 2,
                transition: "all 0.3s ease",
            } },
            filters.map((filter, index) => {
                const selectedOption = filterOptions.find((option) => option.name === filter.name);
                const value = (selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.type) === "dateRange"
                    ? formatDateRange(filter.value)
                    : Array.isArray(filter.value)
                        ? filter.value.join(", ")
                        : filter.value;
                return (React.createElement(Grow, { in: true, key: index, timeout: 300 },
                    React.createElement(Chip, { label: `${filter.name || "Select Filter"}: ${value || ""}`, onClick: (e) => openPopover(e, index), onDelete: () => {
                            const updatedFilters = filters.filter((_, i) => i !== index);
                            onFilterChange(updatedFilters);
                        }, color: "primary", sx: { fontSize: "16px", padding: "0 8px", transition: "all 0.3s ease" } })));
            }),
            React.createElement(IconButton, { onClick: (e) => openPopover(e, null), sx: { transition: "transform 0.3s ease" } },
                React.createElement(AddCircleOutlineIcon, { color: "action" }))),
        React.createElement(Popover, { open: Boolean(anchorEl), anchorEl: anchorEl, onClose: closePopover, anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, transitionDuration: 300 },
            React.createElement(Box, { sx: { padding: 2, minWidth: "300px" } }, selectedFilterIndex !== null && (React.createElement(React.Fragment, null,
                renderInputField(filters[selectedFilterIndex], selectedFilterIndex),
                React.createElement(Button, { onClick: closePopover, variant: "contained", color: "primary", sx: { mt: 2 } }, "Close"))))),
        React.createElement(Typography, { variant: "body1", sx: { mt: 4 } },
            "Filter Values: ",
            JSON.stringify(filters, null, 2))));
};
export default FilterComponent;
