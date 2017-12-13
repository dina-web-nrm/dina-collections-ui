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
                <List.Item>
                  <a href="https://www.dina-project.net/wiki/Welcome_to_the_DINA_project!">
                    DINA-Project
                  </a>
                </List.Item>
                <List.Item>
                  <List.Content>
                    <a href="https://github.com/DINA-Web">DINA-Web on Github</a>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  )
}
