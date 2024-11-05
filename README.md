
# My Filter Component for React with Material-UI

**A reusable, customizable, and visually appealing filter component built using React and Material-UI, perfect for building rich filtering UIs.**

## Features
- **Built with Material-UI**: Fully customizable using Material-UI's theme.
- **Rich Filter Types**: Supports text, date range, select, radio, checkbox, and range filters.
- **Smooth Animations**: Integrated with Material-UI’s animation system for a polished experience.
- **TypeScript Ready**: Comes with TypeScript support for a robust and maintainable codebase.
- **Flexible Configuration**: Easily configure and extend filters as needed.

---

## Installation

To install this package, use npm or yarn:

```bash
# Using npm
npm install my-filter-component

# Or using yarn
yarn add my-filter-component
```

### Peer Dependencies
This package relies on certain peer dependencies. Make sure you have them installed in your project:

- **React**: `^17.0.0` or `^18.0.0`
- **React DOM**: `^17.0.0` or `^18.0.0`
- **@mui/material**: `^5.0.0`
- **date-fns**: `^2.0.0`

You can install the peer dependencies with:
```bash
npm install react react-dom @mui/material date-fns
```

Or with yarn:
```bash
yarn add react react-dom @mui/material date-fns
```

---

## Usage

Here's a quick guide on how to use the component in your React project.

### Basic Example

```jsx
import React from 'react';
import { FilterComponent } from 'my-filter-component';

const App = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>My App with Advanced Filters</h1>
      <FilterComponent />
    </div>
  );
};

export default App;
```

### Configuration Options
The `FilterComponent` comes pre-configured with various filter types and options, but you can easily extend or customize it.

### Available Filter Types
- **Text**: Basic text input for string values.
- **Date Range**: Date picker input for selecting start and end dates.
- **Select**: Dropdown selection with icons.
- **Radio**: Single-choice selection.
- **Checkbox**: Multi-choice selection.
- **Range**: Slider for numerical values.

---

## Props Documentation
The component is designed to be flexible and customizable. Here’s an overview of the available props:

| Prop Name       | Type           | Description                                           |
| --------------- | -------------- | ----------------------------------------------------- |
| `filters`       | `Filter[]`     | Array of filters to be applied.                      |
| `onFilterChange`| `function`     | Callback function called when filter values change.  |
| `customStyles`  | `object`       | Custom styles to override default component styles.  |

**Example of `Filter` Type:**

```typescript
type Filter = {
  name: string;
  type: "string" | "dateRange" | "select" | "radio" | "checkbox" | "range";
  label: string;
  options?: { label: string; value: string; icon?: JSX.Element }[];
  min?: number;
  max?: number;
};
```

---

## Advanced Usage
### Customizing Filter Options
You can easily add or modify filters to fit your application needs. Here’s how to configure custom filters:

```jsx
import React from 'react';
import { FilterComponent } from 'my-filter-component';

const customFilters = [
  { name: "username", type: "string", label: "Username" },
  { name: "createdAt", type: "dateRange", label: "Created At" },
  {
    name: "userRole",
    type: "select",
    label: "User Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "User", value: "user" },
    ],
  },
  // More filters...
];

const App = () => {
  const handleFilterChange = (filters) => {
    console.log("Filters updated:", filters);
  };

  return (
    <FilterComponent
      filters={customFilters}
      onFilterChange={handleFilterChange}
    />
  );
};

export default App;
```

### Theming with Material-UI
To customize the appearance of the component, use Material-UI’s theme system:

```jsx
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FilterComponent } from 'my-filter-component';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <FilterComponent />
  </ThemeProvider>
);

export default App;
```

---

## Development and Contributing
We welcome contributions! Please see our [CONTRIBUTING.md](./CONTRIBUTING.md) file for details on how to get involved.

### Running Locally
1. Clone the repo: `git clone https://github.com/yourusername/my-filter-component.git`
2. Navigate to the project directory: `cd my-filter-component`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`

---

## License
This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Support
If you have any questions or need help, feel free to open an issue on our [GitHub](https://github.com/yourusername/my-filter-component) or contact us.

---

### Keywords
`react`, `filter`, `material-ui`, `component`, `date-range`, `checkbox`, `radio`, `typescript`
