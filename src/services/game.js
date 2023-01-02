const getPlayerDecks = (game, ixPlayer) => {
  if (!game?.players) {
    return []
  }

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
    if (opponent?.ban === a) {
      return 1
    }
    if (opponent?.ban === b) {
      return -1
    }
    return 0
  })

  const selectFor =
    (ixPlayer === 1 && !opponent.ban && 'ban') ||
    (ixPlayer === 0 && opponent?.ban && !player.safe && 'safe') ||
    (ixPlayer === 1 && player.safe && !opponent?.steal && 'steal') ||
    (ixPlayer === 0 && opponent?.steal && !player.deck1 && 'deck1') ||
    (ixPlayer === 0 && opponent?.deck1 && !player.deck2 && 'deck2') ||
    (ixPlayer === 0 && opponent?.deck2 && !player.deck3 && 'deck3')

  return playerDecks.map((deckId) => {
    const isBanned = opponent?.ban === deckId
    const isSafe = player.safe === deckId
    const isDeck1 = player.deck1 === deckId
    const isDeck2 = player.deck2 === deckId
    const isDeck3 = player.deck3 === deckId

    const isStolen = player.steal === deckId || opponent?.steal === deckId
    const isPreliminarySteal =
      Boolean(player.steal) !== Boolean(opponent?.steal)

    let isSelectable = false

    if (
      ixPlayer === 0 &&
      !isBanned &&
      ['safe', 'deck1', 'deck2', 'deck3'].includes(selectFor) &&
      ![player.deck1, player.deck2, player.deck3].includes(deckId)
    ) {
      isSelectable = true
    }

    if (
      ixPlayer === 1 &&
      !isBanned &&
      !isSafe &&
      ['ban', 'steal'].includes(selectFor)
    ) {
      isSelectable = true
    }
    return {
      ...game.decks[deckId],
      selectFor,
      isSelectable,
      isBanned,
      isSafe,
      isStolen,
      isPreliminarySteal,
      isDeck1,
      isDeck2,
      isDeck3,
    }
  })
}

export { getPlayerDecks }
