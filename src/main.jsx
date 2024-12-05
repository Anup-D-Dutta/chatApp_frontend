// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import { CssBaseline } from '@mui/material';
// import { HelmetProvider } from 'react-helmet-async';
// import { Provider } from 'react-redux'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider>
//       <HelmetProvider>
//         <CssBaseline />
//         <div onContextMenu={(e) => e.preventDefault()}>
//           <App />
//         </div>
//       </HelmetProvider>
//     </Provider>
//   </StrictMode>,
// )

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { CssBaseline } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './redux/store.js'; // Import your Redux store
import { assets } from './assets/assets.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* Provide the Redux store here */}
      <HelmetProvider>
        <CssBaseline />
        <div style={{backgroundImage: `url(${assets.bg_login3})`, backgroundSize: 'cover'}} onContextMenu={(e) => e.preventDefault()}>
          <App />
        </div>
      </HelmetProvider>
    </Provider>
  </StrictMode>,
);

