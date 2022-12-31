import HouseIcon from '../house-icon'

function Deck(props) {
  const { id, name, expansion, houses, isBanned, isSafe, isStolen } =
    props.details

  const status =
    (isBanned && 'banned') ||
    (isSafe && 'safe') ||
    (isStolen && 'stolen') ||
    'open'

  const className = ['deck', 'card', status].join(' ')

  return (
    <div className={className}>
      <div className="row g-0">
        <div className="deck-status col-sm-1">
          <span className="deck-status--label">{status}</span>
        </div>
        <div className="card-body deck-details col-sm-9">
          <div className="card-title">{name}</div>
          <div className="card-subtitle text-muted">{expansion}</div>
          <ul className="deck-links">
            <li>
              <a
                className="link-info"
                href={`https://decksofkeyforge.com/decks/${id}`}
              >
                Decks of KeyForge
              </a>
            </li>
            <li>
              <a
                className="link-info"
                href={`https://www.keyforgegame.com/deck-details/${id}`}
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
      </div>
    </div>
  )
}

export default Deck
