const getPlayerDecks = (game, ixPlayer) => {
  const player = game.players[ixPlayer]
  if (!player) {
    return []
  }
  const opponent = game.players[1 - ixPlayer]

  let playerDecks = player.decks
  if (player.steal && opponent?.steal && opponent.decks) {
    playerDecks = [
      ...playerDecks.filter((deckId) => deckId !== opponent?.steal),
      player.steal,
    ]
  }

  playerDecks.sort((a, b) => {
    if (player.deck1 === a) {
      return -1
    }
    if (player.deck1 === b) {
      return 1
    }
    if (player.deck2 === a) {
      return -1
    }
    if (player.deck2 === b) {
      return 1
    }
    if (player.deck3 === a) {
      return -1
    }
    if (player.deck3 === b) {
      return 1
    }
    if (player.safe === a) {
      return -1
    }
    if (player.safe === b) {
      return 1
    }
    if (player.steal === a) {
      return -1
    }
    if (player.steal === b) {
      return 1
    }
    if (opponent?.ban === a) {
      return 1
    }
    if (opponent?.ban === b) {
      return -1
    }
    return 0
  })

  const selectFor =
    (!player.ban && 'ban') ||
    (opponent?.ban && !player.safe && 'safe') ||
    (opponent?.safe && !player.steal && 'steal') ||
    (opponent?.steal && !player.game1 && 'game1') ||
    (opponent?.game1 && !player.game2 && 'game2') ||
    (opponent?.game2 && !player.game3 && 'game3')

  return playerDecks.map((deckId) => {
    const isBanned = opponent?.ban === deckId
    const isSafe = player.safe === deckId
    const isStolen = player.steal === deckId

    let isSelectable = false

    if (
      ixPlayer === 0 &&
      !isBanned &&
      ['safe', 'game1', 'game2', 'game3'].includes(selectFor) &&
      ![player.game1, player.game2, player.game3].includes(deckId)
    ) {
      isSelectable = true
    }

    if (ixPlayer === 1 && !isBanned && ['ban', 'steal'].includes(selectFor)) {
      isSelectable = true
    }
    return {
      ...game.decks[deckId],
      selectFor,
      isSelectable,
      isBanned,
      isSafe,
      isStolen,
    }
  })
}

export { getPlayerDecks }
