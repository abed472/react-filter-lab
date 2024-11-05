import React from "react";
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
  Menu,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Define types for filter options and filters
type FilterValue = string | string[] | { start: string; end: string } | number | null;

interface FilterOption {
  name: string;
  type: 'string' | 'dateRange' | 'select' | 'radio' | 'checkbox' | 'range';
  label: string;
  options?: { label: string; value: string; icon?: JSX.Element }[];
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

const FilterComponent: React.FC<FilterComponentProps> = ({ filters, filterOptions, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedFilterIndex, setSelectedFilterIndex] = React.useState<number | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLElement>, index: number | null) => {
    setSelectedFilterIndex(index);
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const openMenu = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchorEl(null);
  };

  const addFilter = (filterOption: FilterOption) => {
    const newFilter: Filter = { name: filterOption.name, value: null };
    onFilterChange([...filters, newFilter]);
    closeMenu();
  };

  const handleFilterValueChange = (index: number, value: FilterValue) => {
    const updatedFilters = [...filters];
    updatedFilters[index].value = value;
    onFilterChange(updatedFilters);
  };

  const renderInputField = (filter: Filter, index: number) => {
    const selectedOption = filterOptions.find((option) => option.name === filter.name);
    if (!selectedOption) return null;

    switch (selectedOption.type) {
      case 'string':
        return (
          <TextField
            label={selectedOption.label}
            variant="outlined"
            value={filter.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterValueChange(index, e.target.value)}
            fullWidth
          />
        );
      case 'dateRange':
        const dateRangeValue = filter.value as { start: string; end: string } || { start: '', end: '' };
        return (
          <Box display="flex" gap={2}>
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRangeValue.start}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterValueChange(index, { ...dateRangeValue, start: e.target.value })
              }
              fullWidth
            />
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateRangeValue.end}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleFilterValueChange(index, { ...dateRangeValue, end: e.target.value })
              }
              fullWidth
            />
          </Box>
        );
      case 'select':
        return (
          <FormControl fullWidth>
            <InputLabel>{selectedOption.label}</InputLabel>
            <Select
              value={filter.value as string}
              onChange={(e: SelectChangeEvent<string>) => handleFilterValueChange(index, e.target.value)}
            >
              {selectedOption.options?.map((option, idx) => (
                <MenuItem key={idx} value={option.value}>
                  {option.icon} {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'radio':
        return (
          <RadioGroup
            value={filter.value as string}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFilterValueChange(index, e.target.value)}
          >
            {selectedOption.options?.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option.value}
                control={<Radio />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        );
      case 'checkbox':
        const checkboxValue = (filter.value as string[]) || [];
        return selectedOption.options?.map((option, idx) => (
          <FormControlLabel
            key={idx}
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
                  handleFilterValueChange(index, newValue);
                }}
              />
            }
            label={option.label}
          />
        ));
      case 'range':
        return (
          <Slider
            value={filter.value as number || 0}
            onChange={(e, newValue) => handleFilterValueChange(index, newValue as number)}
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
          // Check if the filter is defined before rendering
          if (!filter || !filter.name) return null;

          const selectedOption = filterOptions.find((option) => option.name === filter.name);
          const value = Array.isArray(filter.value)
            ? filter.value.join(", ")
            : typeof filter.value === "object" && filter.value !== null
            ? `${filter.value.start} - ${filter.value.end}`
            : filter.value;

          return (
            <Grow in key={index} timeout={300}>
              <Chip
                label={`${selectedOption?.label || "Select Filter"}: ${value || ""}`}
                onClick={(e) => openPopover(e, index)}
                onDelete={() => {
                  const updatedFilters = filters.filter((_, i) => i !== index);
                  onFilterChange(updatedFilters);
                }}
                color="primary"
                sx={{
                  fontSize: "12px", // Smaller font size
                  padding: "4px 8px", // Smaller padding
                  transition: "all 0.3s ease",
                }}
              />
            </Grow>
          );
        })}
        <IconButton onClick={openMenu} sx={{ transition: "transform 0.3s ease" }}>
          <AddCircleOutlineIcon color="action" />
        </IconButton>
      </Box>
      {/* Menu for Adding Filters */}
      <Menu anchorEl={menuAnchorEl} open={Boolean(menuAnchorEl)} onClose={closeMenu}>
        {filterOptions.map((option, index) => (
          <MenuItem key={index} onClick={() => addFilter(option)}>
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Menu>
      {/* Popover for Editing Filter Values */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        transitionDuration={300}
      >
        <Box sx={{ padding: 2, minWidth: "300px" }}>
          {selectedFilterIndex !== null && renderInputField(filters[selectedFilterIndex], selectedFilterIndex)}
          <Button onClick={closePopover} variant="contained" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};

export default FilterComponent;