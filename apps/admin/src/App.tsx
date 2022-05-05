import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import * as React from "react";
import { useUsersAdminQuery } from "graphql-codegen";

function App() {
  const { data } = useUsersAdminQuery();

  return (
    <Grid container spacing={3}>
      {data?.users?.map((user) => (
        <Grid item>
          <Card>
            <CardHeader
              title={user?.name}
              subheader={
                <Typography variant="caption">{`ID: ${user?.id}`}</Typography>
              }
            ></CardHeader>
            <CardContent>
              <Grid container direction="column" gap={2}>
                <Grid item>
                  <Typography variant="body2">{user?.createdAt}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{user?.email}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{user?.role}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default App;
