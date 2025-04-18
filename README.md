# React Searchable Dropdown App

This project is a dropdown-based searchable UI built using [React](https://reactjs.org/), [Fluent UI](https://developer.microsoft.com/en-us/fluentui), and [Axios](https://axios-http.com/). It fetches data from a public API and allows users to filter using multiple dropdowns.

## ✨ Features

- Multiple dynamic dropdown filters
- Responsive UI with Fluent UI components
- Axios-based API integration
- Clean, card-style layout
- Built with Create React App

## 🚀 Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/your-username/reactsearchable.git
cd reactsearchable
yarn
```

### Start Development Server

```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
yarn build
```

Creates an optimized production build in the `build` folder.

## 📁 Project Structure

```bash
src/
├── App.js          # Main application component
├── App.css         # Styles for layout and card UI
├── index.js        # React entry point
```

## 🔧 Scripts

| Command         | Description                          |
|----------------|--------------------------------------|
| `yarn start`    | Run the app in development mode     |
| `yarn build`    | Create an optimized production build |
| `yarn test`     | Launch the test runner               |

## 🔍 Data Source

This app fetches data from:

**[https://picsum.photos/v2/list?limit=2000](https://picsum.photos/v2/list?limit=2000)**

## 🧠 Technologies Used

- React
- Fluent UI (`@fluentui/react`)
- Axios
- Create React App

## 💡 Customization

You can modify the filters in `App.js` by editing the `config.filters` array. Each filter includes:

- `id`
- `label`
- `placeholder`
- `dataReference` (used to extract data from fetched API)