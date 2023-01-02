import { getPlayerDecks } from '../../services/game'

const getWaitingForSelection = (selectFor) => {
  const selectForDisplay = {
    ban: 'ban',
    safe: 'save',
    steal: 'steal',
    deck1: 'play in game one',
    deck2: 'play in game two',
    deck3: 'play in game three',
  }[selectFor]
  return (
    <div className="alert alert-info">
      Select a deck to <b>{selectForDisplay}</b>.
    </div>
  )
}

function Status(props) {
  const { game } = props

  const myDecks = getPlayerDecks(game, 0)
  const theirDecks = getPlayerDecks(game, 1)
  const mySelectFor = myDecks.find((x) => x.selectFor)?.selectFor
  const theirSelectFor = theirDecks.find((x) => x.selectFor)?.selectFor
  const selectFor = mySelectFor || theirSelectFor

  if (!myDecks.length || !theirDecks.length) {
    return null
  }

  if (game.players?.[0]?.deck3 && game.players?.[1]?.deck3) {
    return null
  }

  return (
    <div className="game-status">
      {selectFor ? (
        getWaitingForSelection(selectFor)
      ) : (
        <div className="alert alert-info">
          Waiting for opponent to make a selection.
        </div>
      )}
    </div>
  )
}

export default Status
