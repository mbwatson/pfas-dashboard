import {
  Button, Card, CardContent, Divider, Textarea, Typography,
} from '@mui/joy'
import {
  Delete as ClearIcon,
  Send as SubmitIcon,
} from '@mui/icons-material'
import { useLocalStorage } from '@hooks'

const initialQuery = JSON.stringify({})

export const QueryForm = () => {
  const [query, setQuery] = useLocalStorage('query', initialQuery)

  const handleEdit = event => {
    console.log(event.target.value)
    setQuery(event.target.value)
  }

  const handleClickClear = () => setQuery(initialQuery)

  return (
    <Card variant="soft" sx={{
      '.MuiTextarea-root': {
        fontFamily: 'monospace',
      },
      '.actions': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
      },
    }}>
      <CardContent>
        <Typography level="body-md">
          Lorem ipsum aliqua cupidatat amet reprehenderit ad culpa minim cillum in et sit labore veniam ea.
          Excepteur minim voluptate sint dolore laboris in est exercitation culpa.
          Elit dolor adipisicing elit pariatur laboris cillum esse aute velit aliquip deserunt irure veniam veniam duis.
        </Typography>
      </CardContent>

      <Divider>
        <Typography level="title-md">Query</Typography>
      </Divider>

      <CardContent>
        <Textarea
          name="query-area"
          placeholder="Type your query here…"
          variant="plain"
          minRows={ 15 }
          value={ query }
          onChange={ handleEdit }
        />
      </CardContent>

      <CardContent className="actions">
        <Button
          color="danger"
          variant="plain"
          startDecorator={ <ClearIcon /> }
          onClick={ handleClickClear }
        >Clear</Button>
        <Button
          color="primary"
          variant="soft"
          startDecorator={ <SubmitIcon /> }
        >Submit</Button>
      </CardContent>
    </Card>
  )
}