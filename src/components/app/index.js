import { useState } from 'react'
import Deck from '../deck'
import PlayerNameAndDecksForm from '../name-and-decks-form'
import { EMPTY } from '../../services/sample-states'
import './style.css'

const MATCH_INDEXES = [0, 1, 2, 3]

const INITIAL_GAME_STATE = EMPTY

const submitNameAndDecks = (playerName, playerDecks) => {
  const url = new URL(window.location.href)
  window.SWINDLE_TETRAD_SOCKET.send(
    JSON.stringify({
      action: 'submit-name-and-decks',
      payload: {
        gameId: url.searchParams.get('game'),
        name: playerName,
        decks: playerDecks,
      },
    })
  )
}

function App() {
  const [game, setGame] = useState(INITIAL_GAME_STATE)

  window.SWINDLE_TETRAD_SOCKET.addEventListener('message', (event) => {
    const updateData = JSON.parse(event.data)
    const nextGameState = {
      ...game,
      ...updateData.game,
    }
    setGame(nextGameState)
  })

  return (
    <div className="app">
      <div className="container">
        {!game.players?.length && (
          <div className="row flex">
            <div className="col-6 ms-auto me-auto">
              <PlayerNameAndDecksForm
                submitNameAndDecks={submitNameAndDecks}
              ></PlayerNameAndDecksForm>
            </div>
          </div>
        )}

        <div className="row mb-4">
          {game.players?.length > 0 && (
            <div className="col player-name-col">
              <div className="player-name">{game.players[0].name}</div>
            </div>
          )}
          {game.players?.length > 1 && (
            <>
              <div className="col-1"></div>
              <div className="col player-name-col">
                <div className="player-name">{game.players[1].name}</div>
              </div>
            </>
          )}
        </div>

        {game.players?.length === 1 && (
          <div className="alert alert-info">
            <span className="alert-header">
              Welcome, {game.players[0].name}
            </span>
            <div>
              Check over your decks below, then send your opponent this link to
              join the game:
            </div>
            <a href={'/?game=' + game.id}>
              {window.location.href + '?game=' + game.id}
            </a>
          </div>
        )}

        {MATCH_INDEXES.map((ix) => (
          <div key={ix} className="row matchup">
            {game.players?.length > 0 && (
              <div className="col">
                <Deck details={game.decks[game.players[0].decks[ix]]}></Deck>
              </div>
            )}

            {game.players?.length > 1 && (
              <>
                <div className="col-1"></div>
                <div className="col">
                  <Deck details={game.decks[game.players[1].decks[ix]]}></Deck>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
