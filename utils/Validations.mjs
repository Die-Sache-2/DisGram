import db from "../db/index.mjs";

async function validateTelegramRegistration(userId) {
    let userCount = await db.TelegramUser.count({
        where: {
            userId
        }
    })
    return Boolean(userCount);
}

async function validateDiscordRegistration(userId) {
    let userCount = await db.DiscordUser.count({
        where: {
            userId
        }
    })
    return Boolean(userCount);
}

async function validateSubscribableDiscordChannel(channelId) {
    let subscribableChannelCount = await db.DiscordChannel.count({
        where: {
            channelId
        }
    });
    return Boolean(subscribableChannelCount);
}

export { validateTelegramRegistration, validateDiscordRegistration, validateSubscribableDiscordChannel };