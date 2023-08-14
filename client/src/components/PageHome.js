import {Table} from 'semantic-ui-react'

function PageHome(){
  return (<>
    <h2>Your meal plan</h2>
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={6}>
            Day
          </Table.HeaderCell>
          <Table.HeaderCell>
            Meal
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            Monday
          </Table.Cell>
          <Table.Cell>
            Meal 1
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </>)
}

export default PageHome;