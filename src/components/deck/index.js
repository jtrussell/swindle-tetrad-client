import HouseIcon from '../house-icon'

function Deck(props) {
  const {
    id,
    name,
    expansion,
    houses,
    isBanned,
    isSafe,
    isStolen,
    isPreliminarySteal,
    isSelectable,
    selectFor,
    isDeck1,
    isDeck2,
    isDeck3,
  } = props.details

  const status =
    (isBanned && 'ban') || (isSafe && 'safe') || (isStolen && 'steal') || ''

  const className = [
    'deck',
    'card',
    status,
    isPreliminarySteal && 'preliminary',
  ].join(' ')

  const handleSelect = () => {
    props.selectDeck(selectFor, id)
  }

  return (
    <div className={className}>
      <div className="row g-0">
        <div className="deck-actions col-sm-1">
          {isSelectable && (
            <button
              className="btn btn-outline-secondary deck-select-button"
              onClick={handleSelect}
            >
              <span className="deck-select-button--label">Select</span>
            </button>
          )}

          {isDeck1 && <span className="deck-actions__game-number">1</span>}
          {isDeck2 && <span className="deck-actions__game-number">2</span>}
          {isDeck3 && <span className="deck-actions__game-number">3</span>}
        </div>

        <div className="card-body deck-details col-sm-8">
          <div className="card-title">{name}</div>
          <div className="card-subtitle text-muted">{expansion}</div>
          <ul className="deck-links">
            <li>
              <a
                className="link-info"
                href={`https://decksofkeyforge.com/decks/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Decks of KeyForge
              </a>
            </li>
            <li>
              <a
                className="link-info"
                href={`https://www.keyforgegame.com/deck-details/${id}`}
                target="_blank"
                rel="noreferrer"
              >
                Master Vault
              </a>
            </li>
          </ul>
        </div>
        <div className="deck-houses col-sm-2">
          {houses.map((houseId) => (
            <HouseIcon key={houseId} houseId={houseId} />
          ))}
        </div>

        <div className="deck-status col-sm-1">
          <span className="deck-status--label">{status}</span>
        </div>
      </div>
    </div>
  )
}

export default Deck
