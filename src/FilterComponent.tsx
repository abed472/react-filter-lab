import React, { useState } from "react";
import {
  Box,
  Chip,
  Button,
  MenuItem,
  TextField,
  IconButton,
  Popover,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  Slider,
  Typography,
  Grow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { format } from "date-fns";

// Define types for filter options and filters
type FilterValue = string | string[] | { start: string; end: string } | number | null;

interface FilterOption {
  name: string;
  type: "string" | "dateRange" | "select" | "radio" | "checkbox" | "range";
  label: string;
  options?: { label: string; value: string; icon?: JSX.Element }[];
  min?: number;
  max?: number;
}

interface Filter {
  name: string;
  value: FilterValue;
}

const filterOptions: FilterOption[] = [
  { name: "customerName", type: "string", label: "Customer Name" },
  { name: "customerEmail", type: "string", label: "Customer Email" },
  { name: "dateRange", type: "dateRange", label: "Date Range" },
  {
    name: "customerType",
    type: "select",
    label: "Customer Type",
    options: [
      { label: "Individual", value: "Individual", icon: <AccountCircleIcon /> },
      { label: "Business", value: "Business", icon: <AccountCircleIcon /> },
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

const FilterComponent: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = useState<number | null>(null);
  const [currentValue, setCurrentValue] = useState<FilterValue>("");

  const openPopover = (event: React.MouseEvent<HTMLElement>, index: number | null) => {
    setSelectedFilterIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
    setCurrentValue("");
  };

  const addFilter = (event: React.MouseEvent<HTMLElement>) => {
    setFilters([...filters, { name: "", value: null }]);
    openPopover(event, filters.length);
  };

  const selectFilterType = (event: SelectChangeEvent<string>, index: number) => {
    const updatedFilters = [...filters];
    updatedFilters[index].name = event.target.value;
    setFilters(updatedFilters);
  };

  const updateFilterValue = (value: FilterValue) => {
    if (selectedFilterIndex !== null) {
      const updatedFilters = [...filters];
      updatedFilters[selectedFilterIndex].value = value;
      setFilters(updatedFilters);
    }
  };

  const formatDateRange = (range: { start: string; end: string }) => {
    if (!range || !range.start || !range.end) return "";
    return `${format(new Date(range.start), "dd/MM/yyyy")} - ${format(new Date(range.end), "dd/MM/yyyy")}`;
  };

  const renderInputField = (filter: Filter | null) => {
    if (!filter) return null;

    const selectedOption = filterOptions.find((option) => option.name === filter.name);
    if (!selectedOption) return null;

    switch (selectedOption.type) {
      case "string":
        return (
          <TextField
            label={selectedOption.label}
            variant="outlined"
            value={currentValue as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)}
            fullWidth
          />
        );
      case "dateRange":
        const dateRangeValue = currentValue as { start: string; end: string } || { start: "", end: "" };
        return (
          <Box display="flex" gap={2}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRangeValue.start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentValue({ ...dateRangeValue, start: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRangeValue.end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCurrentValue({ ...dateRangeValue, end: e.target.value })
              }
              fullWidth
            />
          </Box>
        );
      case "select":
        return (
          <FormControl fullWidth>
            <InputLabel>{selectedOption.label}</InputLabel>
            <Select
              value={currentValue as string}
              onChange={(e: SelectChangeEvent<string>) => setCurrentValue(e.target.value)}
            >
              {selectedOption.options?.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.icon} {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "radio":
        return (
          <RadioGroup
            value={currentValue as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentValue(e.target.value)}
          >
            {selectedOption.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        );
      case "checkbox":
        const checkboxValue = (currentValue as string[]) || [];
        return selectedOption.options?.map((option, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={checkboxValue.includes(option.value)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const newValue = [...checkboxValue];
                  if (e.target.checked) {
                    newValue.push(option.value);
                  } else {
                    newValue.splice(newValue.indexOf(option.value), 1);
                  }
                  setCurrentValue(newValue);
                }}
              />
            }
            label={option.label}
          />
        ));
      case "range":
        return (
          <Slider
            value={currentValue as number || 0}
            onChange={(e, newValue) => setCurrentValue(newValue as number)}
            valueLabelDisplay="auto"
            min={selectedOption.min}
            max={selectedOption.max}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          mb: 2,
          transition: "all 0.3s ease",
        }}
      >
        {filters.map((filter, index) => {
          const selectedOption = filterOptions.find((option) => option.name === filter.name);
          const value =
            selectedOption?.type === "dateRange"
              ? formatDateRange(filter.value as { start: string; end: string })
              : Array.isArray(filter.value)
              ? filter.value.join(", ")
              : filter.value;

          return (
            <Grow in key={index} timeout={300}>
              <Chip
                label={`${filter.name || "Select Filter"}: ${value || ""}`}
                onClick={(e) => openPopover(e, index)}
                onDelete={() => setFilters(filters.filter((_, i) => i !== index))}
                color="primary"
                sx={{ fontSize: "16px", padding: "0 8px", transition: "all 0.3s ease" }}
              />
            </Grow>
          );
        })}
        <IconButton onClick={addFilter} sx={{ transition: "transform 0.3s ease" }}>
          <AddCircleOutlineIcon color="action" />
        </IconButton>
      </Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        transitionDuration={300}
      >
        <Box sx={{ padding: 2, minWidth: "300px" }}>
          {selectedFilterIndex !== null && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Filter Type</InputLabel>
                <Select
                  value={filters[selectedFilterIndex]?.name || ""}
                  onChange={(e: SelectChangeEvent<string>) => selectFilterType(e, selectedFilterIndex)}
                >
                  {filterOptions.map((option, index) => (
                    <MenuItem key={index} value={option.name}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {renderInputField(filters[selectedFilterIndex])}
              <Button
                onClick={() => {
                  updateFilterValue(currentValue);
                  closePopover();
                }}
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Save Filter
              </Button>
            </>
          )}
        </Box>
      </Popover>
      <Typography variant="body1" sx={{ mt: 4 }}>
        Filter Values: {JSON.stringify(filters, null, 2)}
      </Typography>
    </Box>
  );
};

export default FilterComponent;