import React from 'react'
import { Container, Grid, Header, List, Segment } from 'semantic-ui-react'

export default () => {
  const size = 'medium'
  return (
    <Segment inverted style={{ padding: '5em 0em' }} vertical>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header as="h4" content="About" inverted />
              <List inverted link size={size}>
                <List.Item as="a">Dina project page</List.Item>
                <List.Item as="a">
                  <List.Content>Github</List.Content>
                </List.Item>
                <List.Item as="a">Contact Us</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header as="h4" content="Services" inverted />
              <List inverted link>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as="h4" inverted>
                Footer Header
              </Header>
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}