import React from 'react';
import { Grid, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';

// components
import SalesOverview from './components/SalesOverview';
import YearlyBreakup from './components/YearlyBreakup';

import Blog from './components/Blog';
import MonthlyEarnings from './components/MonthlyEarnings';
import Card from './Card'

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box style={{paddingTop:80}}>
        <Grid container spacing={3}>

        <Grid item xs={12} lg={3}>
        <Card
          title="Staff members"
          description="Manage your staff members efficiently."
          link="/AllStaff"
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Card
          title="All Student"
          description="View and manage all student records."
          link="/AllStudent"
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Card
          title="Notice"
          description="Keep everyone updated with important notices."
          link="/Notice"
        />
      </Grid>
      <Grid item xs={12} lg={3}>
        <Card
          title="Events"
          description="Stay informed about upcoming events and activities."
          link="/Event"
        />
      </Grid>

          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
         
          {/* <Grid item xs={12}>
            <Blog />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
