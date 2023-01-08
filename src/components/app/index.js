import { useState } from 'react'
import Deck from '../deck'
import Status from '../status'
import PlayerNameAndDecksForm from '../name-and-decks-form'
import { getPlayerDecks } from '../../services/game'
import * as gameStates from '../../services/sample-states'
import './style.css'

const INITIAL_GAME_STATE = process.env.REACT_APP_GAME_STATE
  ? gameStates[process.env.REACT_APP_GAME_STATE]
  : gameStates.EMPTY

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

const selectDeck = (gameId, selectFor, deckId) => {
  window.SWINDLE_TETRAD_SOCKET.send(
    JSON.stringify({
      action: 'select-deck',
      payload: {
        deck: deckId,
        gameId,
        selectFor,
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

  const myDecks = getPlayerDecks(game, 0)
  const theirDecks = getPlayerDecks(game, 1)

  const handleSelect = (selectFor, deckId) => {
    selectDeck(game.id, selectFor, deckId)
    const [me, them] = game.players
    setGame({
      ...game,
      players: [
        {
          ...me,
          [selectFor]: deckId,
        },
        them,
      ],
    })
  }

  return (
    <div className="app h-100">
      <div className="container d-flex flex-column h-100">
        {!game.players?.length && (
          <div className="row flex">
            <div className="col-lg-6 ms-auto me-auto">
              <PlayerNameAndDecksForm
                submitNameAndDecks={submitNameAndDecks}
              ></PlayerNameAndDecksForm>
            </div>
          </div>
        )}

        {game.players?.length === 1 && (
          <div className="alert alert-info text-center fs-4">
            <span className="alert-header">
              Welcome, {game.players[0].name}
            </span>
            <div>
              Check over your decks below, then send your opponent this link to
              join the game:
            </div>
            <a href={'?game=' + game.id}>
              {window.location.href + '?game=' + game.id}
            </a>
          </div>
        )}

        <Status game={game}></Status>

        <div className="row mb-4">
          {myDecks?.length > 0 && (
            <div className="col">
              <div className="player-name">{game.players[0].name}</div>
              <ul className="my-decks-list decks-list">
                {myDecks.map((deck) => (
                  <li key={deck.id}>
                    <Deck details={deck} selectDeck={handleSelect}></Deck>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {theirDecks?.length > 0 && (
            <div className="col-lg">
              <div className="player-name">{game.players[1].name}</div>
              <ul className="their-decks-list decks-list">
                {theirDecks.map((deck) => (
                  <li key={deck.id}>
                    <Deck details={deck} selectDeck={handleSelect}></Deck>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="footer-wrapper flex-grow-1 d-flex">
          <ul className="footer col d-flex flex-column flex-md-row justify-content-between">
            <li>
              <a
                href="https://www.thefinalswindle.com/"
                className="link-info"
                target="_blank"
                rel="noreferrer"
              >
                The Final Swindle
              </a>
            </li>
            <li>
              <a
                href="https://www.thefinalswindle.com/p/formats.html"
                className="link-info"
                target="_blank"
                rel="noreferrer"
              >
                About Tetrad and Other Swindle Formats
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
