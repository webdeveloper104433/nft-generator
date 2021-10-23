/* pages/_app.js */
import '../styles/globals.css'
import { css } from "@emotion/react";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      
    </div>

  )
}

export default MyApp
