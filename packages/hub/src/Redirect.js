import { useHistory } from '@matthamlin/reroute-core'

export default function Redirect({ to }) {
  let { history } = useHistory()

  history.push(to)

  return null
}
