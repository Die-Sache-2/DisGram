let unsubscribe = async () => {
    let telegramChannel = await db.TelegramChannel.findOne({
        where: {
            channelId: telegramChannelId
        }
    });
    let discordChannel = await db.DiscordChannel.findOne({
        where: {
            subscriptionIdentifier: commandParts[2]
        }
    });
    db.Subscription.destroy({
        where: {
            TelegramChannelId: telegramChannel.dataValues.id,
            DiscordChannelId: discordChannel.dataValues.id
        }
    });
}

export default unsubscribe;