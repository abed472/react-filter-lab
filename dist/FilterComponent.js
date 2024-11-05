import React, { useState } from "react";
import { Box, Chip, Button, MenuItem, TextField, IconButton, Popover, FormControl, InputLabel, Select, RadioGroup, Radio, FormControlLabel, Checkbox, Slider, Typography, Grow, } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";
const filterOptions = [
    { name: "customerName", type: "string", label: "Customer Name" },
    { name: "customerEmail", type: "string", label: "Customer Email" },
    { name: "dateRange", type: "dateRange", label: "Date Range" },
    {
        name: "customerType",
        type: "select",
        label: "Customer Type",
        options: [
            { label: "Individual", value: "Individual", icon: React.createElement(AccountCircleIcon, null) },
            { label: "Business", value: "Business", icon: React.createElement(AccountCircleIcon, null) },
        ],
    },
    {
        name: "customerStatus",
        type: "radio",
        label: "Customer Status",
        options: [
            { label: "Active", value: "Active" },
            { label: "Inactive", value: "Inactive" },
        ],
    },
    {
        name: "customerGroup",
        type: "checkbox",
        label: "Customer Group",
        options: [
            { label: "Group 1", value: "Group 1" },
            { label: "Group 2", value: "Group 2" },
            { label: "Group 3", value: "Group 3" },
        ],
    },
    { name: "customerSalary", type: "range", label: "Customer Salary", min: 0, max: 100000 },
];
const FilterComponent = () => {
    var _a;
    const [filters, setFilters] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedFilterIndex, setSelectedFilterIndex] = useState(null);
    const [currentValue, setCurrentValue] = useState("");
    const openPopover = (event, index) => {
        setSelectedFilterIndex(index);
        setAnchorEl(event.currentTarget);
    };
    const closePopover = () => {
        setAnchorEl(null);
        setCurrentValue("");
    };
    const addFilter = (event) => {
        setFilters([...filters, { name: "", value: null }]);
        openPopover(event, filters.length);
    };
    const selectFilterType = (event, index) => {
        const updatedFilters = [...filters];
        updatedFilters[index].name = event.target.value;
        setFilters(updatedFilters);
    };
    const updateFilterValue = (value) => {
        if (selectedFilterIndex !== null) {
            const updatedFilters = [...filters];
            updatedFilters[selectedFilterIndex].value = value;
            setFilters(updatedFilters);
        }
    };
    const formatDateRange = (range) => {
        if (!range || !range.start || !range.end)
            return "";
        return `${format(new Date(range.start), "dd/MM/yyyy")} - ${format(new Date(range.end), "dd/MM/yyyy")}`;
    };
    const renderInputField = (filter) => {
        var _a, _b, _c;
        if (!filter)
            return null;
        const selectedOption = filterOptions.find((option) => option.name === filter.name);
        if (!selectedOption)
            return null;
        switch (selectedOption.type) {
            case "string":
                return (React.createElement(TextField, { label: selectedOption.label, variant: "outlined", value: currentValue, onChange: (e) => setCurrentValue(e.target.value), fullWidth: true }));
            case "dateRange":
                const dateRangeValue = currentValue || { start: "", end: "" };
                return (React.createElement(Box, { display: "flex", gap: 2 },
                    React.createElement(TextField, { label: "Start Date", type: "date", InputLabelProps: { shrink: true }, value: dateRangeValue.start, onChange: (e) => setCurrentValue(Object.assign(Object.assign({}, dateRangeValue), { start: e.target.value })), fullWidth: true }),
                    React.createElement(TextField, { label: "End Date", type: "date", InputLabelProps: { shrink: true }, value: dateRangeValue.end, onChange: (e) => setCurrentValue(Object.assign(Object.assign({}, dateRangeValue), { end: e.target.value })), fullWidth: true })));
            case "select":
                return (React.createElement(FormControl, { fullWidth: true },
                    React.createElement(InputLabel, null, selectedOption.label),
                    React.createElement(Select, { value: currentValue, onChange: (e) => setCurrentValue(e.target.value) }, (_a = selectedOption.options) === null || _a === void 0 ? void 0 : _a.map((option, index) => (React.createElement(MenuItem, { key: index, value: option.value },
                        option.icon,
                        " ",
                        option.label))))));
            case "radio":
                return (React.createElement(RadioGroup, { value: currentValue, onChange: (e) => setCurrentValue(e.target.value) }, (_b = selectedOption.options) === null || _b === void 0 ? void 0 : _b.map((option, index) => (React.createElement(FormControlLabel, { key: index, value: option.value, control: React.createElement(Radio, null), label: option.label })))));
            case "checkbox":
                const checkboxValue = currentValue || [];
                return (_c = selectedOption.options) === null || _c === void 0 ? void 0 : _c.map((option, index) => (React.createElement(FormControlLabel, { key: index, control: React.createElement(Checkbox, { checked: checkboxValue.includes(option.value), onChange: (e) => {
                            const newValue = [...checkboxValue];
                            if (e.target.checked) {
                                newValue.push(option.value);
                            }
                            else {
                                newValue.splice(newValue.indexOf(option.value), 1);
                            }
                            setCurrentValue(newValue);
                        } }), label: option.label })));
            case "range":
                return (React.createElement(Slider, { value: currentValue || 0, onChange: (e, newValue) => setCurrentValue(newValue), valueLabelDisplay: "auto", min: selectedOption.min, max: selectedOption.max }));
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
                    React.createElement(Chip, { label: `${filter.name || "Select Filter"}: ${value || ""}`, onClick: (e) => openPopover(e, index), onDelete: () => setFilters(filters.filter((_, i) => i !== index)), color: "primary", sx: { fontSize: "16px", padding: "0 8px", transition: "all 0.3s ease" } })));
            }),
            React.createElement(IconButton, { onClick: addFilter, sx: { transition: "transform 0.3s ease" } },
                React.createElement(AddCircleOutlineIcon, { color: "action" }))),
        React.createElement(Popover, { open: Boolean(anchorEl), anchorEl: anchorEl, onClose: closePopover, anchorOrigin: { vertical: "bottom", horizontal: "left" }, transformOrigin: { vertical: "top", horizontal: "left" }, transitionDuration: 300 },
            React.createElement(Box, { sx: { padding: 2, minWidth: "300px" } }, selectedFilterIndex !== null && (React.createElement(React.Fragment, null,
                React.createElement(FormControl, { fullWidth: true, sx: { mb: 2 } },
                    React.createElement(InputLabel, null, "Filter Type"),
                    React.createElement(Select, { value: ((_a = filters[selectedFilterIndex]) === null || _a === void 0 ? void 0 : _a.name) || "", onChange: (e) => selectFilterType(e, selectedFilterIndex) }, filterOptions.map((option, index) => (React.createElement(MenuItem, { key: index, value: option.name }, option.label))))),
                renderInputField(filters[selectedFilterIndex]),
                React.createElement(Button, { onClick: () => {
                        updateFilterValue(currentValue);
                        closePopover();
                    }, variant: "contained", color: "primary", sx: { mt: 2 } }, "Save Filter"))))),
        React.createElement(Typography, { variant: "body1", sx: { mt: 4 } },
            "Filter Values: ",
            JSON.stringify(filters, null, 2))));
};
export default FilterComponent;
