import { useEffect, useState } from 'react'
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

const recoverGameIfNeeded = (game) => {
  if (!game.recoveryKey) {
    const url = new URL(window.location.href)
    const gameId = url.searchParams.get('game')
    const recoveryKey = url.searchParams.get('recoveryKey')
    if (gameId && recoveryKey) {
      window.SWINDLE_TETRAD_SOCKET.send(
        JSON.stringify({
          action: 'recover-game',
          payload: {
            gameId,
            recoveryKey,
          },
        })
      )
      return true
    }
  }
  return false
}

const getRecoveryLink = (game) => {
  const url = window.location.href.replace(/\?.*/, '')
  return `${url}?game=${game.id}&recoveryKey=${game.recoveryKey}`
}

function App() {
  const [game, setGame] = useState(INITIAL_GAME_STATE)
  const [isRecoveryLinkVisible, setIsRecoveryLinkVisible] = useState(false)

  useEffect(() => {
    const updateStateOnMessage = (event) => {
      const updateData = JSON.parse(event.data)
      const nextGameState = {
        ...game,
        ...updateData.game,
      }
      setGame(nextGameState)
    }
    window.SWINDLE_TETRAD_SOCKET.addEventListener(
      'message',
      updateStateOnMessage
    )
    return () => {
      window.SWINDLE_TETRAD_SOCKET.removeEventListener(
        'message',
        updateStateOnMessage
      )
    }
  })

  if (recoverGameIfNeeded(game)) {
    return 'Hang on... restarting the Nintendo...'
  }

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

        {game.recoveryKey && (
          <div className="alert alert-secondary">
            <span className="fs-4 d-block">Game Recovery Link</span>
            <span className="d-block">
              Need to come back later? Use the link below to resume this game.
              We suggest saving this link somewhere safe right now, just in case
              an evil Urchin sneaks up behind you and refreshes your browser.
              Keep in mind that anyone can use this link to resume your session.
            </span>
            {isRecoveryLinkVisible ? (
              <>
                <button
                  className="mt-3 d-block btn btn-light"
                  onClick={() => setIsRecoveryLinkVisible(false)}
                >
                  Hide recovery link
                </button>
                <code className="mt-3 d-block user-select-all">
                  {getRecoveryLink(game)}
                </code>
              </>
            ) : (
              <button
                className="mt-3 d-block btn btn-light"
                onClick={() => setIsRecoveryLinkVisible(true)}
              >
                Show recovery link
              </button>
            )}
          </div>
        )}

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
              <span className="text-black-50 ps-1 pe-1">&times;</span>
              <a
                href="https://sloppylabwork.com/"
                className="link-info"
                target="_blank"
                rel="noreferrer"
              >
                Sloppy Labwork
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
