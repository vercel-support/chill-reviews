import React from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import { wrapper } from "@/store";
import { DashboardLayout } from "@/components";

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <DashboardLayout title="Chill Reviews - Dashboard">
        <Component {...pageProps} />
      </DashboardLayout>
    </React.Fragment>
  )
}

export default wrapper.withRedux(MyApp);
