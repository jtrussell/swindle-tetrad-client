import HouseIcon from '../house-icon'

function Deck(props) {
  const { id, name, expansion, houses, status } = props.details

  const statusClassName = [
    'deck-status',
    'col-sm-1',
    status,
    {
      open: '',
      safe: 'text-success',
      stolen: '',
      banned: 'text-danger',
    }[status],
  ].join(' ')

  return (
    <div className="deck card">
      <div className="row g-0">
        <div className={statusClassName}>
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
